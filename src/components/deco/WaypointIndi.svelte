<script>
    let width = "2vh";
    let height = "10vh";
    let style = "";
    let color = "#231FFF";
    let rotation = "0deg";

    export { width, height, style, color, rotation };
</script>

<svg
    {width}
    {height}
    style="position: absolute; transform: translate(-50%, -50%) rotate({rotation}); {style}"
    viewBox="0 0 16 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M8.22191 2.63778e-05L8.92901 0.707133L3.97926 5.65688L3.27216 4.94977L8.22191 2.63778e-05Z"
        fill={color}
    />
    <rect
        x="7.51465"
        y="0.707092"
        width="1"
        height="7"
        transform="rotate(-45 7.51465 0.707092)"
        fill={color}
    />
</svg>
