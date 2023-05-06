<script>
    let color;
    let opacity;
    let style;
    let width;
    let height;
    let left = 'auto';
    let tabletLeft = 'auto';


    const clientWidth = document.documentElement.clientWidth;

    function positionParser(mobilePosition, tabletPosition) {
        if (clientWidth > 1050 && tabletPosition != 'auto') {
            return tabletPosition;
        } else {
            return mobilePosition;
        }
    }

    export { color, opacity, style, width, height, tabletLeft, left };
</script>

<svg width={width ? width : "2vh"} height={height ? height : "2vh"} viewBox="0 0 15 22" style="position: absolute; left: {positionParser(left, tabletLeft)}; {style ? style : ""}" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.14624" y="14.4994" width="10.15" height="10.15" transform="rotate(-45 0.14624 14.4994)" fill={color ? color : "#3F1FFF"} fill-opacity={opacity ? opacity : "0.7"}/>
<rect x="7.21533" y="2.39294" width="1.69167" height="9.31734" transform="rotate(-45 7.21533 2.39294)" fill={color ? color : "#3F1FFF"} fill-opacity={opacity ? opacity : "0.7"}/>
<rect x="7.2251" width="1.69167" height="10.2177" transform="rotate(45 7.2251 0)" fill={color ? color : "#3F1FFF"} fill-opacity={opacity ? opacity : "0.7"}/>
</svg>
