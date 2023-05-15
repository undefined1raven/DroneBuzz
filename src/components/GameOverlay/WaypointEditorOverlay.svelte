<script>
    import { getDynamicBorderRadius } from "../../fn/dynamicBorders";
    import { createEventDispatcher } from "svelte";
    import Label from "../common/Label.svelte";
    import Button from "../common/Button.svelte";
    import WaypointCard from "../GameUI/WaypointCard.svelte";
    const dispatch = createEventDispatcher();
    let show = false;
    let waypoints = [
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
        { distance: 0, coords: { lng: 44.15155, lat: 24.69412 } },
    ];
    export { show };
</script>

{#if show}
    <div class="waypointEditorContainer">
        <div
            class="waypointsContainer"
            style="border-radius: {getDynamicBorderRadius(5)}"
        >
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
        <Button
            onClick={() => dispatch("setWaypointEditor", false)}
            label="Done"
            horizontalFont="10px"
            left="0.625%"
            width="18.59375%"
            height="7.222222222%"
            color="#FFF"
            borderColor="#2400FF"
            backgroundColor="#2400FF20"
            style="border-radius: {getDynamicBorderRadius(5)};"
            backdropFilter="blur(5px)"
            top="89.722222222%"
        />
    </div>
{/if}

<style>
    .waypointsContainer {
        position: absolute;
        top: 3.333333333%;
        left: 0.775%;
        width: 18.740375%;
        height: 85.055555556%;
    }
    .waypointList {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        overflow-y: scroll;
    }
    .waypointList::-webkit-scrollbar {
        width: 0vh;
        height: 0vh;
    }

    .waypointList::-webkit-scrollbar-thumb {
        background: #2400ff;
    }
    .waypointList::-webkit-scrollbar-track {
        /* Background */
        background: #00008300;
    }
</style>
