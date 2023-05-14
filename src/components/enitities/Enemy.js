import { RedlineElement, BluelineElement, RangeElement, EnemyElement } from "./Markers.js";
import maplibre from "maplibre-gl";
import { RangeScaler } from "../../fn/RangeScaler.js";
import { Missle } from "./Missle.js";
import radiusFromPercentage from "../../fn/radiusFromPercentage.js";
import LaserCannonConfig from "../../config/weapons/LaserCannon.js";
import cartesianDistance from '../../fn/cartesianDistance.js';
import getDisplayRadius from '../../fn/getDisplayRadius.js'

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

//Args model
// {
//     map: map,
//     coords: coords,
//     type: "Enemy",
//     id: id,
//     enemiesArr: enemies,
//     missleArr: missles,
//     missleCount: 20,
//     missleCooldown: 1000,
//     countermeasuresCount: 2,
//     countermeasuresCooldown: 600,
//     enemyDefensiveMissles: enemyDefensiveMissles,
//     rawDefensiveRadius: 0.00425082508,
//     screenDistanceObj: {
//         vertical: verticalScreenDistance,
//         horizontal: horizontalScreenDistance,
//     },
//     rawOffensiveRadius: 0.00336666667,
// }

class Enemy {
    constructor(args) {
        this.screenWidth = document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
        this.enemyElement = new EnemyElement().getElement();
        this.bearing = 0;
        this.visible = false;
        this.lastMissle = 0;
        this.lastLaserCannonOverheat = Date.now();
        this.lastDefensiveMissle = Date.now();
        this.distance = 1000000;
        this.invisble = false;
        this.energyAbsorbed = 0;
        for (let arg in args) {
            this[arg] = args[arg];
        }
        this.isFiring = false;
        this.offensiveRadius = ((this.rawOffensiveRadius * this.screenDistanceObj.horizontal) / 0.0360059738);
        this.defensiveRadius = (this.rawDefensiveRadius * this.screenDistanceObj.horizontal) / 0.0361776352;
        this.renderedOffensiveRadius = radiusFromPercentage((23.104265403 * this.offensiveRadius) / 0.0033626539605827906);
        this.laserCannonConfig = LaserCannonConfig(2, this.offensiveRadius + 0.001, 0.08, 4000, 1500);
        this.targetEnergyAbsorbed = 0;
    }

    followStep(bearing) {
        const ran = Math.random().toString();
        this.bearing = bearing;
        if (this.visible) {
            this.playerMarker._rotation = (bearing - 90) * -1;
        }
        var mvs = this.mvs ? this.mvs : 0.00018;
        // if (Math.random() > .2) {
        //     mvs = parseFloat(`0.0001${ran[3]}${ran[4]}`);
        // } else {
        //     mvs = parseFloat(`0.0002${ran[3]}${ran[4]}`);
        // }
        // if (mvs >= 0.0002) {
        //     mvs = 0.00018;
        // }
        if (bearing <= 180 && bearing >= 0 && bearing != -1) {
            this.coords = { ...this.coords, lng: this.coords.lng + RangeScaler(bearing, 0, 180, mvs, mvs * -1) }
            this.coords = { ...this.coords, lat: this.coords.lat + RangeScaler(Math.abs(bearing - 90), 0, 90, mvs, 0) }
        }
        if (bearing > 180 && bearing < 360 && bearing != -1) {
            this.coords = { ...this.coords, lng: this.coords.lng + RangeScaler(bearing - 270, -90, 90, mvs * -1, mvs) }
            this.coords = { ...this.coords, lat: this.coords.lat + RangeScaler(Math.abs(bearing - 270), 90, 0, 0, mvs * -1) }
        }
        this.updateEnemy(this.coords);
        if (this.energyAbsorbed > 0.005) {
            this.energyAbsorbed -= 0.005;
        }
    }

    addEnemy() {
        let redline = new RedlineElement(getDisplayRadius((9 / 100) * this.screenDistanceObj.horizontal, this.screenDistanceObj.horizontal)).getElement();
        let rangeline = new RangeElement(getDisplayRadius((15 / 100) * this.screenDistanceObj.horizontal, this.screenDistanceObj.horizontal)).getElement();
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
            this.disableLaserTargeting();
            this.playerMarker.remove();
            this.playerRedlineMarker.remove();
            this.playerRangeMarker.remove();
            this.visible = false;
        }
    }

    onDistanceUpdate(enemyID) {
        if (this.isHunted == true && this.countermeasuresCount > 0 && !this.invisble && Date.now() - this.lastDefensiveMissle >= this.countermeasuresCooldown && this.distance < ((10 / 100) * this.screenDistanceObj.horizontal) + 0.001) {
            this.defensiveFire();
        }
        if (this.offensiveWeaponType == 'smartMissile' && this.missleCount > 0 && (this.lastMissle == 0 || Date.now() - this.lastMissle >= this.missleCooldown) && this.distance < ((9 / 100) * this.screenDistanceObj.horizontal) + 0.001 && !this.invisble) {
            this.fireMissle();
        }
        if (this.offensiveWeaponType == 'laserCannon' && !this.isFiring && this.distance < ((9 / 100) * this.screenDistanceObj.horizontal) + 0.003 && Date.now() - this.lastLaserCannonOverheat >= this.laserCannonConfig.overheatTimeout) {
            this.fireLaserCannon();
        }
    }


    enableLaserTargeting(sourceArray, layerArray) {
        if (
            sourceArray.indexOf(
                `LWAS-${this.id}`
            ) == -1 && !this.invisble
        ) {
            sourceArray.push(`LWAS-${this.id}`);
        }
        this.map.addSource(`LWAS-${this.id}`, {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [this.coords.lng, this.coords.lat],
                        [this.target.coords.lng, this.target.coords.lat],
                    ],
                },
            },
        });
        if (
            layerArray.indexOf(
                `LWA-${this.id}`
            ) == -1
        ) {
            layerArray.push(`LWA-${this.id}`);
        }
        this.map.addLayer({
            id: `LWA-${this.id}`,
            type: "line",
            source: `LWAS-${this.id}`,
            paint: {
                "line-color": "rgba(255, 0, 36, 0.7)",
                "line-width": 2,
            },
        });
    }

    disableLaserTargeting() {
        if (this.map.getLayer(`LWA-${this.id}`)) {
            this.map.removeLayer(`LWA-${this.id}`);
        }
        if (this.map.getSource(`LWAS-${this.id}`)) {
            this.map.removeSource(`LWAS-${this.id}`);
        }
    }
    fireLaserCannon() {
        const config = this.laserCannonConfig;
        let sourceArray = [];
        let layerArray = [];

        this.isFiring = true;

        const intx = setInterval(() => {
            if (this.isFiring && !this.invisble) {
                const sqareLawRaw =
                    (50 * 0.00808) /
                    (this.distance * this.distance);
                const instaEnergyAbsorbtion =
                    (sqareLawRaw * config.powerScale) / 326432;
                if (this.targetEnergyAbsorbed != undefined) {
                    if (this.targetEnergyAbsorbed >= 1) {
                        this.playerHit();
                        this.updateTargetEnergyAbsorbed(0);
                        this.disableLaserTargeting();
                    } else {
                        this.updateTargetEnergyAbsorbed(this.targetEnergyAbsorbed += instaEnergyAbsorbtion);
                        this.disableLaserTargeting();
                        if (this.targetEnergyAbsorbed < 1) {
                            this.enableLaserTargeting(
                                sourceArray,
                                layerArray,
                            );
                        }
                    }
                } else {
                    this.updateTargetEnergyAbsorbed(instaEnergyAbsorbtion);
                    this.enableLaserTargeting(
                        sourceArray,
                        layerArray,
                    );
                }
            } else {
                this.isFiring = false;
                clearInterval(intx);
                for (let lidix = 0; lidix < layerArray.length; lidix++) {
                    if (this.map.getLayer(layerArray[lidix])) {
                        this.map.removeLayer(layerArray[lidix]);
                        this.map.removeSource(sourceArray[lidix]);
                    }
                }
            }
        }, 100);
        setTimeout(() => {
            this.lastLaserCannonOverheat = Date.now();
            this.isFiring = false;
            clearInterval(intx);
            for (let lidix = 0; lidix < layerArray.length; lidix++) {
                if (this.map.getLayer(layerArray[lidix])) {
                    this.map.removeLayer(layerArray[lidix]);
                    this.map.removeSource(sourceArray[lidix]);
                }
            }
        }, config.overheatDuration);
    }

    defensiveFire() {
        this.lastDefensiveMissle = Date.now();
        let defensiveMissle = new Missle(this.map, this.coords, 0.0008, 'defensive', '', `${Math.random()}-${Date.now()}`, 0, false, this.defensiveMissleMvs, this.screenDistanceObj);
        this.enemyDefensiveMissles.push(defensiveMissle);
        this.countermeasuresCount--;
    }

    fireMissle() {
        this.lastMissle = Date.now();
        let missle = new Missle(this.map, this.coords, 0.00008, 'offensive', '', `${Math.random()}-${Date.now()}`, 0, false, this.missleMvs, this.screenDistanceObj);
        this.missleArr.push(missle);
        this.missleCount--;
    }

    draw(coords) {
        if (coords != undefined) {
            let distance = cartesianDistance({ lat: coords.lat, lng: coords.lng }, { lat: this.coords.lat, lng: this.coords.lng });
            if (distance < ((17.644063474 / 100) * this.screenDistanceObj.horizontal) + 0.001) {
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
                // this.destroy(this.enemiesArr);
            }
        } else {
            this.hideEnemy();
        }
    }
}

export { Enemy };