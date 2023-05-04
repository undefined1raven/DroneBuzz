<script>
	import { onMount, setContext } from "svelte";
	import { Map } from "@onsvisual/svelte-maps";
	import maplibre from "maplibre-gl";
	import Button from "./components/common/Button.svelte";
	import Label from "./components/common/Label.svelte";
	import FireControlDashboard from "./components/GameOverlay/FireControlDashboard.svelte";
	import NavDashboard from "./components/GameOverlay/NavDashboard.svelte";
	import OpsDashboard from "./components/GameOverlay/OpsDashboard.svelte";
	import LocationPickerOverlay from "./components/GameOverlay/LocationPickerOverlay.svelte";
	import { RangeScaler } from "./fn/RangeScaler.js";
	import { getRandomCoords } from "./fn/getRandomCoords.js";
	import { Enemy } from "./components/enitities/Enemy.js";
	import { Missle } from "./components/enitities/Missle.js";
	import MainMenu from "./components/GameUI/MainMenu.svelte";
	import Minimap from "./components/GameOverlay/Minimap.svelte";
	import Scorestreaks from "./components/GameOverlay/Scorestreaks.svelte";
	import LoactionPickerDeco from "./components/deco/LocationPickerDeco.svelte";
	import { pulsingDot } from "./fn/pulsingDot.js";
	import radiusFromPercentage from "./fn/radiusFromPercentage.js";
	import { booleanPointInPolygon, point, polygon } from "@turf/turf";
	import cartesianDistance from "./fn/cartesianDistance";
	import killsObjective from "./config/objectives/Kills";
	import durationObjective from "./config/objectives/Duration";
	import energyWeaponConfigFunc from "./config/energyWeapon";
	const energyWeaponConfig = energyWeaponConfigFunc();

	import {
		BluelineElement,
		DefenceLineElement,
		PlayerElement,
		PlayerRangeElement,
	} from "./components/enitities/Markers.js";
	import nipplejs from "nipplejs";
	import UAVConfigFunc from "./config/UAV.js";
	import CalibrationOverlay from "./components/GameOverlay/CalibrationOverlay.svelte";
	import counterUAVConfig from "./config/counterUAV";

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //max e | min i
	}
	44.35381465897361, 26.02985041110172;

	const root = document.documentElement;

	//---| Beta stuff
	let missleBarrage = false;
	const poly = [
		[
			[26.043736017648968, 44.358084898159746],
			[26.030252535211645, 44.349560065388715],
			[26.043381189163824, 44.3371511734548],
			[26.065309589547212, 44.34192218298236],
			[26.074818890582065, 44.34854514561738],
			[26.055871049472785, 44.359632452118575],
			[26.043736017648968, 44.358084898159746],
		],
	];

	//---| Survival Run Params
	let enemyMissileCountRange = [20, 24];
	let enemyMissileCooldown = 1000;
	let enemyCountermeasuresCountRange = [2, 4];
	let enemyCountermeasuresCooldown = 800;
	let rawDefensiveRadius = 0.00425082508;
	let rawOffensiveRadius = 0.00336666667;
	let enemyWaveIntermission = 30000;
	let enemyWaveCount = 12;
	let objective = { type: "none" };
	let objectiveCompletionFunctionHash = {
		kills: killsObjective,
		duration: durationObjective,
	};
	let objectiveCompletionFunction = { fn: null, args: null };
	function getBasicEnemyConfig(coords, id) {
		return {
			map: map,
			coords: coords,
			type: "Enemy",
			id: id,
			enemiesArr: enemies,
			missleArr: missles,
			missleCount: getRandomInt(
				enemyMissileCountRange[0],
				enemyMissileCountRange[1]
			),
			missleCooldown: enemyMissileCooldown,
			countermeasuresCount: getRandomInt(
				enemyCountermeasuresCountRange[0],
				enemyCountermeasuresCountRange[1]
			),
			countermeasuresCooldown: enemyCountermeasuresCooldown,
			enemyDefensiveMissles: enemyDefensiveMissles,
			rawDefensiveRadius: rawDefensiveRadius,
			screenDistanceObj: {
				vertical: verticalScreenDistance,
				horizontal: horizontalScreenDistance,
			},
			rawOffensiveRadius: rawOffensiveRadius,
			mvs: enemyMvs,
		};
	}

	//---| Page State
	let isFullscreen = false;
	let clientWidth = root.clientWidth;
	let clientHeight = root.clientHeight;
	let menuState = "menu";
	let isPickingLocation = false;
	let locationPreviewOverride = true; // control for the SurvivalRunSetup Location Preview button that has to be scoped here

	//---| Game State
	let map;
	let lastEnemyRefresh = 0;
	let startTime = 0;
	let bestTime = "--";
	let timeString = "--";
	let deadTime = 0;
	let deadcount = 0;
	let started = false;
	let showCalibration = false;
	let hasVerifiedCalibration = false;
	let verticalScreenDistance = 0;
	let horizontalScreenDistance = 0;
	let showMenu = true;
	let isPaused = false;

	let lastUAVSweep = Date.now();
	let UAVContactsHash = {};

	const UAVConfig = UAVConfigFunc();

	let scorestreaksState = {
		UAV: false,
		counterUAV: false,
		energyWeapon: false,
	};

	//--- Context
	setContext("map", { getMap: () => map });

	//--| Entities
	let enemies = [];
	let missles = [];
	let friendlyMissles = [];
	let friendlyDefensiveMissles = [];
	let enemyDefensiveMissles = [];

	//---| Player State
	let lng = 26.02985041110172; /*25.609*/
	let lat = 44.35381465897361; /*45.653*/

	let nlatFromPicker = lat;
	let nlngFromPicker = lng;
	let displayNlatFromPicker = lat;
	let displayNlngFromPicker = lng;

	let ang = 0;
	let misslecooldown = 500;
	let maxConcurentMissileCount = 5;
	let maxConcurentCountermeasuresCount = 5;
	let lastMissleFire = Date.now();
	let defensiveMissleCooldown = 800;
	let lastDefensiveMissleFire = Date.now();
	let isHunted = false;
	let missileLockCount = 0;
	let killCount = 0;
	let energyWeaponKillStreakTargetsArray = [];
	const scorestreakArray = ["UAV", "counterUAV", "energyWeapon"];

	let mvs = 0.0002;
	let enemyMvs = 0;
	let missleMvs = 0;

	function updateEnemyHeadings(enemy, targetLng, targetLat) {
		let B = targetLng - enemy.coords.lng;
		let deltaLat = targetLat - enemy.coords.lat;

		let distance = cartesianDistance(
			{
				lng: targetLng,
				lat: targetLat,
			},
			{ lng: enemy.coords.lng, lat: enemy.coords.lat }
		);
		enemy.distance = distance;

		if (enemy.onDistanceUpdate != undefined) {
			enemy.onDistanceUpdate(enemy.id);
		}

		if (targetLat >= enemy.coords.lat) {
			enemy.followStep(Math.acos((B / distance).toFixed(15)) * 57.29578);
		} else {
			let actualBearing = RangeScaler(
				Math.abs(
					Math.acos((B / distance).toFixed(15)) * 57.29578 + 180
				),
				180,
				360,
				360,
				180
			);
			enemy.followStep(actualBearing);
		}
	}

	function disableLaserTargeting(targetID) {
		if (map.getLayer(`LWA-${targetID}`)) {
			map.removeLayer(`LWA-${targetID}`);
		}
		if (map.getSource(`LWAS-${targetID}`)) {
			map.removeSource(`LWAS-${targetID}`);
		}
	}

	function enableLaserTargeting(sourceArray, layerArray, target, tix) {
		if (
			sourceArray.indexOf(
				`LWAS-${energyWeaponKillStreakTargetsArray[tix]}`
			) == -1
		) {
			sourceArray.push(`LWAS-${energyWeaponKillStreakTargetsArray[tix]}`);
		}
		map.addSource(`LWAS-${energyWeaponKillStreakTargetsArray[tix]}`, {
			type: "geojson",
			data: {
				type: "Feature",
				properties: {},
				geometry: {
					type: "LineString",
					coordinates: [
						[lng, lat],
						[target.coords.lng, target.coords.lat],
					],
				},
			},
		});
		if (
			layerArray.indexOf(
				`LWA-${energyWeaponKillStreakTargetsArray[tix]}`
			) == -1
		) {
			layerArray.push(`LWA-${energyWeaponKillStreakTargetsArray[tix]}`);
		}
		map.addLayer({
			id: `LWA-${energyWeaponKillStreakTargetsArray[tix]}`,
			type: "line",
			source: `LWAS-${energyWeaponKillStreakTargetsArray[tix]}`,
			paint: {
				"line-color": "rgba(36, 0, 255, 0.7)",
				"line-width": 2,
			},
		});
	}

	function fireEnergyWeaponStreak(state) {
		if (state.energyWeapon === true) {
			for (let eix = 0; eix < enemies.length; eix++) {
				if (enemies[eix].distance < energyWeaponConfig.radius) {
					energyWeaponKillStreakTargetsArray.push(enemies[eix].id);
				}
			}

			let sourceArray = [];
			let layerArray = [];

			const intx = setInterval(() => {
				energyWeaponKillStreakTargetsArray = [];
				for (let eix = 0; eix < enemies.length; eix++) {
					if (enemies[eix].distance < energyWeaponConfig.radius) {
						energyWeaponKillStreakTargetsArray.push(
							enemies[eix].id
						);
					}
				}
				for (
					let tix = 0;
					tix < energyWeaponKillStreakTargetsArray.length;
					tix++
				) {
					const target = enemies.filter(
						(enemy) =>
							enemy.id == energyWeaponKillStreakTargetsArray[tix]
					)[0];
					if (target != undefined) {
						const sqareLawRaw =
							(50 * 0.00808) /
							(target.distance * target.distance);
						const instaEnergyAbsorbtion =
							(sqareLawRaw * energyWeaponConfig.powerScale) /
							326432;
						if (target.energyAbsorbed != undefined) {
							if (target.energyAbsorbed >= 1) {
								removeEntity(
									target,
									enemies,
									enemies.indexOf(target)
								);
								disableLaserTargeting(
									energyWeaponKillStreakTargetsArray[tix]
								);
							} else {
								target.energyAbsorbed += instaEnergyAbsorbtion;
								disableLaserTargeting(
									energyWeaponKillStreakTargetsArray[tix]
								);
								if(target.energyAbsorbed < 1){
									enableLaserTargeting(
										sourceArray,
										layerArray,
										target,
										tix
									);
								}
							}
						} else {
							target["energyAbsorbed"] = instaEnergyAbsorbtion;
							enableLaserTargeting(
								sourceArray,
								layerArray,
								target,
								tix
							);
						}
					}
				}
			}, 100);
			setTimeout(() => {
				clearInterval(intx);
				for (let lidix = 0; lidix < layerArray.length; lidix++) {
					if (map.getLayer(layerArray[lidix])) {
						map.removeLayer(layerArray[lidix]);
						map.removeSource(sourceArray[lidix]);
					}
				}
			}, energyWeaponConfig.duration);
		}
	}

	$: fireEnergyWeaponStreak(scorestreaksState);

	function restart() {
		isPaused = false;
		killCount = 0;
		missileLockCount = 0;
		for (let fmix = 0; fmix < friendlyMissles.length; fmix++) {
			friendlyMissles[fmix].hideMissle();
		}
		for (let edmix = 0; edmix < enemyDefensiveMissles.length; edmix++) {
			enemyDefensiveMissles[edmix].hideMissle();
		}
		for (let fdmix = 0; fdmix < friendlyDefensiveMissles.length; fdmix++) {
			friendlyDefensiveMissles[fdmix].hideMissle();
		}
		for (let eix = 0; eix < enemies.length; eix++) {
			enemies[eix].hideEnemy();
		}
		for (let mix = 0; mix < missles.length; mix++) {
			missles[mix].hideMissle();
		}
		friendlyMissles = [];
		enemyDefensiveMissles = [];
		friendlyDefensiveMissles = [];
		missles = [];
		enemies = [];
		deadTime = 0;
		deadcount = 0;
		missleBarrage = false;
		started = true;
		lastEnemyRefresh = 0;
		startSurvivalRun();
		updateBest();
	}

	function getNearestEnemy(enemiesArray) {
		let low = 100000000; //works cuz of how smol the distances we're dealing with here are
		let enemyID = "";
		for (let eix = 0; eix < enemiesArray.length; eix++) {
			const enemy = enemiesArray[eix];
			if (enemy.distance < low) {
				low = enemy.distance;
				enemyID = enemy.id;
			}
		}
		return enemiesArray.filter((enemy) => enemy.id == enemyID)[0];
	}

	function removeEntity(entity, entityBelongingArray, ix) {
		entity.invisble = true;
		entity.draw({ lng: lng, lat: lat });
		entityBelongingArray.splice(ix, 1);
	}

	function friendlyMissleUpdate(enemyID, targetEnemy, friendlyMissle, ix) {
		enemyID = targetEnemy.id;
		friendlyMissle.targetID = enemyID;
		updateEnemyHeadings(
			friendlyMissle,
			targetEnemy.coords.lng,
			targetEnemy.coords.lat
		);
		if (friendlyMissle.distance < friendlyMissle.killRadius) {
			removeEntity(friendlyMissle, friendlyMissles, ix);
			for (let eix = 0; eix < enemies.length; eix++) {
				const enemy = enemies[eix];
				if (enemy.id == enemyID) {
					if (
						energyWeaponKillStreakTargetsArray.indexOf(enemy.id) !=
						-1
					) {
						if (map.getLayer(`LWA-${enemy.id}`)) {
							map.removeLayer(`LWA-${enemy.id}`);
							map.removeSource(`LWAS-${enemy.id}`);
						}
					}
					killCount++;
					removeEntity(enemy, enemies, eix);
				}
			}
		}
	}

	function missleLoop(mix) {
		const missle = missles[mix];
		missle.draw({ lng: lng, lat: lat });
		if (
			missle.distance < counterUAVConfig().radius &&
			scorestreaksState.counterUAV == true
		) {
			let ran = getRandomInt(0, 360);
			missle.followStep(ran);
		} else {
			updateEnemyHeadings(missle, lng, lat);
		}
		if (missle.distance < missle.killRadius && missle.distance > 0) {
			deadcount++;
			if (deadcount == 1) {
				deadTime = Date.now();
				localStorage.setItem("best", deadTime - startTime);
			}
			removeEntity(missle, missles, mix);
		}
	}

	function friendlyMissleLoop(fmix, friendlyMisslesTargets) {
		const friendlyMissle = friendlyMissles[fmix];
		friendlyMissle.draw({ lng: lng, lat: lat });

		let targetEnemy = getNearestEnemy(enemies);
		let enemyID;

		if (targetEnemy != undefined) {
			if (friendlyMisslesTargets.indexOf(targetEnemy.id) == -1) {
				friendlyMisslesTargets.push(targetEnemy.id);
				targetEnemy.isHunted = true;
				friendlyMissleUpdate(
					enemyID,
					targetEnemy,
					friendlyMissle,
					fmix
				);
			} else {
				let sortedEnemies = enemies.sort((a, b) => {
					return parseFloat(a.distance) - parseFloat(b.distance);
				});
				targetEnemy = sortedEnemies[friendlyMisslesTargets.length];
				if (targetEnemy != undefined) {
					targetEnemy.isHunted = true;
					friendlyMisslesTargets.push(targetEnemy.id);
					friendlyMissleUpdate(
						enemyID,
						targetEnemy,
						friendlyMissle,
						fmix
					);
				}
			}
		} else {
			removeEntity(friendlyMissle, friendlyMissles, fmix);
		}
	}

	function enemyDefensiveMissleLoop(edmix) {
		const enemyDefensiveMissle = enemyDefensiveMissles[edmix];
		enemyDefensiveMissle.draw({
			lng: lng,
			lat: lat,
		});

		const targetEnemy = getNearestEnemy(friendlyMissles);

		if (targetEnemy != undefined) {
			const enemyMissleID = targetEnemy.id;
			enemyDefensiveMissle.targetID = enemyMissleID;
			updateEnemyHeadings(
				enemyDefensiveMissle,
				targetEnemy.coords.lng,
				targetEnemy.coords.lat
			);
			if (
				enemyDefensiveMissle.distance <=
					enemyDefensiveMissle.killRadius &&
				enemyDefensiveMissle.distance > 0
			) {
				removeEntity(
					enemyDefensiveMissle,
					enemyDefensiveMissles,
					edmix
				);

				if (Math.random() < 0.4) {
					for (let fmix = 0; fmix < friendlyMissles.length; fmix++) {
						const missle = friendlyMissles[fmix];
						if (missle.id == enemyMissleID) {
							removeEntity(missle, friendlyMissles, fmix);
						}
					}
				}
			}
		} else {
			removeEntity(enemyDefensiveMissle, enemyDefensiveMissles, edmix);
		}
	}

	function friendlyDefensiveMissleLoop(fdmix) {
		const friendlyDefensiveMissle = friendlyDefensiveMissles[fdmix];
		friendlyDefensiveMissle.draw({
			lng: lng,
			lat: lat,
		});
		let targetEnemy = getNearestEnemy(missles);

		if (targetEnemy != undefined) {
			const enemyMissleID = targetEnemy.id;
			friendlyDefensiveMissle.targetID = enemyMissleID;
			updateEnemyHeadings(
				friendlyDefensiveMissle,
				targetEnemy.coords.lng,
				targetEnemy.coords.lat
			);
			if (
				friendlyDefensiveMissle.distance <
					friendlyDefensiveMissle.killRadius &&
				friendlyDefensiveMissle.distance > 0
			) {
				removeEntity(
					friendlyDefensiveMissle,
					friendlyDefensiveMissles,
					fdmix
				);
				if (Math.random() < 0.8) {
					for (let mix = 0; mix < missles.length; mix++) {
						const missle = missles[mix];
						if (missle.id == enemyMissleID) {
							removeEntity(missle, missles, mix);
						}
					}
				}
			}
		} else {
			removeEntity(
				friendlyDefensiveMissle,
				friendlyDefensiveMissles,
				fdmix
			);
		}
	}

	function start(isRestart) {
		if (
			verticalScreenDistance != 0 &&
			horizontalScreenDistance != 0 &&
			!showCalibration
		) {
			isPaused = false;
			started = true;
			startTime = Date.now();
			for (let ix = 0; ix <= 21; ix++) {
				let ncoords = new getRandomCoords(lng, lat, 15).get();
				let id = `${Math.random().toFixed(4) + Date.now()}`;
				let eni = new Enemy(getBasicEnemyConfig(ncoords, id));
				enemies.push(eni);
			}

			if (!isRestart) {
				let bluelinePercentage = 36.966824645;
				let rangePercentage = 55.450236967;
				let defenceline = new DefenceLineElement("20%").getElement();
				let blueline = new BluelineElement(
					`${radiusFromPercentage(bluelinePercentage)}px`
				).getElement();
				let playerElement = new PlayerElement().getElement();
				let rangeline = new PlayerRangeElement(
					`${radiusFromPercentage(rangePercentage)}px`
				).getElement();
				var playerMarker = new maplibre.Marker(playerElement)
					.setLngLat([lng, lat])
					.addTo(map);

				var playerDefenceLineMarker = new maplibre.Marker(defenceline)
					.setLngLat([lng, lat])
					.addTo(map);

				var playerBluelineMarker = new maplibre.Marker(blueline)
					.setLngLat([lng, lat])
					.addTo(map);

				var playerRangeMarker = new maplibre.Marker(rangeline)
					.setLngLat([lng, lat])
					.addTo(map);

				var joy = nipplejs.create({
					zone: document.getElementById("joy"),
					color: "#5c41ff30",
					mode: "dynamic",
					position: { left: "50%", top: "50%" },
				});
				joy.on("end", () => {
					// ang = -1;
				});
				joy.on("move", (evt, data) => {
					ang = data.angle.degree;
					playerMarker._rotation = (data.angle.degree - 90) * -1;
				});
				///---| Game Loop
				setInterval(() => {
					if (!isPaused) {
						if (ang <= 180 && ang > 0 && ang != -1) {
							lng += RangeScaler(ang, 0, 180, mvs, mvs * -1);
							lat += RangeScaler(
								Math.abs(ang - 90),
								0,
								90,
								mvs,
								0
							);
						}
						if (ang > 180 && ang < 360 && ang != -1) {
							lng += RangeScaler(
								ang - 270,
								-90,
								90,
								mvs * -1,
								mvs
							);
							lat += RangeScaler(
								Math.abs(ang - 270),
								90,
								0,
								0,
								mvs * -1
							);
						}
						playerMarker.setLngLat([lng, lat]);
						playerDefenceLineMarker.setLngLat([lng, lat]);
						playerBluelineMarker.setLngLat([lng, lat]);
						playerRangeMarker.setLngLat([lng, lat]);

						for (let eix = 0; eix < enemies.length; eix++) {
							const enemy = enemies[eix];
							enemy.draw({ lng: lng, lat: lat });
							updateEnemyHeadings(enemy, lng, lat);
						}

						for (let mix = 0; mix < missles.length; mix++) {
							missleLoop(mix);
						}

						isHunted = missles.length != 0;
						for (
							let fdmix = 0;
							fdmix < friendlyDefensiveMissles.length;
							fdmix++
						) {
							friendlyDefensiveMissleLoop(fdmix);
						}

						for (
							let edmix = 0;
							edmix < enemyDefensiveMissles.length;
							edmix++
						) {
							enemyDefensiveMissleLoop(edmix);
						}

						let friendlyMisslesTargets = [];
						for (
							let fmix = 0;
							fmix < friendlyMissles.length;
							fmix++
						) {
							friendlyMissleLoop(fmix, friendlyMisslesTargets);
						}

						map.panTo([lng + 0.0, lat - 0.002], { duration: 0 });
						missileLockCount = missles.length;
						if (deadTime == 0) {
							let ms = Date.now() - startTime;
							timeString = `${Math.floor(ms / 60000)
								.toString()
								.padStart(2, "0")}:${((ms / 1000) % 60)
								.toFixed(0)
								.toString()
								.padStart(2, "0")}`;
						} else {
							let ms = deadTime - startTime;
							timeString = `${Math.floor(ms / 60000)
								.toString()
								.padStart(2, "0")}:${((ms / 1000) % 60)
								.toFixed(0)
								.toString()
								.padStart(2, "0")}`;
						}
						if (
							Date.now() - lastEnemyRefresh >
								enemyWaveIntermission ||
							lastEnemyRefresh == 0
						) {
							lastEnemyRefresh = Date.now();
							for (let ix = 0; ix <= enemyWaveCount; ix++) {
								let ncoords = new getRandomCoords(
									lng,
									lat,
									8
								).get();
								let id = `${
									Math.random().toFixed(4) + Date.now()
								}`;
								let eni = new Enemy(
									getBasicEnemyConfig(ncoords, id)
								);
								enemies.push(eni);
							}
						}
					}
					if (
						Date.now() - lastUAVSweep > UAVConfig.sweepFreq &&
						scorestreaksState.UAV == true
					) {
						UAVContactsHash = {};
						lastUAVSweep = Date.now();
						for (
							let ix = 0;
							ix <
							document.getElementsByClassName("UAVPing").length;
							ix++
						) {
							document
								.getElementsByClassName("UAVPing")
								[ix].remove();
						}
						for (let eix = 0; eix < enemies.length; eix++) {
							const enemy = enemies[eix];
							if (Math.abs(enemy.distance) < UAVConfig.radius) {
								let deltaLng = lng - enemy.coords.lng;
								let deltaLat = lat - enemy.coords.lat;
								UAVContactsHash[enemy.id] = {
									dlng: deltaLng,
									dlat: deltaLat,
								};
							}
						}
					}
					// if (
					// 	objectiveCompletionFunction.fn != null &&
					// 	deadcount == 0
					// ) {
					// 	objective["completed"] =
					// 		objectiveCompletionFunction.fn.apply(
					// 			null,
					// 			objectiveCompletionFunction.args
					// 		).completed;
					// }
					checkObjectiveCompletion();
				}, 50);
			}
		}
	}

	function updateBest() {
		let bestTimeUnix = localStorage.getItem("best");
		if (bestTimeUnix != null && bestTimeUnix != undefined) {
			bestTime = `${Math.floor(bestTimeUnix / 60000)
				.toString()
				.padStart(2, "0")}:${((bestTimeUnix / 1000) % 60)
				.toFixed(0)
				.toString()
				.padStart(2, "0")}`;
		}
	}

	function onKeyDown(e) {
		if (e.key == " " && started) {
			fire();
		}
		if (e.key == "d" || e.key == "D") {
			defensiveFire();
		}
	}

	function onWindowResize() {
		clientWidth = root.clientWidth;
		clientHeight = root.clientHeight;
		setTimeout(() => {
			if (!hasVerifiedCalibration) {
				if (root.clientHeight < root.clientWidth) {
					let calibrationObj = JSON.parse(
						localStorage.getItem("calibration")
					);
					if (calibrationObj == null) {
						showCalibration = true;
					} else {
						//check if screen size matches the one when calibration took place
						verticalScreenDistance = calibrationObj.vertical;
						horizontalScreenDistance = calibrationObj.horizontal;
						mvs =
							(0.0002 * calibrationObj.horizontal) / 0.0361347198;
						enemyMvs =
							(0.00018 * calibrationObj.horizontal) /
							0.0361347198;
						missleMvs =
							(0.0003 * calibrationObj.horizontal) / 0.0361347198;
						UAVConfig.radius =
							parseFloat(calibrationObj.horizontal) +
							parseFloat(UAVConfig.radius);
					}
					hasVerifiedCalibration = true;
				}
			}
		}, 150);
	}

	onMount(() => {
		updateBest();
		map.on("load", () => {
			map.dragRotate.disable();
			map.touchZoomRotate.disableRotation();
			map.setMinPitch(0);
			map.setMaxPitch(0);
			onWindowResize();
			map.on("move", (e) => {
				if (isPickingLocation) {
					const nlng = map.getCenter().lng;
					const nlat = map.getCenter().lat;
					displayNlatFromPicker = nlat;
					displayNlngFromPicker = nlng;
				}
			});
		});
		// 	map.addSource("source", {
		// 		type: "geojson",
		// 		data: {
		// 			type: "Feature",
		// 			properties: {},
		// 			geometry: {
		// 				type: "Polygon",
		// 				coordinates: poly,
		// 			},
		// 		},
		// 	});
		// 	// const pulsingDotx = pulsingDot(200, map, 0.2);
		// 	// const pulsingDotxx = pulsingDot(200, map, 0.8);

		// 	// // Add the image to the map style.
		// 	// map.addImage("pulsing-dot", pulsingDotx, { pixelRatio: 2 });
		// 	// map.addImage("pulsing-dotx", pulsingDotxx, { pixelRatio: 2 });

		// 	// // Create a new layer and style it using `fill-pattern`.
		// 	// map.addLayer({
		// 	// 	id: "pattern-layer",
		// 	// 	type: "fill",
		// 	// 	source: "source",
		// 	// 	paint: {
		// 	// 		"fill-pattern": "pulsing-dot",
		// 	// 		"fill-outline-color": "red",
		// 	// 	},
		// 	// });
		// 	// map.addLayer({
		// 	// 	id: "patternx-layer",
		// 	// 	type: "line",
		// 	// 	source: "source",
		// 	// 	paint: {
		// 	// 		"line-pattern": "pulsing-dotx",
		// 	// 		"line-width": 5,
		// 	// 	},
		// 	// });
	});

	function defensiveFire() {
		let low = 100000;
		let enemyMissleID = "";
		for (let mix = 0; mix < missles.length; mix++) {
			const missle = missles[mix];
			if (missle.distance < low) {
				low = missle.distance;
				enemyMissleID = missle.id;
			}
		}

		let targetMissle = missles.filter(
			(missle) => missle.id == enemyMissleID
		)[0];
		if (targetMissle != undefined) {
			if (
				targetMissle.distance < 0.00425082508 &&
				friendlyDefensiveMissles.length <=
					maxConcurentCountermeasuresCount &&
				Date.now() - lastDefensiveMissleFire > defensiveMissleCooldown
			) {
				lastDefensiveMissleFire = Date.now();
				let friendlyDefenisveMissle = new Missle(
					map,
					{ lng: lng, lat: lat },
					0.00048,
					"defensive",
					"",
					`${Math.random()}-${Date.now()}`,
					0,
					true,
					missleMvs
				);
				friendlyDefensiveMissles.push(friendlyDefenisveMissle);
			}
		}
	}

	function fire() {
		let low = 100000;
		let enemyID = "";
		for (let eix = 0; eix < enemies.length; eix++) {
			const enemy = enemies[eix];
			if (enemy.distance < low) {
				low = enemy.distance;
				enemyID = enemy.id;
			}
		}

		let targetEnemy = enemies.filter((enemy) => enemy.id == enemyID)[0];
		if (targetEnemy != undefined) {
			if (
				targetEnemy.distance < 0.00725082508 &&
				friendlyMissles.length <= maxConcurentMissileCount &&
				Date.now() - lastMissleFire > misslecooldown
			) {
				lastMissleFire = Date.now();
				let friendlyMissle = new Missle(
					map,
					{ lng: lng, lat: lat },
					0.00014,
					"offensive",
					"",
					`${Math.random()}-${Date.now()}`,
					0,
					true,
					missleMvs
				);
				friendlyMissles.push(friendlyMissle);
			}
		}
	}

	$: updateKillArgs(killCount); //updates objective completion arg arr

	function updateKillArgs(k) {
		if (objective.type == "kills" && deadcount < objective.lives) {
			objectiveCompletionFunction.args = [k, objective.config];
		}
	}

	function checkObjectiveCompletion() {
		if (
			objectiveCompletionFunction.fn != null &&
			deadcount < objective.lives
		) {
			let objectiveFnReturn = objectiveCompletionFunction.fn.apply(
				null,
				objectiveCompletionFunction.args
			);
			objective["completed"] = objectiveFnReturn.completed;
			objective["displayStatus"] = objectiveFnReturn.displayStatus;
		}
		if (deadcount >= objective.lives) {
			if (objective["completed"] !== true) {
				objective["completed"] = "failed";
			}
		}
	}

	function startSurvivalRun(args) {
		const runConfig = args.detail?.runConfig;
		objective = args.detail.runConfig.objective;

		let objectiveCompletionFunctionArgs = [];

		if (objective.type == "kills") {
			objectiveCompletionFunctionArgs = [killCount, objective.config];
		}
		startTime = Date.now();
		if (objective.type == "duration") {
			objectiveCompletionFunctionArgs = [startTime, objective.config];
		}

		if (objective.type != "none") {
			const objectiveFnReturn = objectiveCompletionFunctionHash[
				objective.type
			]?.apply(null, objectiveCompletionFunctionArgs);
			objective["displayLabel"] = objectiveFnReturn.displayLabel;
			objective["displayStatus"] = objectiveFnReturn.displayStatus;
			objectiveCompletionFunction = {
				fn: objectiveCompletionFunctionHash[objective.type],
				args: objectiveCompletionFunctionArgs,
			};
		}

		if (runConfig.difficulty == "easy") {
			enemyMissileCountRange = [10, 15];
			enemyMissileCooldown = 1250;
			enemyCountermeasuresCountRange = [0, 0];
			enemyWaveIntermission = 30000;
			enemyWaveCount = 12;
		}
		if (runConfig.difficulty == "medium") {
			enemyMissileCountRange = [18, 22];
			enemyMissileCooldown = 1000;
			enemyCountermeasuresCountRange = [0, 2];
			enemyWaveIntermission = 22000;
			enemyWaveCount = 14;
		}
		if (runConfig.difficulty == "hard") {
			enemyMissileCountRange = [25, 35];
			enemyMissileCooldown = 700;
			enemyCountermeasuresCountRange = [5, 15];
			enemyWaveIntermission = 20000;
			enemyWaveCount = 18;
			maxConcurentCountermeasuresCount = 9;
			maxConcurentMissileCount = 7;
			misslecooldown = 450;
		}
		if (runConfig.difficulty == "insane") {
			enemyMissileCountRange = [35, 150];
			enemyMissileCooldown = 300;
			enemyCountermeasuresCountRange = [10, 30];
			enemyWaveIntermission = 35000;
			enemyWaveCount = 22;
			maxConcurentCountermeasuresCount = 25;
			maxConcurentMissileCount = 15;
			defensiveMissleCooldown = 350;
			misslecooldown = 250;
		}
		map.panTo([lng, lat], { duration: 0 });
		map.setMinZoom(14);
		showMenu = false;
		if (args.detail.restart) {
			restart();
		} else {
			start();
		}
	}

	function onCalibrationFinish(args) {
		localStorage.setItem(
			"calibration",
			JSON.stringify({
				vertical: args.vertical,
				horizontal: args.horizontal,
				screenHeight: root.clientHeight,
				screenWidth: root.clientWidth,
			})
		);
		verticalScreenDistance = args.vertical;
		horizontalScreenDistance = args.horizontal;
		showCalibration = false;
	}

	function pans() {
		let beforeHeight = root.clientHeight;
		let afterHeight;
		if (root.requestFullscreen) {
			root.requestFullscreen();
			setTimeout(() => {
				afterHeight = root.clientHeight;
			}, 70);
		}
		if (root.webkitRequestFullscreen) {
			root.webkitRequestFullscreen();
			setTimeout(() => {
				afterHeight = root.clientHeight;
			}, 70);
		}
		setTimeout(() => {
			if (afterHeight > beforeHeight) {
				isFullscreen = true;
			} else {
				isFullscreen = false;
			}
		}, 150);
	}
	function getDynamicBorderRadius(pxRadius) {
		return `${
			(parseFloat(pxRadius * 100) / 360 / 100) *
				document.documentElement.clientHeight +
			"px"
		}`;
	}
</script>

<svelte:window on:keydown={onKeyDown} on:resize={onWindowResize} />
<main>
	<Map
		attribution={false}
		minzoom="14"
		maxzoom="14"
		id="map"
		style="https://api.maptiler.com/maps/fcae873d-7ff0-480b-8d6d-41963084ad90/style.json?key=R1cyh6lj1mTfNEycg2N1"
		location={{ lng: lng, lat: lat, zoom: 35 }}
		bind:map
	/>
	<div
		style="display: {showCalibration || isPickingLocation
			? 'none'
			: 'flex'}"
		class="joy"
		id="joy"
	/>
</main>
<div id="dashboard">
	<FireControlDashboard
		{deadcount}
		{timeString}
		{bestTime}
		{fire}
		{started}
		{missileLockCount}
		{killCount}
		{objective}
	/>
	<NavDashboard {started} />
	<Minimap
		show={started && scorestreaksState.UAV == true}
		{UAVContactsHash}
		UAVRadius={UAVConfig.radius}
	/>
	<Scorestreaks
		on:deployScorestreak={(e) => {
			scorestreaksState[e.detail.key] = true;
		}}
		on:killScorestreak={(e) => {
			scorestreaksState[e.detail.key] = false;
		}}
		{started}
		{killCount}
		{scorestreakArray}
	/>
	<OpsDashboard {fire} {defensiveFire} {isHunted} {started} />
</div>
<CalibrationOverlay
	{isFullscreen}
	on:onFullscreen={pans}
	{map}
	{showCalibration}
	{onCalibrationFinish}
/>
<Button
	id="retry"
	top="77.777777778%"
	left="40%"
	color="#3817FF"
	borderColor="#1E00D2"
	label="Retry {deadcount >= objective.lives ? `[${deadcount}]` : ''}"
	horizontalFont="12px"
	verticalFont="12px"
	width="20.15625%"
	borderRadius="5px"
	backdropFilter="blur(4px)"
	opacity={deadcount >= objective.lives && !isPickingLocation > 0 ? 1 : 0}
	height="8.611111111%"
	onClick={() => {
		restart();
	}}
	backgroundColor="#1700A520"
/>
<Button
	top="88.611111111%"
	left="40%"
	color="#3817FF"
	borderColor="#1E00D2"
	label="Back to Menu"
	horizontalFont="12px"
	verticalFont="12px"
	width="20.15625%"
	borderRadius="5px"
	backdropFilter="blur(4px)"
	opacity={deadcount >= objective.lives && !isPickingLocation > 0 ? 1 : 0}
	height="8.611111111%"
	onClick={() => {
		showMenu = true;
		isPaused = true;
	}}
	backgroundColor="#1700A520"
/>
<MainMenu
	{started}
	{isFullscreen}
	on:stateChange={(e) => {
		menuState = e.detail;
	}}
	on:locationPreviewOverrideUpdate={(e) => {
		locationPreviewOverride = e.detail;
	}}
	on:onLocationPick={() => {
		map.setMinZoom(1);
		showMenu = false;
		isPickingLocation = true;
	}}
	on:onStartCalibration={() => (showCalibration = true)}
	on:onFullscreen={pans}
	on:hideMenu={() => (showMenu = false)}
	on:startSurvivalRun={(args) => startSurvivalRun(args)}
	show={!showCalibration && showMenu}
/>
{#if menuState.WID == "survivalRunSetup" && (!started || (started && isPaused)) && !isPickingLocation && locationPreviewOverride}
	<Label
		className="fromAboveAni"
		text=""
		onTouchStart={() => {
			showMenu = false;
		}}
		onTouchEnd={() => {
			showMenu = true;
		}}
		color="#6D55FF"
		horizontalFont="13px"
		backgroundColor="#1A00BA30"
		style="border-left: solid 1px #6D55FF; border-radius: 0px {getDynamicBorderRadius(
			5
		)} {getDynamicBorderRadius(5)} 0px ;"
		width="14.53125%"
		height="8.333333333%"
		top="65.555555556%"
		left="25%"
		tabletTop="65.555555556%"
		tabletLeft="25%"
	>
		<Label
			text="Location"
			color="#6D55FF"
			horizontalFont="13px"
			top="10%"
		/>
		<Label
			text="Hold to preview"
			color="#4227EA"
			top="62%"
			horizontalFont="8px"
		/></Label
	>
{/if}
{#if isPickingLocation}
	<LoactionPickerDeco
		size="8vh"
		tabletSize="6vh"
		style="top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 20000;"
	/>
	<LocationPickerOverlay
		on:newLocationPicked={() => {
			lat = displayNlatFromPicker;
			lng = displayNlngFromPicker;
			isPickingLocation = false;
			showMenu = true;
		}}
		on:hidePicker={() => {
			isPickingLocation = false;
			showMenu = true;
		}}
		text={`Lat: ${displayNlatFromPicker.toFixed(
			5
		)} | Lng: ${displayNlngFromPicker.toFixed(5)}`}
	/>
{/if}
{#if clientHeight > clientWidth}<Label
		width="100%"
		height="100%"
		text="Go into landscape mode to continue"
		color="#5C41FF"
		backgroundColor="#0E006520"
		verticalFont="25px"
		backdropFilter="blur(3px)"
		style="z-index: 1000000;"
	/>{/if}

<style lang="scss">
	:global(body) {
		background-color: #000;
		font-family: "Electrolize", sans-serif;
	}
	.joy {
		position: absolute;
		top: 0%; /*32.777777778*/
		left: 0%;
		width: 50%;
		height: 100%;
		background-color: #5c41ff00;
	}
	main {
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		position: absolute;
	}
</style>
