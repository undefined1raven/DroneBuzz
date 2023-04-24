<script>
    let id;
    let label;
    let className;
    let color;
    let borderColor;
    let backgroundColor;
    let onClick;
    let width;
    let height;
    let top;
    let left;
    let fontSize;
    let opacity;
    let touchStartUnix = 0;

    const updateTouchUnix = (tx) => {
        touchStartUnix = tx;
    };

    const checkClick = () => {
        if (Date.now() - touchStartUnix < 300) {
            onClick();
        }
    };

    export {
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
        fontSize,
        opacity,
    };
</script>

<div
    {id}
    on:touchstart={() => updateTouchUnix(Date.now())}
    on:touchend={checkClick}
    class={`button ${className}`}
    style="opacity: {opacity}; border-radius: 3px; font-size: {fontSize}; left: {left}; top: {top}; width: {width}; height: {height}; color: {color}; border: solid 1px {borderColor}; background-color: {backgroundColor}"
>
    {label}
</div>

<style>
    .button {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0%;
        backdrop-filter: blur(5px);
    }
</style>
