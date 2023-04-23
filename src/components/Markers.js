

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
    getElement() {
        return new MarkerElement("50vh", "50vh", "./visual_assets/enemy_redline.svg").getElement()
    }
}

class EnemyDefenceLine {
    getElement() {
        return new MarkerElement("20vh", "20vh", "./visual_assets/enemy_defenceline.svg").getElement()
    }
}

class DefenceLineElement {
    getElement() {
        return new MarkerElement("20vh", "20vh", "./visual_assets/player_defenceline.svg").getElement()
    }
}

class BluelineElement {
    getElement() {
        return new MarkerElement("60vh",
            "60vh",
            "./visual_assets/player_blueline.svg").getElement()
    }
}

class RangeElement {
    getElement() {
        return new MarkerElement("120vh",
            "120vh",
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


export { EnemyElement, BluelineElement, RangeElement, PlayerElement, MarkerElement, RedlineElement, DefenceLineElement, EnemyDefenceLine }