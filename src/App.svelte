<script>
	import { onMount } from "svelte";
	import { Map } from "@onsvisual/svelte-maps";
	import maplibre from "maplibre-gl";
	import Button from "./components/Button.svelte";
	import FireControlDashboard from "./components/FireControlDashboard.svelte";
	import NavDashboard from "./components/NavDashboard.svelte";
	import OpsDashboard from "./components/OpsDashboard.svelte";
	import { RangeScaler } from "./fn/RangeScaler.js";
	import { getRandomCoords } from "./fn/getRandomCoords.js";
	import { Enemy } from "./components/Enemy.js";
	import { Missle } from "./components/Missle.js";
	import { pulsingDot } from "./fn/pulsingDot.js";
	import radiusFromPercentage from "./fn/radiusFromPercentage.js";
	import { booleanPointInPolygon, point, polygon } from "@turf/turf";
	import {
		BluelineElement,
		DefenceLineElement,
		PlayerElement,
		PlayerRangeElement,
	} from "./components/Markers.js";
	import nipplejs from "nipplejs";
	import { compute_slots } from "svelte/internal";

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //max e | min i
	}
	44.35381465897361, 26.02985041110172;

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

	//---| Game State
	let map;
	let lastEnemyRefresh = 0;
	let startTime = 0;
	let bestTime = "--";
	let timeString = "--";
	let deadTime = 0;
	let deadcount = 0;
	let started = false;
	//--| Entities
	let enemies = [];
	let missles = [];
	let friendlyMissles = [];
	let friendlyDefensiveMissles = [];
	let enemyDefensiveMissles = [];

	let zoom = 0;
	let center = {};

	//---| Player State
	let lng = 26.02985041110172; /*25.609*/
	let lat = 44.35381465897361; /*45.653*/
	let ang = 0;
	let misslecooldown = 500;
	let lastMissleFire = Date.now();
	let defensiveMissleCooldown = 800;
	let lastDefensiveMissleFire = Date.now();
	let isHunted = false;

	function updateEnemyHeadings(enemy, targetLng, targetLat) {
		let B = targetLng - enemy.coords.lng;
		var a = targetLng - enemy.coords.lng;
		var b = targetLat - enemy.coords.lat;

		var c = Math.sqrt(a * a + b * b);

		enemy.distance = c;
		if (enemy.killRadius != undefined) {
		}

		if (enemy.missleArr != undefined) {
			friendlyMissles.forEach((missle) => {
				if (
					missle.distance < 0.00425082508 &&
					missle.targetID == enemy.id
				) {
					enemy.defensiveFire();
				}
			});
			if (c < 0.015) {
				enemy.fireMissle();
			}
		}

		if (targetLat >= enemy.coords.lat) {
			enemy.followStep(Math.acos((B / c).toFixed(15)) * 57.29578);
		} else {
			let actualBearing = RangeScaler(
				Math.abs(Math.acos((B / c).toFixed(15)) * 57.29578 + 180),
				180,
				360,
				360,
				180
			);
			enemy.followStep(actualBearing);
		}
	}

	function restart() {
		missles.forEach((missle) => {
			missle.invisble = true;
			missle.draw({ lng: lng, lat: lat });
		});
		enemies.forEach((enemy) => {
			enemy.hideEnemy();
		});
		missles = [];
		enemies = [];
		deadTime = 0;
		deadcount = 0;
		missleBarrage = false;
		started = true;
		lastEnemyRefresh = 0;
		start(true);
		updateBest();
	}

	function getNearestEnemy(enemiesArray) {
		let low = 100000000; //works cuz of how smol the distances we're dealing with here are
		let enemyID = "";
		enemiesArray.forEach((enemy) => {
			if (enemy.distance < low) {
				low = enemy.distance;
				enemyID = enemy.id;
			}
		});
		return enemiesArray.filter((enemy) => enemy.id == enemyID)[0];
	}

	function removeEntity(entity, entityBelongingArray, ix) {
		entity.invisble = true;
		entity.draw({ lng: lng, lat: lat });
		entityBelongingArray.splice(ix, 1);
	}

	function start(isRestart) {
		started = true;
		startTime = Date.now();
		for (let ix = 0; ix <= 20; ix++) {
			let ncoords = new getRandomCoords(lng, lat, 15).get();
			let id = `${Math.random().toFixed(4) + Date.now()}`;
			let eni = new Enemy(
				map,
				{ lng: ncoords.lng, lat: ncoords.lat },
				"",
				"",
				(enemiesArr) => {},
				id,
				enemies,
				missles,
				20,
				1000,
				0,
				2,
				500,
				enemyDefensiveMissles
			);
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
			setInterval(() => {
				if (ang <= 180 && ang > 0 && ang != -1) {
					lng += RangeScaler(ang, 0, 180, mvs, mvs * -1);
					lat += RangeScaler(Math.abs(ang - 90), 0, 90, mvs, 0);
				}
				if (ang > 180 && ang < 360 && ang != -1) {
					lng += RangeScaler(ang - 270, -90, 90, mvs * -1, mvs);
					lat += RangeScaler(Math.abs(ang - 270), 90, 0, 0, mvs * -1);
				}
				playerMarker.setLngLat([lng, lat]);
				playerDefenceLineMarker.setLngLat([lng, lat]);
				playerBluelineMarker.setLngLat([lng, lat]);
				playerRangeMarker.setLngLat([lng, lat]);

				if (
					booleanPointInPolygon(point([lng, lat]), polygon(poly)) &&
					!missleBarrage
				) {
					// setTimeout(() => {
					missleBarrage = true;
					enemies.forEach((enemy, ix) => {
						removeEntity(enemy, enemies, ix);
					});
					enemies = [];
					for (let ix = 0; ix <= 60; ix++) {
						let coords = new getRandomCoords(lng, lat, 5).get();
						let missle = new Missle(
							map,
							coords,
							0.00008,
							"offensive",
							"",
							`${Math.random()}-${Date.now()}`,
							0,
							false
						);
						missles.push(missle);
					}
					// }, 300);
				}

				enemies.forEach((enemy) => {
					enemy.draw({ lng: lng, lat: lat });
					updateEnemyHeadings(enemy, lng, lat);
				});

				missles.forEach((missle, ix) => {
					missle.draw({ lng: lng, lat: lat });
					updateEnemyHeadings(missle, lng, lat);
					if (
						missle.distance < missle.killRadius &&
						missle.distance > 0
					) {
						deadcount++;
						console.log(deadcount)
						if (deadcount == 1) {
							deadTime = Date.now();
							localStorage.setItem("best", deadTime - startTime);
						}
						removeEntity(missle, missles, ix);
					}
				});
				isHunted = missles.length != 0;
				friendlyDefensiveMissles.forEach(
					(friendlyDefensiveMissle, ix) => {
						friendlyDefensiveMissle.draw({ lng: lng, lat: lat });
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
									ix
								);
								if (Math.random() < 0.8) {
									missles.forEach((missle, ix) => {
										if (missle.id == enemyMissleID) {
											removeEntity(missle, missles, ix);
										}
									});
								}
							}
						} else {
							removeEntity(
								friendlyDefensiveMissle,
								friendlyDefensiveMissles,
								ix
							);
						}
					}
				);

				enemyDefensiveMissles.forEach((enemyDefensiveMissle, ix) => {
					enemyDefensiveMissle.draw({ lng: lng, lat: lat });

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
								ix
							);

							if (Math.random() < 0.4) {
								friendlyMissles.forEach((missle, ix) => {
									if (missle.id == enemyMissleID) {
										removeEntity(
											missle,
											friendlyMissles,
											ix
										);
									}
								});
							}
						}
					} else {
						removeEntity(
							enemyDefensiveMissle,
							enemyDefensiveMissles,
							ix
						);
					}
				});

				friendlyMissles.forEach((friendlyMissle, ix) => {
					friendlyMissle.draw({ lng: lng, lat: lat });

					let targetEnemy = getNearestEnemy(enemies);

					if (targetEnemy != undefined) {
						let enemyID = targetEnemy.id;
						friendlyMissle.targetID = enemyID;
						updateEnemyHeadings(
							friendlyMissle,
							targetEnemy.coords.lng,
							targetEnemy.coords.lat
						);
						if (
							friendlyMissle.distance < friendlyMissle.killRadius
						) {
							removeEntity(friendlyMissle, friendlyMissles, ix);
							enemies.forEach((enemy, ix) => {
								if (enemy.id == enemyID) {
									removeEntity(enemy, enemies, ix);
								}
							});
						}
					} else {
						removeEntity(friendlyMissle, friendlyMissles, ix);
					}
				});
				map.panTo([lng + 0.0, lat - 0.002], { duration: 0 });
				if (deadTime == 0) {
					let ms = Date.now() - startTime;
					timeString = `${(ms / 1000 / 60)
						.toFixed(0)
						.toString()
						.padStart(2, "0")}:${(ms / 1000)
						.toFixed(0)
						.toString()
						.padStart(2, "0")}`;
				} else {
					let ms = deadTime - startTime;
					timeString = `${(ms / 1000 / 60)
						.toFixed(0)
						.toString()
						.padStart(2, "0")}:${(ms / 1000)
						.toFixed(0)
						.toString()
						.padStart(2, "0")}`;
				}
				if (
					Date.now() - lastEnemyRefresh > 30000 ||
					lastEnemyRefresh == 0
				) {
					lastEnemyRefresh = Date.now();
					for (let ix = 0; ix <= 12; ix++) {
						let ncoords = new getRandomCoords(lng, lat, 8).get();
						let id = `${Math.random().toFixed(4) + Date.now()}`;
						let eni = new Enemy(
							map,
							{ lng: ncoords.lng, lat: ncoords.lat },
							"",
							"",
							(enemiesArr) => {},
							id,
							enemies,
							missles,
							20,
							1000,
							0,
							2,
							500,
							enemyDefensiveMissles
						);
						enemies.push(eni);
					}
				}
			}, 50);
		}
	}

	function updateBest() {
		let bestTimeUnix = localStorage.getItem("best");
		if (bestTimeUnix != null && bestTimeUnix != undefined) {
			bestTime = `${(bestTimeUnix / 1000 / 60)
				.toFixed(0)
				.toString()
				.padStart(2, "0")}:${(bestTimeUnix / 1000)
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

	onMount(() => {
		updateBest();
		
		map.on("load", () => {
			map.addSource("source", {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "Polygon",
						coordinates: poly,
					},
				},
			});
			const pulsingDotx = pulsingDot(200, map, 0.2);
			const pulsingDotxx = pulsingDot(200, map, 0.8);

			// Add the image to the map style.
			map.addImage("pulsing-dot", pulsingDotx, { pixelRatio: 2 });
			map.addImage("pulsing-dotx", pulsingDotxx, { pixelRatio: 2 });

			// Create a new layer and style it using `fill-pattern`.
			map.addLayer({
				id: "pattern-layer",
				type: "fill",
				source: "source",
				paint: {
					"fill-pattern": "pulsing-dot",
					"fill-outline-color": "red",
				},
			});
			map.addLayer({
				id: "patternx-layer",
				type: "line",
				source: "source",
				paint: {
					"line-pattern": "pulsing-dotx",
					"line-width": 5,
				},
			});
		});
	});

	function defensiveFire() {
		let low = 100000;
		let enemyMissleID = "";
		missles.forEach((missle) => {
			if (missle.distance < low) {
				low = missle.distance;
				enemyMissleID = missle.id;
			}
		});

		let targetMissle = missles.filter(
			(missle) => missle.id == enemyMissleID
		)[0];
		if (targetMissle != undefined) {
			if (
				targetMissle.distance < 0.00425082508 &&
				friendlyDefensiveMissles.length <= 5 &&
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
					true
				);
				friendlyDefensiveMissles.push(friendlyDefenisveMissle);
			}
		}
	}

	function fire() {
		let low = 100000;
		let enemyID = "";
		enemies.forEach((enemy) => {
			if (enemy.distance < low) {
				low = enemy.distance;
				enemyID = enemy.id;
			}
		});

		let targetEnemy = enemies.filter((enemy) => enemy.id == enemyID)[0];
		if (
			targetEnemy.distance < 0.00725082508 &&
			friendlyMissles.length < 3 &&
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
				true
			);
			friendlyMissles.push(friendlyMissle);
		}
	}

	const mvs = 0.0002;
	let fullScreenBtnDisplay = "flex";
	function pans() {
		window.screen.orientation
			.lock("landscape")
			.then((res) => {})
			.catch((e) => {});
		document.documentElement.requestFullscreen();
		fullScreenBtnDisplay = "none";
	}
</script>

<svelte:window on:keydown={onKeyDown} />
<main>
	<Map
		attribution={false}
		on:click={pans}
		minzoom="14"
		maxzoom="14"
		id="map"
		style="https://api.maptiler.com/maps/fcae873d-7ff0-480b-8d6d-41963084ad90/style.json?key=R1cyh6lj1mTfNEycg2N1"
		location={{ lng: lng, lat: lat, zoom: 35 }}
		bind:map
	/>
	<div class="joy" id="joy" />
</main>
<div id="dashboard">
	<FireControlDashboard
		{deadcount}
		{timeString}
		{bestTime}
		{fire}
		{started}
	/>
	<NavDashboard {started} />
	<OpsDashboard {fire} {defensiveFire} {isHunted} {started} />
</div>
<Button
	on:click={pans}
	id="fullscreen"
	top="20%"
	left="30%"
	color="#5c41ff"
	borderColor="#5c41ff"
	label="Go Fullscreen"
	width="50%"
	horizontalFont="2.4vh"
	verticalFont="2.2vh"
	opacity={started ? 0 : 1}
	height="10%"
	onClick={() => {
		start();
	}}
	backgroundColor="#2400ff20"
/>
<Button
	id="start"
	top="40%"
	left="30%"
	color="#5c41ff"
	borderColor="#5c41ff"
	label="Start Survival Run"
	width="50%"
	horizontalFont="2.4vh"
	verticalFont="2.2vh"
	opacity={started ? 0 : 1}
	height="10%"
	onClick={() => {
		start();
	}}
	backgroundColor="#2400ff20"
/>
<Button
	id="retry"
	top="60%"
	left="40%"
	color="#5c41ff"
	borderColor="#5c41ff"
	label="Retry"
	horizontalFont="2.7vh"
	verticalFont="2.2vh"
	width="20%"
	opacity={deadcount > 0 ? 1 : 0}
	height="7%"
	onClick={() => {
		restart();
	}}
	backgroundColor="#2400ff20"
/>

<style lang="scss">
	:global(body) {
		background-color: #000;
		font-family: "Electrolize", sans-serif;
	}

	@media (orientation: landscape) {
		#start {
			display: flex;
		}
	}

	@media (orientation: portrait) {
		#start {
			display: none !important;
		}
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
	#fullScreenButton {
		position: absolute;
		align-items: center;
		justify-content: center;
		top: 20%;
		left: 30%;
		display: flex;
		color: #5c41ff;
		font-size: 2.8vh;
		z-index: 150000;
		width: 50%;
		backdrop-filter: blur(5px);
		background-color: #2400ff20;
		height: 10%;
		border-radius: 3px;
		border: solid 1px #2400ff;
	}
</style>
