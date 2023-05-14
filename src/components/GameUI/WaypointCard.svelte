<script>
    import Label from "../common/Label.svelte";
    let ix = -1;
    let distance = 0;
    let coords = {lng: 0, lat: 0};
    export { ix, distance, coords };
</script>

<div class="waypointContainer">
    <Label text={ix} color="#FFF" horizontalFont="8px" left="2%" height="100%" width="10%" style="border-right: solid 1px #2400FF;"/>
    <Label text={`${distance}km`} color="#FFF" horizontalFont="8px" left="22%" top="34%"/>
    <Label text={`${coords.lng} | ${coords.lat}`} color="#FFF" horizontalFont="5px" left="22%" top="5%"/>
</div>

<style>
    .waypointContainer {
        position: relative;
        width: 100%;
        height: 8.695652174%;
        background-color: #05004320;
        margin-bottom: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: solid 1px #2400FF;
        border-bottom: solid 1px #2400FF;
    }
</style>
