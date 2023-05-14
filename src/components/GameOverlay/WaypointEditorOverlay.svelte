<script>
    import { getDynamicBorderRadius } from "../../fn/dynamicBorders";
    import { createEventDispatcher } from "svelte";
    import Label from "../common/Label.svelte";
    import Button from "../common/Button.svelte";
    import WaypointCard from "../GameUI/WaypointCard.svelte";
    const dispatch = createEventDispatcher();
    let show = false;
    let waypoints = [
        { distance: 0, coords: {lng: 44.15155, lat: 24.69412} },
        { distance: 0, coords: {lng: 44.15155, lat: 24.69412} },
        { distance: 0, coords: {lng: 44.15155, lat: 24.69412} },
        { distance: 0, coords: {lng: 44.15155, lat: 24.69412} },
        { distance: 0, coords: {lng: 44.15155, lat: 24.69412} },
    ];
    export { show };
</script>

{#if show}
    <div class="waypointEditorContainer">
        <div
            on:click={() => dispatch("setWaypointEditor", false)}
            class="waypointsContainer"
            style="border-radius: {getDynamicBorderRadius(5)}"
        >
            <Label
                text="Waypoint Editor"
                horizontalFont="8px"
                color="#BEB4FF"
                top="2.675585284%"
                left="3.361344538%"
            />
            <ul class="waypointList">
                {#each waypoints as waypoint, ix}
                    <WaypointCard
                        ix={ix + 1}
                        distance={waypoint.distance}
                        coords={waypoint.coords}
                    />
                {/each}
            </ul>
        </div>
    </div>
{/if}

<style>
    .waypointsContainer {
        position: absolute;
        top: 3.333333333%;
        left: 1.875%;
        width: 18.59375%;
        height: 83.055555556%;
        background-color: #2400ff20;
        backdrop-filter: blur(5px);
    }
    .waypointList {
        position: absolute;
        top: 7.692307692%;
        left: 0%;
        width: 100%;
        height: 90.969899666%;
        background-color: #2400ff20;
        padding: 0;
        margin: 0;
    }
</style>
