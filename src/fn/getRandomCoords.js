function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //max e | min i
}

class getRandomCoords {
    constructor(originLng, originLat, radius) {
        this.originLat = originLat;
        this.originLng = originLng;
        this.radius = radius;
    }

    get() {
        let ncoords = {
            lng: parseFloat((
                getRandomInt(
                    (this.originLng * 100000000) - (this.radius * 1000000),
                    (this.originLng * 100000000) + (this.radius * 1000000)
                ) / 100000000
            ).toFixed(13)),
            lat: parseFloat((
                getRandomInt(
                    (this.originLat * 100000000) - (this.radius * 1000000),
                    (this.originLat * 100000000) + (this.radius * 1000000)
                ) / 100000000
            ).toFixed(13)),
        };
        return ncoords;
    }
}

export { getRandomCoords };