import {
    WaypointAreaElement,
    WaypointElement
} from "../components/enitities/Markers.js";

import maplibre from "maplibre-gl";
function addWaypoint(map, radius, coords, id, label) {
    let markerActual = new maplibre.Marker(new WaypointElement().getElement(`WM-${id}`, label, '#FFF', '10px', { backgroundColor: '#2400FF40', borderRadius: '5px' })).setLngLat([coords.lat, coords.lng]).addTo(map);
    let markerArea = new maplibre.Marker(new WaypointAreaElement().getElement(radius, `WMA-${id}`)).setLngLat([coords.lat, coords.lng]).addTo(map);
    return { marker: markerActual, markerArea: markerArea };
}

export default addWaypoint;