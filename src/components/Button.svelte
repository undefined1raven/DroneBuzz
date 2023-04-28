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
    let backdropFilter;
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

    function iu(val, valDefault) {
        return val != undefined ? val : valDefault;
    } //shorthand for isUndefined. short name for readibility

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
        backdropFilter,
    };
</script>

<svelte:window on:resize={onResize} />
<div
    {id}
    on:touchstart={() => updateTouchUnix(Date.now())}
    on:touchend={checkClick}
    class={`button ${iu(className, "")}`}
    style="
        opacity: {iu(opacity, '1')}; 
        font-size: {iu(fontSize, '2vh')}; 
        left: {iu(left, 'auto')}; 
        top: {iu(top, 'auto')}; 
        width: {iu(width, 'auto')}; 
        height: {iu(height, 'auto')}; 
        color: {iu(color, '#FFF')}; 
        background-color: {iu(backgroundColor, '#0500FF00')}; 
        border: solid 1px {iu(borderColor, '#0500FF')};
        backdrop-filter: {iu(backdropFilter, 'blur(0px)')};
        {iu(style, '')}"
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
    }
</style>
