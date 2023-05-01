<script>
    let size;
    let color;
    let style;

    export { size, color, style };
</script>

<svg width="{size ? size : '2vh'}" height="{size ? size : '2vh'}" style="{style ? style : ""}" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1.5C8 0.671573 8.67157 0 9.5 0V0C10.3284 0 11 0.671573 11 1.5V14H8V1.5Z" fill={color ? color : "#2400FF"} fill-opacity="0.7"/>
<path d="M9.5 17L8 14H11L9.5 17Z" fill={color ? color : "#2400FF"} fill-opacity="0.7"/>
<circle cx="9.5" cy="6.5" r="3.5" fill={color ? color : "#2400FF"} fill-opacity="0.7"/>
<rect x="15" y="5" width="1" height="2" fill={color ? color : "#2400FF"}/>
<rect x="3" y="5" width="1" height="2" fill={color ? color : "#2400FF"}/>
<path d="M0.666666 8C0.298477 8 0 7.70152 0 7.33333V7.33333C0 6.59695 0.596954 6 1.33333 6L17.6667 6C18.403 6 19 6.59695 19 7.33333V7.33333C19 7.70152 18.7015 8 18.3333 8L0.666666 8Z" fill={color ? color : "#2400FF"}/>
<rect x="6" y="16" width="7" height="1" fill={color ? color : "#2400FF"} fill-opacity="0.7"/>
</svg>
