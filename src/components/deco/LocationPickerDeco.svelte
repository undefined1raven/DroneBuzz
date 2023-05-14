<script>
    let style;
    let size;
    let tabletSize;
    let sizeActual;
    let show = false;

    const root = document.documentElement;
    if (root.clientWidth < 1023) {
        sizeActual = size;
    } else {
        sizeActual = tabletSize;
    }

    import { onMount, onDestroy } from "svelte";
    export { style, size, tabletSize, show };
    let opacities = [];
    let interval;
    onMount(() => {
        interval = setInterval(() => {
            opacities = [];
            for (let ix = 0; ix <= 7; ix++) {
                opacities.push(getRandomOpacity());
            }
        }, 200);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    function getRandomOpacity() {
        let random = Math.random();
        if (random > 0.2) {
            return random;
        } else {
            return 0.2;
        }
    }
</script>
{#if show}
<svg
    width={sizeActual}
    height={size ? size : "5vh"}
    style="position: absolute; {style ? style : ''}"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <rect
        x="12"
        y="12"
        width="3"
        height="3"
        fill="white"
        fill-opacity={opacities[0]}
    />
    <circle
        cx="13.5"
        cy="13.5"
        r="7"
        stroke="white"
        fill-opacity={opacities[7]}
    />
    <rect
        x="8.5498"
        y="9.25735"
        width="1"
        height="13.6932"
        transform="rotate(-45 8.5498 9.25735)"
        fill="white"
        fill-opacity={opacities[1]}
    />
    <rect
        x="13"
        width="1"
        height="7"
        fill="white"
        fill-opacity={opacities[2]}
    />
    <rect
        x="13"
        y="20"
        width="1"
        height="7"
        fill="white"
        fill-opacity={opacities[3]}
    />
    <rect
        y="14"
        width="1"
        height="7"
        transform="rotate(-90 0 14)"
        fill="white"
        fill-opacity={opacities[4]}
    />
    <rect
        x="20"
        y="14"
        width="1"
        height="7"
        transform="rotate(-90 20 14)"
        fill="white"
        fill-opacity={opacities[5]}
    />
    <rect
        x="17.7422"
        y="8.55026"
        width="1"
        height="13.6614"
        transform="rotate(45 17.7422 8.55026)"
        fill="white"
        fill-opacity={opacities[6]}
    />
</svg>
{/if}
<style>
    rect,
    circle {
        transition: all linear 0.2s;
    }
</style>
