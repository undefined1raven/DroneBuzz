<script>
    let size;
    let color;
    let style;
    let left = 'auto';
    let tabletLeft = 'auto';
    let opacity = 0.8;

    const clientWidth = document.documentElement.clientWidth;


    function positionParser(mobilePosition, tabletPosition) {
        if (clientWidth > 1050 && tabletPosition != 'auto') {
            return tabletPosition;
        } else {
            return mobilePosition;
        }
    }

    export { size, color, style, left, tabletLeft, opacity }
</script>

<svg width="{size ? size : '9vh'}" height="{size ? size : '9vh'}" style="position: absolute; left: {positionParser(left, tabletLeft)}; {style ? style : ""}" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0L23.3253 6.25V18.75L12.5 25L1.67468 18.75V6.25L12.5 0Z" fill="#1C00C9" fill-opacity="0.05"/>
<path d="M0 12.5L6.25 1.67468L18.75 1.67468L25 12.5L18.75 23.3253L6.25 23.3253L0 12.5Z" fill={color ? color : "#2400FF"} fill-opacity="0.2"/>
<path d="M6.30773 23.2253L0.11547 12.5L6.30773 1.77468L18.6923 1.77468L24.8845 12.5L18.6923 23.2253L6.30773 23.2253Z" stroke={color ? color : "#2400FF"} stroke-opacity={opacity ? opacity : 0.8} stroke-width="0.2"/>
<path d="M8.95736 10.2752L12.5658 8.1919L16.1742 10.2752L16.1742 14.4419L12.5658 16.5252L8.95736 14.4419L8.95736 10.2752Z" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
<rect x="12.0835" y="17.0833" width="0.833333" height="7.91667" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
<rect x="16.3926" y="15.4175" width="0.833333" height="7.69206" transform="rotate(-60 16.3926 15.4175)" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
<rect x="16.6672" y="10.4011" width="0.833333" height="7.84444" transform="rotate(-120 16.6672 10.4011)" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
<rect x="12.9165" y="7.84473" width="0.833333" height="7.84444" transform="rotate(-180 12.9165 7.84473)" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
<rect width="0.823266" height="7.91667" transform="matrix(-1 0 0 1 12.9165 17.0833)" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
<rect width="0.830828" height="7.62247" transform="matrix(-0.495449 -0.868637 -0.863374 0.504565 8.65918 15.4175)" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
<rect width="0.830828" height="7.77347" transform="matrix(0.495449 -0.868637 -0.863374 -0.504565 8.3877 10.4011)" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
<rect width="0.823266" height="7.84444" transform="matrix(1 0 0 -1 12.0925 7.84473)" fill={color ? color : "#2400FF"} fill-opacity={opacity ? opacity : 0.8}/>
</svg>
