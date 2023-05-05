
import radiusFromPercentage from "../../fn/radiusFromPercentage.js";

class MarkerElement {
    constructor(width, height, src) {
        this.width = width;
        this.src = src;
        this.height = height;
    }

    getElement() {
        var markerContainer = document.createElement('div');
        var marker = document.createElement("img");
        marker.style.width = this.width;
        marker.style.height = this.height;
        marker.style.backgroundSize = "contain";
        marker.src = this.src;
        marker.style.cursor = "pointer";

        let demo = document.createElement('h1');
        demo.style.color = "#FFF";
        demo.innerText = 'we?>>';
        demo.style.border = 'solid 1px #FFF';
        demo.style.width = this.width;
        demo.style.height = this.height;
        demo.style.borderRadius = '5000px';
        markerContainer.appendChild(marker);
        markerContainer.appendChild(demo);
        return marker;
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


export { DefensiveEnemyMissleElement, DefensiveFriendlyMissleElement, FriendlyMissleElement, EnemyElement, BluelineElement, RangeElement, PlayerElement, MarkerElement, RedlineElement, DefenceLineElement, EnemyDefenceLine, MissleElement, PlayerRangeElement }