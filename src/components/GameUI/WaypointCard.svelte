<script>
    import Label from "../common/Label.svelte";
    import { getDynamicBorderRadius } from "../../fn/dynamicBorders";
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";
    const dispatch = createEventDispatcher();
    let ix = -1;
    let distance = 0;
    let selected = false;
    let coords = { lng: 0, lat: 0 };
    export { ix, distance, coords, selected };
</script>

<div
    transition:fly={{ x: "-10%", duration: 50 }}
    class="waypointContainer waypointContainerElement fadeIn"
    style="border-radius: {getDynamicBorderRadius(
        5
    )}; background-color: {selected ? '#2400FF50' : '#2400FF20'};"
    on:click={() => dispatch("onSelectedWaypoint", { index: ix - 1 })}
>
    <Label
        className="waypointContainerElement"
        text={ix}
        color="#FFF"
        horizontalFont="12px"
        left="2%"
        height="100%"
        width="20%"
        style="border-right: solid 1px #2400FF;"
    />
    <Label
        className="waypointContainerElement"
        text={`${distance}km`}
        color="#FFF"
        horizontalFont="10px"
        left="30%"
        top="55%"
    />
    <Label
        className="waypointContainerElement"
        text={`${coords.lng} | ${coords.lat}`}
        color="#FFF"
        horizontalFont="7px"
        left="30%"
        top="25%"
    />
</div>

<style>
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .fadeIn{
        /* animation: fade linear 0.1s; */
    }
    .waypointContainer {
        position: relative;
        width: 98%;
        height: 15.695652174%;
        background-color: #05004320;
        margin-bottom: 7%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px #2400ff;
        backdrop-filter: blur(5px);
        background-color: #2400ff20;
        transition: all linear 0.1s;
    }
</style>
