function getDynamicBorderRadius(pxRadius) {
    return `${(parseFloat(pxRadius * 100) / 360 / 100) *
        document.documentElement.clientHeight +
        "px"
        }`;
}

function getRightCurvedBorder(pxRadius) {
    return `border-radius: 0px ${getDynamicBorderRadius(
        pxRadius
    )} ${getDynamicBorderRadius(pxRadius)} 0px;`;
}

function getLeftCurvedBorder(pxRadius) {
    return `border-radius: ${getDynamicBorderRadius(
        pxRadius
    )} 0px 0px ${getDynamicBorderRadius(pxRadius)};`;
}


export { getDynamicBorderRadius, getLeftCurvedBorder, getRightCurvedBorder };