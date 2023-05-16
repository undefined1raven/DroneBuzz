
import radiusFromPercentage from "../../fn/radiusFromPercentage.js";

class MarkerElement {
    constructor(width, height, src) {
        this.width = width;
        this.src = src;
        this.height = height;
    }

    getElement(radius, id, label, labelColor, labelFontSize, labelStyle) {
        var markerContainer = document.createElement('div');
        markerContainer.style.width = this.width;
        markerContainer.style.height = this.height;
        var marker = document.createElement("img");
        // marker.style.width = this.width;
        // marker.style.height = this.height;
        marker.style.width = '100%';
        marker.style.height = '100%';
        marker.style.backgroundSize = "contain";
        marker.src = this.src;
        if (id) {
            marker.id = id;
        }

        function fontController(fontSizePX) {
            if (fontSizePX != undefined) {
                return (parseFloat(
                    fontSizePX.substring(0, fontSizePX.length - 2)
                ) *
                    document.documentElement.clientWidth) /
                    640 +
                    "px";
            } else {
                return "2.8vh";
            }
        }

        if (label) {
            marker.style.position = 'absolute';
            marker.style.top = '50%';
            marker.style.left = '50%';
            marker.style.transform = 'translate(-50%, -50%)';
            let labelElementStyleObj = {
                color: labelColor ? labelColor : "#FFF",
                fontSize: fontController(labelFontSize),
                opacity: '1',
                position: 'absolute',
                top: '105%',
                left: '50%',
                transform: 'translate(-50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(5px)',
                width: '60%',
                height: '50%',
                ...labelStyle
            }
            let labelElement = document.createElement('div');
            for (let key in labelElementStyleObj) {
                labelElement.style[key] = labelElementStyleObj[key];
            }
            labelElement.innerText = label;
            markerContainer.appendChild(labelElement);
        }
        markerContainer.appendChild(marker);
        return markerContainer;
    }
}

class RedlineElement {
    constructor(radius) {
        this.radius = radius;
    }
    getElement() {
        return new MarkerElement(this.radius, this.radius, "./visual_assets/enemy_redline.svg").getElement()
    }
}

class EnemyDefenceLine {
    constructor(radius) {
        this.radius = radius;
    }
    getElement() {
        return new MarkerElement(this.radius, this.radius, "./visual_assets/enemy_defenceline.svg").getElement()
    }
}

class DefenceLineElement {
    constructor(radius) {
        this.radius = radius;
    }
    getElement() {
        return new MarkerElement(this.radius, this.radius, "./visual_assets/player_defenceline.svg").getElement()
    }
}

class BluelineElement {
    constructor(radius) {
        this.radius = radius;
    }
    getElement() {
        return new MarkerElement(this.radius,
            this.radius,
            "./visual_assets/player_blueline.svg").getElement()
    }
}

class RangeElement {
    constructor(radius) {
        this.radius = radius;
    }
    getElement() {
        return new MarkerElement(this.radius,
            this.radius,
            "./visual_assets/enemy_range.svg").getElement()
    }
}

class PlayerRangeElement {
    constructor(radius) {
        this.radius = radius;
    }
    getElement() {
        return new MarkerElement(this.radius,
            this.radius,
            "./visual_assets/player_range.svg").getElement()
    }
}

class PlayerElement {
    getElement() {
        return new MarkerElement("3.234597156%",
            "8%",
            "./visual_assets/player.svg").getElement()
    }
}

class EnemyElement {
    getElement() {
        return new MarkerElement("3.234597156%",
            "8%",
            "./visual_assets/enemy.svg").getElement()
    }
}

class WaypointElement {
    getElement(id, label, labelColor, labelFontSize, labelStyle) {
        return new MarkerElement("10%",
            "10%",
            "./visual_assets/waypointMarker.svg", id).getElement('auto', id, label, labelColor, labelFontSize, labelStyle)
    }
}

class WaypointAreaElement {
    getElement(radius, id) {
        return new MarkerElement(radius,
            radius,
            "./visual_assets/waypointAreaMarker.svg", id).getElement()
    }
}

let missleWidth = radiusFromPercentage(1.848341232) + 'px';
let missleHeight = radiusFromPercentage(1.386255924) + 'px';

class MissleElement {
    getElement() {
        return new MarkerElement(missleWidth,
            missleHeight,
            "./visual_assets/missle.svg").getElement()
    }
}

class FriendlyMissleElement {
    getElement() {
        return new MarkerElement(missleWidth,
            missleHeight,
            "./visual_assets/missle_friendly.svg").getElement()
    }
}

class DefensiveFriendlyMissleElement {
    getElement() {
        return new MarkerElement(missleWidth,
            missleHeight,
            "./visual_assets/defensive_missle_friendly.svg").getElement()
    }
}

class DefensiveEnemyMissleElement {
    getElement() {
        return new MarkerElement(missleWidth,
            missleHeight,
            "./visual_assets/defensive_missle_enemy.svg").getElement()
    }
}


export { WaypointAreaElement, WaypointElement, DefensiveEnemyMissleElement, DefensiveFriendlyMissleElement, FriendlyMissleElement, EnemyElement, BluelineElement, RangeElement, PlayerElement, MarkerElement, RedlineElement, DefenceLineElement, EnemyDefenceLine, MissleElement, PlayerRangeElement }