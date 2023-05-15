<script>
    import Label from "../common/Label.svelte";
    import { getDynamicBorderRadius } from "../../fn/dynamicBorders";
    let ix = -1;
    let distance = 0;
    let coords = { lng: 0, lat: 0 };
    export { ix, distance, coords };
</script>

<div
    class="waypointContainer"
    style="border-radius: {getDynamicBorderRadius(5)};"
>
    <Label
        text={ix}
        color="#FFF"
        horizontalFont="12px"
        left="2%"
        height="100%"
        width="20%"
        style="border-right: solid 1px #2400FF;"
    />
    <Label
        text={`${distance}km`}
        color="#FFF"
        horizontalFont="10px"
        left="30%"
        top="55%"
    />
    <Label
        text={`${coords.lng} | ${coords.lat}`}
        color="#FFF"
        horizontalFont="7px"
        left="30%"
        top="25%"
    />
</div>

<style>
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
    }
</style>
