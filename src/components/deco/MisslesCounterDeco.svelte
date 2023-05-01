<script>
    let size;
    let style;
    let friendlyColor;
    let enemyColor;

    export { size, style, friendlyColor, enemyColor }
</script>

<svg width="{size ? size : "2vh"}" height="{size ? size : "2vh"}" style="position: absolute; {style ? style : ''}" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.23901" y="4.15701" width="2.7" height="2.7" transform="rotate(-45 1.23901 4.15701)" fill="{enemyColor ? enemyColor :'#FF0010'}"/>
<rect x="2.94873" y="0.766006" width="0.45" height="2.71964" transform="rotate(-45 2.94873 0.766006)" fill="{enemyColor ? enemyColor :'#FF0010'}"/>
<rect x="3.12183" y="0.300003" width="0.45" height="2.718" transform="rotate(45 3.12183 0.300003)" fill="{enemyColor ? enemyColor :'#FF0010'}"/>
<rect x="5.38086" y="1.2" width="0.9" height="7.44" transform="rotate(45 5.38086 1.2)" fill="{friendlyColor ? friendlyColor : '#5C41FF'}" fill-opacity="0.6"/>
<rect x="0.120117" y="1.8364" width="0.9" height="7.43994" transform="rotate(-45 0.120117 1.8364)" fill="{friendlyColor ? friendlyColor : '#5C41FF'}" fill-opacity="0.6"/>
</svg>
