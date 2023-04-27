

function cartesianDistance(coords1, coords2) {

    let B = coords1.lng - coords2.lng;
    var a = coords1.lng - coords2.lng;
    var b = coords1.lat - coords2.lat;

    return Math.sqrt(a * a + b * b);
}

export default cartesianDistance;