<script>
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
    export {
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
    };
</script>

<div
    on:click={onClick}
    class={`button ${className}`}
    style="left: {left}; top: {top}; width: {width}; height: {height}; color: {color}; border: solid 1px {borderColor}; background-color: {backgroundColor}"
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
    }
</style>
