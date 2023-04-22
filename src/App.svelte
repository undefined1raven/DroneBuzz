<script>
	import { onMount } from "svelte";
	import { Map } from "@onsvisual/svelte-maps";
	import maplibre from "maplibre-gl";

	let map;
	let zoom = 0;
	let center = {};
	let lng = 16.62662018;
	let lat = 49.2125578;

	onMount(() => {
		map.addControl(new maplibre.NavigationControl(), "top-left");
	});

	function pans() {
		screen.orientation
			.lock("landscape")
			.then((res) => {})
			.catch((e) => {});
		document.documentElement.requestFullscreen();
		setInterval(() => {
			lng += 0.000005;
			lat += 0.000005;
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
</main>

<style lang="scss">
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
