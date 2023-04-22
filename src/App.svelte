<script>
	import { onMount } from "svelte";
	import { Map } from "@onsvisual/svelte-maps";
	import maplibre from "maplibre-gl";
	import Button from "./components/Button.svelte";
	import nipplejs from "nipplejs";

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //max e | min i
	}

	let map;
	let zoom = 0;
	let center = {};
	let lng = 16.62662018;
	let lat = 49.2125578;
	var marker;

	var trainStationIcon = document.createElement("img");
	trainStationIcon.style.width = "7vh";
	trainStationIcon.style.height = "8vh";
	trainStationIcon.style.backgroundSize = "contain";
	trainStationIcon.src = "./visual_assets/player.svg";
	trainStationIcon.style.cursor = "pointer";

	onMount(() => {
		marker = new maplibre.Marker(trainStationIcon)
			.setLngLat([lng, lat])
			.addTo(map);
		var joy = nipplejs.create({
			zone: document.getElementById("joy"),
			color: "#5c41ff30",
			mode: "static",
			position: { left: "50%", top: "50%" },
		});
		joy.on("move", (evt, data) => {
			marker.remove();
			marker = new maplibre.Marker(trainStationIcon, {
				rotation: (data.angle.degree - 90) * -1,
			})
				.setLngLat([lng, lat])
				.addTo(map);
		});
		joy.add();
	});

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
		setInterval(() => {
			lng += 0.000005;
			lat += 0.000005;
			marker.setLngLat([lng, lat]);
			map.panTo([lng, lat]);
		}, 50);
	}
</script>

<main>
	<Map
		on:click={pans}
		id="map"
		style="https://api.maptiler.com/maps/fcae873d-7ff0-480b-8d6d-41963084ad90/style.json?key=R1cyh6lj1mTfNEycg2N1"
		location={{ lng: 16.62662018, lat: 49.2125578, zoom: 35 }}
		bind:map
		bind:zoom
		bind:center
	/>
	<div on:click={pans} id="fullScreenButton">Go Full Screen</div>
	<div class="joy" id="joy" />
</main>
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
		top: 32.777777778%;
		left: 0%;
		width: 50vh;
		height: 50vh;
		z-index: 15000;
		background-color: #5c41ff00;
	}
	main {
		width: 100%;
		height: 150vh;
		position: relative;
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
