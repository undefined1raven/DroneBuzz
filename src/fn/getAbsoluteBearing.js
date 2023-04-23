

function getAbsoluteBearing(lng1, lng2, lat1, lat2) {
    let dx = lng2 - lng1;
    let dy = lat2 - lat1;
    let d = Math.sqrt(dx ^ 2 + dy ^ 2);
    console.log(d)
    let phi = (180 / Math.PI) * Math.acos(dx / d);
    if (dy < 0) {
        phi = 360 - phi;
    }
    let phiActual = (90 - phi) - phi;
    if (phiActual < 0) {
        phiActual = 360 + phiActual;
    }
    return phiActual
}

export { getAbsoluteBearing };