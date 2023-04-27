import { RedlineElement, BluelineElement, RangeElement, EnemyElement } from "./Markers.js";
import maplibre from "maplibre-gl";
import { RangeScaler } from "../fn/RangeScaler.js";
import { Missle } from "./Missle.js";
import radiusFromPercentage from "../fn/radiusFromPercentage.js";



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
    constructor(map,
        coords,
        difficulty,
        type, destrory,
        id, enemiesArr,
        missleArr, missleCount,
        missleCooldown,
        distance,
        countermeasuresCount,
        countermeasuresCooldown,
        enemyDefensiveMissles,
        rawDefensiveRadius,
        screenDistanceObj,
        rawOffensiveRadius) {
        this.id = id;
        this.map = map;
        this.screenWidth = document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
        this.coords = coords;
        this.difficulty = difficulty;
        this.enemyElement = new EnemyElement().getElement();
        this.type = type;
        this.visible = false;
        this.bearing = 0;
        this.destroy = destrory;
        this.enemiesArr = enemiesArr;
        this.missleArr = missleArr;
        this.missleCount = missleCount;
        this.missleCooldown = missleCooldown;
        this.lastMissle = 0;
        this.lastDefensiveMissle = Date.now();
        this.distance = 1000000;
        this.invisble = false;
        this.countermeasuresCount = countermeasuresCount;
        this.countermeasuresCooldown = countermeasuresCooldown;
        this.enemyDefensiveMissles = enemyDefensiveMissles;
        this.offensiveRadius = ((rawOffensiveRadius * screenDistanceObj.horizontal) / 0.0360059738);
        this.defensiveRadius = (rawDefensiveRadius * screenDistanceObj.horizontal) / 0.0361776352;
        this.renderedOffensiveRadius = radiusFromPercentage((23.104265403 * this.offensiveRadius) / 0.0033626539605827906);
    }

    followStep(bearing) {
        const ran = Math.random().toString();
        this.bearing = bearing;
        if (this.visible) {
            this.playerMarker._rotation = (bearing - 90) * -1;
        }
        var mvs = 0;
        if (Math.random() > .2) {
            mvs = parseFloat(`0.0001${ran[3]}${ran[4]}`);
        } else {
            mvs = parseFloat(`0.0002${ran[3]}${ran[4]}`);
        }
        if (mvs >= 0.0002) {
            mvs = 0.00018;
        }
        if (bearing <= 180 && bearing >= 0 && bearing != -1) {
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
        let redline = new RedlineElement(`${this.renderedOffensiveRadius}px`).getElement();
        let rangeline = new RangeElement(`${radiusFromPercentage(55.450236967)}px`).getElement();
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

    onDistanceUpdate(enemyID) {
        if (this.id == enemyID && this.countermeasuresCount > 0 && !this.invisble && Date.now() - this.lastDefensiveMissle >= this.countermeasuresCooldown && this.distance < this.defensiveRadius) {
            this.defensiveFire();
        }
        if (this.missleCount > 0 && (this.lastMissle == 0 || Date.now() - this.lastMissle >= this.missleCooldown) && this.distance < this.offensiveRadius && !this.invisble) {
            this.fireMissle();
        }
    }

    defensiveFire() {
        this.lastDefensiveMissle = Date.now();
        let defensiveMissle = new Missle(this.map, this.coords, 0.0008, 'defensive', '', `${Math.random()}-${Date.now()}`, 0, false);
        this.enemyDefensiveMissles.push(defensiveMissle);
        this.countermeasuresCount--;
    }

    fireMissle() {
        this.lastMissle = Date.now();
        let missle = new Missle(this.map, this.coords, 0.00008, 'offensive', '', `${Math.random()}-${Date.now()}`, 0, false);
        this.missleArr.push(missle);
        this.missleCount--;
    }

    draw(coords) {
        if (coords != undefined) {
            let distance = getDistanceFromLatLonInKm(coords.lat, coords.lng, this.coords.lat, this.coords.lng);
            if (distance < 0.808) {
                if (!this.visible && !this.invisble) {
                    this.addEnemy();
                    this.visible = true;
                } else if (this.invisble) {
                    this.hideEnemy();
                }
            } else {
                this.hideEnemy();
            }
            if (distance > 5) {
                this.destroy(this.enemiesArr);
            }
        } else {
            this.hideEnemy();
        }
    }
}

export { Enemy };