<script>
    import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import { getDynamicBorderRadius } from "../../fn/dynamicBorders";
    import { createEventDispatcher } from "svelte";
    let width;
    let height;
    let top;
    let left;
    let borderRadius;
    let max;
    let min;
    let defaultValue;
    let verticalFont;
    let horizontalFont;
    let value = parseFloat(defaultValue) != NaN ? parseFloat(defaultValue) : 0;
    const dispatch = createEventDispatcher();
    export {
        width,
        height,
        top,
        left,
        borderRadius,
        max,
        min,
        defaultValue,
        verticalFont,
        horizontalFont,
    };

    let fontSize = "2vh";
    const root = document.documentElement;
    let clientWidth = root.clientWidth;
    let clientHeight = root.clientHeight;

    onMount(() => {
        fontController();
    });

    function fireUpdate(val) {
        dispatch("onChange", val);
    }

    function onKeyDown(e) {
        const lval = e.target.value;
        if (lval > max) {
            e.preventDefault();
            value = max;
        }
        if (lval < min) {
            value = min;
        }
    }

    function onValueChange(e) {
        if (e.target.value >= max) {
            value = max;
        }
        if (e.target.value <= min) {
            value = min;
        }
        if (e.target.value >= min && e.target.value <= max) {
            value = e.target.value;
        }
    }

    $: fireUpdate(value);

    function fontController() {
        let orientation = clientHeight > clientWidth ? "portrait" : "landscape";
        if (orientation == "portrait") {
            if (verticalFont != undefined) {
                fontSize =
                    (parseFloat(
                        verticalFont.substring(0, verticalFont.length - 2)
                    ) *
                        clientWidth) /
                        640 +
                    "px";
            } else {
                fontSize = "1.4vh";
            }
        } else {
            if (horizontalFont != undefined) {
                fontSize =
                    (parseFloat(
                        horizontalFont.substring(0, horizontalFont.length - 2)
                    ) *
                        clientWidth) /
                        640 +
                    "px";
            } else {
                fontSize = "2.8vh";
            }
        }
    }
</script>

<svelte:window on:resize={() => fontController()} />
<div
    class="numberPickerContainer"
    style="position: absolute; width: {width
        ? width
        : '28.404669261%'}; height: {height
        ? height
        : '14.163090129%'}; top: {top ? top : 'auto'}; left: {left
        ? left
        : 'auto'}"
>
    <Button
        onClick={() => {
            value > min ? value-- : "";
            fireUpdate(value);
        }}
        label="-"
        color={value > min ? "#2400FF" : "#00057C"}
        backgroundColor="{value > min ? '#2400FF' : '#00057C'}20"
        borderRadius="5px"
        width="22.602739726%"
        height="100%"
        top="0%"
        left="0%"
        horizontalFont="17px"
    />
    <Button
        onClick={() => {
            if (value < max) {
                value += 1;
            }
        }}
        label="+"
        color={value < max ? "#2400FF" : "#00057C"}
        backgroundColor="{value < max ? '#2400FF' : '#00057C'}20"
        borderRadius="5px"
        width="22.602739726%"
        height="100%"
        top="0%"
        left="76.712328767%"
        horizontalFont="17px"
    />
    <input
        {max}
        {min}
        bind:value
        on:change={onValueChange}
        on:keydown={onKeyDown}
        type="number"
        class="numberPickerInput"
        style="border-radius: {getDynamicBorderRadius(
            borderRadius
                ? borderRadius.substring(0, borderRadius.length - 2)
                : 0
        )}; font-size: {fontSize};"
    />
</div>

<style>
    .numberPickerInput {
        position: absolute;
        top: 0%;
        left: 27.397260274%;
        width: 45.205479452%;
        height: 100%;
        outline: none;
        background-color: #2400ff20;
        color: #fff;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
</style>
