import {
    WaypointAreaElement,
    WaypointElement
} from "../components/enitities/Markers.js";

import maplibre from "maplibre-gl";
function addWaypoint(map, radius, coords, id) {
    new maplibre.Marker(new WaypointElement().getElement(`WM-${id}`)).setLngLat([coords.lat, coords.lng]).addTo(map);
    new maplibre.Marker(new WaypointAreaElement().getElement(radius, `WMA-${id}`)).setLngLat([coords.lat, coords.lng]).addTo(map);
}

export default addWaypoint;