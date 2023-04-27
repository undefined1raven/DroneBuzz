<script>
    import { onMount } from "svelte";

    let id;
    let text;
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

    const root = document.documentElement;
    let fontSize = "2.4vh";
    let clientWidth = root.clientWidth;
    let clientHeight = root.clientHeight;

    onMount(() => {
        fontController();
    });

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
                if(clientWidth < 1000){
                    fontSize = verticalFont;
                }else{
                    fontSize = (parseFloat(horizontalFont.substring(0, horizontalFont.toString().length - 2)) - 0.4) + 'vh';
                }
            } else {
                fontSize = "1.4vh";
            }
        } else {
            if (horizontalFont != undefined) {
                if(clientWidth < 1000){
                    fontSize = horizontalFont;
                }else{
                    fontSize = (parseFloat(horizontalFont.substring(0, horizontalFont.toString().length - 2)) - 1.2) + 'vh';
                }
            } else {
                fontSize = "2.8vh";
            }
        }
    }


    export {
        lightColor,
        id,
        onClick,
        text,
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
    class={`label ${className}`}
    style="
    opacity: {iu(opacity, '1')}; 
    font-size: {iu(fontSize, '2vh')}; 
    left: {iu(left, 'auto')}; 
    top: {iu(top, 'auto')}; 
    width: {iu(width, 'auto')}; 
    height: {iu(height, 'auto')}; 
    color: {iu(color, '#FFF')}; 
    background-color: {iu(backgroundColor, '#2400FF00')};
    {iu(style, '')}"
>
    {text}
</div>

<style>
    .label {
        user-select: none;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0%;
        text-align: center;
    }
</style>
