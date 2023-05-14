import { DefensiveFriendlyMissleElement, RedlineElement, BluelineElement, MissleElement, FriendlyMissleElement, DefensiveEnemyMissleElement } from "./Markers.js";
import maplibre from "maplibre-gl";
import { RangeScaler } from "../../fn/RangeScaler.js";
import radiusFromPercentage from "../../fn/radiusFromPercentage.js";
import getDisplayRadius from "../../fn/getDisplayRadius.js";
import cartesianDistance from "../../fn/cartesianDistance.js";

class Missle {
    constructor(map, coords, killRadius, type, destrory, id, distance, isFriendly, mvs, screenDistanceObj) {
        this.id = id;
        this.map = map;
        this.coords = coords;
        this.isFriendly = isFriendly;
        this.type = type;
        if (this.isFriendly) {
            if (this.type == 'offensive') {
                this.missleElement = new FriendlyMissleElement().getElement();
            }
            if (this.type == 'defensive') {
                this.missleElement = new DefensiveFriendlyMissleElement().getElement();
            }
        } else {
            if (this.type == 'offensive') {
                this.missleElement = new MissleElement().getElement();
            }
            if (this.type == 'defensive') {
                this.missleElement = new DefensiveEnemyMissleElement().getElement();
            }
        }
        this.visible = false;
        this.bearing = 0;
        this.destroy = destrory;
        this.killRadius = killRadius;
        this.distance = 1000000;
        this.invisble = false;
        this.screenDistanceObj = screenDistanceObj;
        this.colorlineRadiusHash = { 'offensive': getDisplayRadius((1.7 / 100) * this.screenDistanceObj.horizontal, this.screenDistanceObj.horizontal), 'defensive': getDisplayRadius((1.3 / 100) * this.screenDistanceObj.horizontal, this.screenDistanceObj.horizontal) };
        this.targetID = 0;
        this.mvs = mvs;
    }

    followStep(bearing) {
        const ran = Math.random().toString();
        this.bearing = bearing;
        if (this.visible) {
            this.missleMarker._rotation = (bearing - 90) * -1;
        }
        var mvs = this.mvs ? this.mvs : 0.0003;
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
        if (!this.isFriendly) {
            let redline = new RedlineElement(this.colorlineRadiusHash[this.type]).getElement();
            var missleMarker = new maplibre.Marker(this.missleElement, {})
                .setLngLat([this.coords.lng, this.coords.lat])
                .addTo(this.map);

            var missleRedline = new maplibre.Marker(redline)
                .setLngLat([this.coords.lng, this.coords.lat])
                .addTo(this.map);

            this.missleMarker = missleMarker;
            this.missleRedline = missleRedline;
        } else {
            let blueline = new BluelineElement(this.colorlineRadiusHash[this.type]).getElement();
            var missleMarker = new maplibre.Marker(this.missleElement, {})
                .setLngLat([this.coords.lng, this.coords.lat])
                .addTo(this.map);

            var missleRedline = new maplibre.Marker(blueline)
                .setLngLat([this.coords.lng, this.coords.lat])
                .addTo(this.map);

            this.missleMarker = missleMarker;
            this.missleRedline = missleRedline;
        }
    }

    updateEnemy(coords) {
        this.coords = coords;
        if (this.visible) {
            this.missleRedline.setLngLat([coords.lng, coords.lat]);
            this.missleMarker.setLngLat([coords.lng, coords.lat]);
        }
    }

    hideMissle() {
        if (this.visible) {
            this.missleMarker.remove();
            this.missleRedline.remove();
            this.visible = false;
        }
    }

    draw(coords) {
        if (coords != undefined) {
            let distance = cartesianDistance({ lat: coords.lat, lng: coords.lng }, { lat: this.coords.lat, lng: this.coords.lng });
            if (distance < ((17.644063474 / 100) * this.screenDistanceObj.horizontal) + 0.001) {
                if (!this.visible && !this.invisble) {
                    this.addEnemy();
                    this.visible = true;
                }
                if (this.invisble) {
                    this.hideMissle();
                }
            } else {
                this.hideMissle();
            }
        } else {
            this.hideMissle();
        }
    }
}

export { Missle };