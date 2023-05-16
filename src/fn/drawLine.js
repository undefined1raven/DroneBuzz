import {
    WaypointAreaElement,
    WaypointElement
} from "../components/enitities/Markers.js";

import maplibre from "maplibre-gl";
function addWaypoint(map, width, coords, id) {
    let markerActual = new maplibre.Marker(new WaypointElement().getElement(`WM-${id}`)).setLngLat([coords.lat, coords.lng]).addTo(map);
    let markerArea = new maplibre.Marker(new WaypointAreaElement().getElement(radius, `WMA-${id}`)).setLngLat([coords.lat, coords.lng]).addTo(map);
    return { marker: markerActual, markerArea: markerArea };
}

export default addWaypoint;