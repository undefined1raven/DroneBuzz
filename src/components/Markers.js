

class MarkerElement {
    constructor(width, height, src) {
        this.width = width;
        this.src = src;
        this.height = height;
    }

    getElement() {
        var marker = document.createElement("img");
        marker.style.width = this.width;
        marker.style.height = this.height;
        marker.style.backgroundSize = "contain";
        marker.src = this.src;
        marker.style.cursor = "pointer";
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
        return new MarkerElement("7vh",
            "8vh",
            "./visual_assets/player.svg").getElement()
    }
}

class EnemyElement {
    getElement() {
        return new MarkerElement("7vh",
            "8vh",
            "./visual_assets/enemy.svg").getElement()
    }
}


class MissleElement {
    getElement() {
        return new MarkerElement("4vh",
            "3vh",
            "./visual_assets/missle.svg").getElement()
    }
}


export { EnemyElement, BluelineElement, RangeElement, PlayerElement, MarkerElement, RedlineElement, DefenceLineElement, EnemyDefenceLine, MissleElement, PlayerRangeElement }