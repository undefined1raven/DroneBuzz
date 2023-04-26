<script>
    import { onMount } from "svelte";

    let id;
    let label;
    let className;
    let color;
    let style;
    let lightColor;
    let borderColor;
    let backgroundColor;
    let onClick;
    let width;
    let height;
    let top;
    let left;
    let horizontalFont;
    let verticalFont;
    let opacity;
    let touchStartUnix = 0;

    const root = document.documentElement;
    let fontSize = "2.4vh";
    let clientWidth = root.clientWidth;
    let clientHeight = root.clientHeight;

    onMount(() => {
        fontController();
    });

    const updateTouchUnix = (tx) => {
        touchStartUnix = tx;
    };

    const checkClick = (e) => {
        if (Date.now() - touchStartUnix < 300) {
            onClick(e);
            if (lightColor != undefined) {
                e.target.style.color = lightColor;
                setTimeout(() => {
                    e.target.style.color = color;
                }, 500);
            }
        }
    };

    function onResize(e) {
        clientHeight = root.clientHeight;
        clientWidth = root.clientWidth;
        console.log(clientWidth);
        fontController();
    }

    function fontController() {
        let orientation = clientHeight > clientWidth ? "portrait" : "landscape";
        if (orientation == "portrait") {
            if (verticalFont != undefined) {
                fontSize = verticalFont;
            } else {
                fontSize = "1.4vh";
            }
        } else {
            if (horizontalFont != undefined) {
                fontSize = horizontalFont;
            } else {
                fontSize = "2.8vh";
            }
        }
    }

    export {
        lightColor,
        id,
        onClick,
        label,
        className,
        color,
        borderColor,
        backgroundColor,
        width,
        height,
        top,
        left,
        horizontalFont,
        verticalFont,
        opacity,
        style,
    };
</script>

<svelte:window on:resize={onResize} />
<div
    {id}
    on:touchstart={() => updateTouchUnix(Date.now())}
    on:touchend={checkClick}
    class={`button ${className}`}
    style="opacity: {opacity}; border-radius: 3px; font-size: {fontSize}; left: {left}; top: {top}; width: {width}; height: {height}; color: {color}; border: solid 1px {borderColor}; background-color: {backgroundColor}; {style}"
>
    {label}
</div>

<style>
    .button {
        user-select: none;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0%;
        backdrop-filter: blur(5px);
    }
</style>
