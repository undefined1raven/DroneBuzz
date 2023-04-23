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
	import { Enemy } from "./components/BasicEnemy.js";
	import {
		BluelineElement,
		DefenceLineElement,
		PlayerElement,
		RangeElement,
	} from "./components/Markers.js";
	import nipplejs from "nipplejs";
	import { element } from "svelte/internal";

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //max e | min i
	}

	let map;
	let zoom = 0;
	let center = {};
	let lng = 25.609;
	let lat = 45.653;
	let ang = 0;
	let enemies = [];

	onMount(() => {
		let defenceline = new DefenceLineElement().getElement();
		let blueline = new BluelineElement().getElement();
		let playerElement = new PlayerElement().getElement();
		let rangeline = new RangeElement().getElement();
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

		for (let ix = 0; ix <= 20; ix++) {
			let ran = Math.random().toString();
			let off = parseFloat(`0.00${ran[2]}${ran[3]}${ran[4]}${ran[5]}`);
			let id = `${Math.random().toFixed(4) + Date.now()}`;
			let eni = new Enemy(
				map,
				{ lng: lng + off, lat: lat + off },
				"",
				"",
				(enemiesArr) => {
					for (let cix = 0; cix < enemiesArr.length; cix++) {
						if (enemiesArr[cix].id == id) {
							enemiesArr.splice(cix - 1, 1);
						}
					}
				},
				id,
				enemies
			);
			enemies.push(eni);
		}

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
				// console.log(
				// 	getBearing(enemy.coords.lat, enemy.coords.lng, lat, lng)
				// );
				enemy.followStep(
					getBearing(enemy.coords.lat, enemy.coords.lng, lat, lng)
				);
			});
			map.panTo([lng + 0.0, lat - 0.002], { duration: 0 });
		}, 50);
		setTimeout(() => {
			// let enemy1 = new Enemy(map, { lng: lng, lat: lat }, "", "");
			// enemies.push(enemy1);
			// setInterval(() => {
			// 	// enemy1.updateEnemy({ lng: lng, lat: lat });
			// }, 10000);
		}, 5000);
	});
	const mvs = 0.0002;
	let fullScreenBtnDisplay = "flex";
	function pans() {
		window.screen.orientation
			.lock("landscape")
			.then((res) => {
				console.log("yeey");
			})
			.catch((e) => {
				console.log("not yeeey");
			});
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
	<FireControlDashboard />
	<NavDashboard />
	<OpsDashboard />
</div>
<Button
	top="50%"
	color="#2400ff"
	borderColor="#2400ff"
	label={lat.toFixed(5)}
	width="20%"
	height="5%"
	onClick={() => {
		console.log("weee");
	}}
	backgroundColor="#2400ff20"
/>
<Button
	top="55%"
	color="#2400ff"
	borderColor="#2400ff"
	label={lng.toFixed(5)}
	width="20%"
	height="5%"
	onClick={() => {
		console.log("weee");
	}}
	backgroundColor="#2400ff20"
/>

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
	#fullScreenButton {
		position: absolute;
		align-items: center;
		justify-content: center;
		top: 20%;
		left: 30%;
		display: flex;
		color: #5c41ff;
		font-size: 2vh;
		z-index: 150000;
		width: 50%;
		backdrop-filter: blur(5px);
		background-color: #2400ff20;
		height: 4%;
		border-radius: 3px;
		border: solid 1px #2400ff;
	}
</style>
