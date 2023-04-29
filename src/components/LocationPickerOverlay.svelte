<script>
    let text;
    import Button from "./Button.svelte";
    import Label from "./Label.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export { text };
</script>

<div class="locationPickerOverlayContainer">
    <Button
        onClick={() => dispatch("newLocationPicked")}
        label="Select"
        top="70.277777778%"
        left="32.1875%"
        color="#725AFF"
        backgroundColor="#2400FF20"
        backdropFilter="blur(5px)"
        borderRadius="3px"
        borderColor="#2400FF"
        width="18.125%"
        height="11.111111111%"
    />
    <Button
        onClick={() => dispatch("hidePicker")}
        label="Cancel"
        top="70.277777778%"
        left="51.09375%"
        color="#3E21EC"
        borderColor="#1800AC"
        borderRadius="3px"
        backgroundColor="#12008420"
        backdropFilter="blur(5px)"
        width="18.125%"
        height="11.111111111%"
    />
    <Label
        width="37.03125%"
        height="9.444444444%"
        color="#725AFF"
        top="85.555555556%"
        borderRadius="3px"
        left="32.1875%"
        backgroundColor="#2400FF20"
        backdropFilter="blur(5px)"
        text={text ? text : "Lat: -- | Lng: --"}
    />
</div>
