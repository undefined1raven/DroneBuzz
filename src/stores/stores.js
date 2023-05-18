import { writable } from "svelte/store";

const waypointsConfigLabel = writable('');
const waypointsConfigObj = writable({ waypoints: [], waypointMarkers: {} });//contains waypoints[], waypointMarkers{marker: <Marker>, markerArea:<Marker>}

export { waypointsConfigLabel, waypointsConfigObj };