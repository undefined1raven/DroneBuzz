<script>
    import { onMount } from "svelte";

    let staticColor;
    let style;
    let size;

    let statusObj = {
        top: false,
        bottom: false,
        right: false,
        left: false,
    };

    let getColor = () => {};

    onMount(() => {
        getColor = (status) => {
            if (staticColor == undefined) {
                let fillColorHash = {
                    true: "#00FAA0",
                    false: "#FA005A",
                };
                return fillColorHash[status];
            } else {
                return staticColor;
            }
        };
    });

    export { statusObj, staticColor, style, size };
</script>

<svg
    style={style ? style : "position: absolute; top: 52%"}
    width={size ? size : "10vh"}
    height={size ? size : "10vh"}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M6.125 0.875V0L28.875 0V0.875L6.125 0.875Z"
        fill={getColor(statusObj.top)}
    />
    <path
        d="M6.125 35V34.125H28.875V35H6.125Z"
        fill={getColor(statusObj.bottom)}
    />
    <path
        d="M34.125 6.125H35V28.875H34.125V6.125Z"
        fill={getColor(statusObj.right)}
    />
    <path
        d="M0 6.125H0.875V28.875H0L0 6.125Z"
        fill={getColor(statusObj.left)}
    />
</svg>
