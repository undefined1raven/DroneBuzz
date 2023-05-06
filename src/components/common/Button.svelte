<script>
    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
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
    let tabletTop;
    let tabletLeft;
    let borderRadius;
    let touchStartUnix = 0;
    let fontSize = "2.4vh";
    const root = document.documentElement;
    let clientWidth = root.clientWidth;
    let clientHeight = root.clientHeight;

    onMount(() => {
        fontController();
    });

    const updateTouchUnix = (tx) => {
        dispatch("onTouchStart");
        touchStartUnix = tx;
    };

    const checkClick = (e) => {
        dispatch("onTouchEnd");
        if (Date.now() - touchStartUnix < 300) {
            onClick != undefined
                ? onClick(e)
                : console.log("onClick undefined");
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

    function positionParser(mobilePosition, tabletPosition) {
        if (clientWidth > 1050 && tabletPosition != "auto") {
            return tabletPosition;
        } else {
            return mobilePosition;
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
        borderRadius,
        tabletLeft,
        tabletTop,
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
        left: {positionParser(iu(left, 'auto'), iu(tabletLeft, 'auto'))}; 
        top: {positionParser(iu(top, 'auto'), iu(tabletTop, 'auto'))};     
        width: {iu(width, 'auto')}; 
        height: {iu(height, 'auto')}; 
        color: {iu(color, '#FFF')}; 
        background-color: {iu(backgroundColor, '#0500FF00')}; 
        border: solid 1px {iu(borderColor, '#0500FF')};
        border-radius: {((parseFloat(
        iu(borderRadius, '0px').substring(0, iu(borderRadius, '0px').length - 2)
    ) *
        100) /
        360 /
        100) *
        clientHeight +
        'px;'};
        backdrop-filter: {iu(backdropFilter, 'blur(0px)')};
        --webkit-backdrop-filter: {iu(backdropFilter, 'blur(0px)')};
        {iu(style, '')}"
>
    {label ? label : ""}
    <slot />
</div>

<style>
    .button {
        user-select: none;
        --webkit-user-select: none;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0%;
        transition: all linear 0.1s;
    }
</style>
