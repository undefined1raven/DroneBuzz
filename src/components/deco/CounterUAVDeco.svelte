<script>
    let width;
    let height;
    let color;
    let style;

    export { height, width, color, style };
</script>

<svg
    width={width ? width : "2vh"}
    height={height ? height : "1.5vh"}
    style={style ? style : ""}
    viewBox="0 0 30 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <path
        d="M15.1042 0L0 9.6875L2.29167 11.25L7.39583 7.8125L11.1458 10.1042L12.8125 9.27083L15 10.5208L17.2917 9.27083L18.8542 10.1042L22.6042 7.91667L27.7083 11.1458L30 9.6875L15.1042 0Z"
        fill={color ? color : "#2400FF"}
        fill-opacity="0.8"
    />
</svg>
