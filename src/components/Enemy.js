import { RedlineElement, BluelineElement, RangeElement, EnemyElement, EnemyDefenceLine } from "./Markers.js";
import maplibre from "maplibre-gl";
import { RangeScaler } from "../fn/RangeScaler.js";



function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}//thx stackoverflow



class Enemy {
    constructor(map, coords, difficulty, type, destrory, id, enemiesArr) {
        this.id = id;
        this.map = map;
        this.coords = coords;
        this.difficulty = difficulty;
        this.enemyElement = new EnemyElement().getElement();
        this.type = type;
        this.visible = false;
        this.bearing = 0;
        this.destroy = destrory;
        this.enemiesArr = enemiesArr;
    }

    followStep(bearing) {
        this.bearing = bearing;
        if (this.visible) {
            this.playerMarker._rotation = (bearing - 90) * -1;
        }
        const mvs = 0.00013;
        if (bearing <= 180 && bearing > 0 && bearing != -1) {
            this.coords = { ...this.coords, lng: this.coords.lng + RangeScaler(bearing, 0, 180, mvs, mvs * -1) }
            this.coords = { ...this.coords, lat: this.coords.lat + RangeScaler(Math.abs(bearing - 90), 0, 90, mvs, 0) }
        }
        if (bearing > 180 && bearing < 360 && bearing != -1) {
            this.coords = { ...this.coords, lng: this.coords.lng + RangeScaler(bearing - 270, -90, 90, mvs * -1, mvs) }
            this.coords = { ...this.coords, lat: this.coords.lat + RangeScaler(Math.abs(bearing - 270), 90, 0, 0, mvs * -1) }
        }
        this.updateEnemy(this.coords);
    }

    addEnemy() {
        let redline = new RedlineElement().getElement();
        let rangeline = new RangeElement().getElement();
        var playerMarker = new maplibre.Marker(this.enemyElement, {})
            .setLngLat([this.coords.lng, this.coords.lat])
            .addTo(this.map);

        var playerRedlineMarker = new maplibre.Marker(redline)
            .setLngLat([this.coords.lng, this.coords.lat])
            .addTo(this.map);


        var playerRangeMarker = new maplibre.Marker(rangeline)
            .setLngLat([this.coords.lng, this.coords.lat])
            .addTo(this.map);

        this.playerMarker = playerMarker;
        this.playerRedlineMarker = playerRedlineMarker;
        this.playerRangeMarker = playerRangeMarker;
    }

    updateEnemy(coords) {
        this.coords = coords;
        if (this.visible) {
            this.playerRangeMarker.setLngLat([coords.lng, coords.lat]);
            this.playerRedlineMarker.setLngLat([coords.lng, coords.lat]);
            this.playerMarker.setLngLat([coords.lng, coords.lat]);
        }
    }

    hideEnemy() {
        if (this.visible) {
            this.playerMarker.remove();
            this.playerRedlineMarker.remove();
            this.playerRangeMarker.remove();
            this.visible = false;
        }
    }

    draw(coords) {
        let distance = getDistanceFromLatLonInKm(coords.lat, coords.lng, this.coords.lat, this.coords.lng);
        if (distance < 0.808) {
            if (!this.visible) {
                this.addEnemy();
                this.visible = true;
            }
        } else {
            this.hideEnemy();
        }
        if (distance > 5) {
            this.destroy(this.enemiesArr);
        }
    }
}

export { Enemy };