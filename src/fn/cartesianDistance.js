

function cartesianDistance(coords1, coords2) {
    if (coords1 != undefined && coords2 != undefined) {
        let B = coords1.lng - coords2.lng;
        var a = coords1.lng - coords2.lng;
        var b = coords1.lat - coords2.lat;

        return Math.sqrt(a * a + b * b);
    } else {
        throw new Error(`[Invalid Args Provided]`)
    }

}

export default cartesianDistance;