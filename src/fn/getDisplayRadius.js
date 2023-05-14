

function getDisplayRadius(distanceRadius, horizontalScreenDistance) {
    let base = (distanceRadius * 100) / horizontalScreenDistance;
    let root = document.documentElement;
    return `${base + base * (((root.clientWidth / root.clientHeight).toFixed(5) * 5.2) / 2.164)}%`
}

export default getDisplayRadius;