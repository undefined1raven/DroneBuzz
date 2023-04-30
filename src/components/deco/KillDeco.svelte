<script>
    let color;
    let size;
    let style;
    export { color, size, style };

</script>

<svg width="{size ? size : '5vh'}" height="{size ? size : '5vh'}" style="position: absolute; {style ? style : ""}" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.09122 2.26613L4.0322 7.56451L0.97317 2.26613L7.09122 2.26613Z" stroke={color ? color : "#2400FF"} stroke-width="0.5"/>
<rect x="3.75757" y="2" width="0.5" height="5.5" fill={color ? color : "#2400FF"}/>
<rect x="1.88623" y="2.98224" width="0.5" height="5.5" transform="rotate(-45 1.88623 2.98224)" fill={color ? color : "#2400FF"}/>
<rect x="5.77515" y="2.62869" width="0.5" height="5.5" transform="rotate(45 5.77515 2.62869)" fill={color ? color : "#2400FF"}/>
</svg>

<style>
    rect{
        transition: all linear 0.1s;
    }
</style>
