<script>
    let top;
    let tabletTop;
    let tabletLeft;
    let left;
    let size;
    let tableSize;

    function positionParser(mobilePosition, tabletPosition) {
        if (document.documentElement.clientWidth < 1023) {
            return mobilePosition;
        } else {
            return tabletPosition;
        }
    }


    export { top, left, size, tabletTop, tabletLeft, tableSize };
</script>

<svg
    style="
    position: absolute; 
    top: {positionParser(top ? top : 'auto', tabletTop ? tabletTop : 'auto')}; 
    left: {positionParser(left ? left : 'auto', tabletLeft ? tabletLeft : 'auto')};"
    width="{positionParser(size ? size : '20.8333vh', tableSize ? tableSize : '20.8333vh')}"
    height="{positionParser(size ? size : '20.8333vh', tableSize ? tableSize : '20.8333vh')}"
    viewBox="0 0 75 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <circle cx="36.4771" cy="37.5" r="14.8409" stroke="#231FFF" />
    <circle cx="37.5" cy="37.5" r="37" stroke="#6C54FF" />
    <path
        d="M36.9887 32.7273L40.0887 38.5929H33.8887L36.9887 32.7273Z"
        fill="#9E00FF"
        fill-opacity="0.8"
    />
    <path
        d="M36.9887 33.7701L40.0887 39.6357H33.8887L36.9887 33.7701Z"
        fill="#6D00AF"
        fill-opacity="0.8"
    />
</svg>
