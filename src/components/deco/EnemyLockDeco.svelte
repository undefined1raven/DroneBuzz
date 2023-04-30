<script>
    let color;
    let size;
    let style;
    export { color, size, style };

</script>

<svg width="{size ? size : '5vh'}" height="{size ? size : '5vh'}" style="position: absolute; {style ? style : ""}" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" width="1" height="7" fill="{color ? color : "#5C0006"} "/>
    <rect y="4" width="1" height="7" transform="rotate(-90 0 4)" fill="{color ? color : "#5C0006"} "/>
    <rect x="0.671631" y="1.37869" width="1" height="7" transform="rotate(-45 0.671631 1.37869)" fill="{color ? color : "#5C0006"} "/>
    <rect x="5.62134" y="0.6716" width="1" height="7" transform="rotate(45 5.62134 0.6716)" fill="{color ? color : "#5C0006"} "/>
</svg>

<style>
    rect{
        transition: all linear 0.1s;
    }
</style>