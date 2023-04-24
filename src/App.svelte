<script>
	import { onMount } from "svelte";
	import { Map } from "@onsvisual/svelte-maps";
	import maplibre from "maplibre-gl";
	import Button from "./components/Button.svelte";
	import FireControlDashboard from "./components/FireControlDashboard.svelte";
	import NavDashboard from "./components/NavDashboard.svelte";
	import OpsDashboard from "./components/OpsDashboard.svelte";
	import { getBearing } from "./fn/getBearing.js";
	import { RangeScaler } from "./fn/RangeScaler.js";
	import { getRandomCoords } from "./fn/getRandomCoords.js";
	import { Enemy } from "./components/Enemy.js";
	import { Missle } from "./components/Missle.js";
	import {
		BluelineElement,
		DefenceLineElement,
		PlayerElement,
		RangeElement,
		MissleElement,
		PlayerRangeElement,
	} from "./components/Markers.js";
	import nipplejs from "nipplejs";

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //max e | min i
	}
	44.35381465897361, 26.02985041110172;
	let map;
	let lastEnemyRefresh = 0;
	let startTime = 0;
	let bestTime = "--";
	let timeString = "--";
	let deadTime = 0;
	let deadcount = 0;
	let started = false;
	let zoom = 0;
	let center = {};
	let lng = 26.02985041110172; /*25.609*/
	let lat = 44.35381465897361; /*45.653*/
	let ang = 0;
	let enemies = [];
	let missles = [];

	function updateEnemyHeadings(enemy) {
		let B = lng - enemy.coords.lng;
		var a = lng - enemy.coords.lng;
		var b = lat - enemy.coords.lat;

		var c = Math.sqrt(a * a + b * b);

		enemy.distance = c;
		if (enemy.killRadius != undefined) {
		}

		if (enemy.missleArr != undefined) {
			if (c < 0.015) {
				enemy.fireMissle();
			}
		}

		if (lat >= enemy.coords.lat) {
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
		started = true;
		lastEnemyRefresh = 0;
		start(true);
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
				1000
			);
			enemies.push(eni);
		}

		if (!isRestart) {
			let defenceline = new DefenceLineElement("20vh").getElement();
			let blueline = new BluelineElement("80vh").getElement();
			let playerElement = new PlayerElement().getElement();
			let rangeline = new PlayerRangeElement("120vh").getElement();
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
				ang = -1;
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
				enemies.forEach((enemy) => {
					enemy.draw({ lng: lng, lat: lat });
					updateEnemyHeadings(enemy);
				});
				missles.forEach((missle, ix) => {
					missle.draw({ lng: lng, lat: lat });
					updateEnemyHeadings(missle);
					if (missle.distance < 0.00008 && missle.distance > 0) {
						console.log("kill");
						deadcount++;
						if (deadcount == 1) {
							deadTime = Date.now();
							localStorage.setItem("best", deadTime - startTime);
						}
						missle.invisble = true;
						missle.draw({ lng: lng, lat: lat });
						missles.splice(ix, 1);
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
					for (let ix = 0; ix <= 9; ix++) {
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
							1000
						);
						enemies.push(eni);
					}
				}
			}, 50);
		}
	}

	onMount(() => {
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
	});

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

<main>
	<Map
		attribution={false}
		on:click={pans}
		id="map"
		style="https://api.maptiler.com/maps/fcae873d-7ff0-480b-8d6d-41963084ad90/style.json?key=R1cyh6lj1mTfNEycg2N1"
		location={{ lng: lng, lat: lat, zoom: 35 }}
		bind:map
		bind:zoom
		bind:center
	/>
	<div
		on:click={pans}
		style="display: {fullScreenBtnDisplay}"
		id="fullScreenButton"
	>
		Go Full Screen
	</div>
	<div class="joy" id="joy" />
</main>
<div id="dashboard">
	<FireControlDashboard
		{deadcount}
		{timeString}
		{bestTime}
		opacity={started ? 1 : 0}
	/>
	<NavDashboard opacity={started ? 1 : 0} />
	<OpsDashboard opacity={started ? 1 : 0} />
</div>
<Button
	id="start"
	top="40%"
	left="30%"
	color="#5c41ff"
	borderColor="#5c41ff"
	label="Start Survival Run"
	width="50%"
	fontSize="2.4vh"
	opacity={started ? 0 : 1}
	height="10%"
	onClick={() => {
		start();
	}}
	backgroundColor="#2400ff20"
/>
<Button
	id="start"
	top="60%"
	left="40%"
	color="#5c41ff"
	borderColor="#5c41ff"
	label="Retry"
	fontSize="3vh"
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
