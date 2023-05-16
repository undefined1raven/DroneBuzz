<script>
    import { getDynamicBorderRadius } from "../../fn/dynamicBorders";
    import { createEventDispatcher } from "svelte";
    import Label from "../common/Label.svelte";
    import Button from "../common/Button.svelte";
    import WaypointCard from "../GameUI/WaypointCard.svelte";
    import { distance } from "@turf/turf";
    import addWaypoint from "../../fn/addWaypoint";
    import { fade } from "svelte/transition";
    import { drawLine, removeLine } from "../../fn/drawLine";
    const dispatch = createEventDispatcher();
    let show = false;
    let map;
    let waypoints = [];
    let selectedWaypointIndex = -1;
    let currentLng = 0;
    let currentLat = 0;
    let waypointMarkers = {};

    $: onWaypointsChange(waypoints);
    function onWaypointsChange() {
        let lineCoords = waypoints.map((waypoint) => [
            waypoint.coords.lng,
            waypoint.coords.lat,
        ]);
        drawLine(map, 2, lineCoords, "Wayguide", "#2400FF");
    }

    const addWaypointFromEditor = (coords) => {
        if (waypointMarkers[`WMO.${coords.lat}-${coords.lng}`] == undefined) {
            if (waypoints.length > 0) {
                let prevWaypointCoords = waypoints[waypoints.length - 1].coords;
                let currentWaypointCoords = coords;
                const distanceBetweenWaypoints = distance(
                    [prevWaypointCoords.lng, prevWaypointCoords.lat],
                    [currentWaypointCoords.lng, currentWaypointCoords.lat],
                    { units: "kilometers" }
                );
                waypoints = [
                    ...waypoints,
                    {
                        distance: distanceBetweenWaypoints.toFixed(2),
                        coords: coords,
                        selected: false,
                    },
                ];
            } else {
                waypoints = [
                    ...waypoints,
                    {
                        distance: 0,
                        coords: coords,
                        selected: false,
                    },
                ];
            }
            waypointMarkers[`WMO.${coords.lat}-${coords.lng}`] = addWaypoint(
                map,
                "10vh",
                { lng: coords.lat, lat: coords.lng }, //fml we should really figure this out
                `${coords.lat}|${coords.lng}`,
                waypoints.length
            );
            document.getElementById("waypointList").scrollTop =
                document.getElementById("waypointList").scrollHeight;
        }
    };

    function onSelectedWaypoint(e) {
        if (waypoints[selectedWaypointIndex] != undefined) {
            waypoints[selectedWaypointIndex].selected = false;
        }
        selectedWaypointIndex = e.detail.index;
        const selectedWaypoint = waypoints[selectedWaypointIndex];
        map.flyTo([selectedWaypoint.coords.lng, selectedWaypoint.coords.lat], {
            duration: 100,
        });
        waypoints[selectedWaypointIndex].selected = true;
    }

    function removeWaypoint() {
        let newArr = [];
        for (let ix = 0; ix < waypoints.length; ix++) {
            if (ix != selectedWaypointIndex) {
                if (ix != selectedWaypointIndex + 1) {
                    newArr.push(waypoints[ix]);
                }
            } else {
                const waypointMarkerID = `WMO.${waypoints[ix].coords.lat}-${waypoints[ix].coords.lng}`;
                if (waypointMarkers[waypointMarkerID]) {
                    waypointMarkers[waypointMarkerID].marker.remove();
                    waypointMarkers[waypointMarkerID].markerArea.remove();
                    delete waypointMarkers[waypointMarkerID];
                }
                if (selectedWaypointIndex == 0) {
                    newArr.push({
                        ...waypoints[ix + 1],
                        distance: 0,
                    });
                } else {
                    if (ix != waypoints.length - 1) {
                        const updatedDistance = distance(
                            [
                                waypoints[ix - 1].coords.lng,
                                waypoints[ix - 1].coords.lat,
                            ],
                            [
                                waypoints[ix + 1].coords.lng,
                                waypoints[ix + 1].coords.lat,
                            ],
                            { units: "kilometers" }
                        );
                        newArr.push({
                            ...waypoints[ix + 1],
                            distance: updatedDistance.toFixed(2),
                        });
                    }
                }
            }
        }
        waypoints = newArr;
        for (key in waypointMarkers) {
            waypointMarkers[key].marker.remove();
            waypointMarkers[key].markerArea.remove();
        }
        waypointMarkers = {};
        for (let ix = 0; ix < waypoints.length; ix++) {
            const currentWaypointCoords = waypoints[ix].coords;
            waypointMarkers[
                `WMO.${currentWaypointCoords.lat}-${currentWaypointCoords.lng}`
            ] = addWaypoint(
                map,
                "10vh",
                {
                    lng: currentWaypointCoords.lat,
                    lat: currentWaypointCoords.lng,
                },
                `${currentWaypointCoords.lat}|${currentWaypointCoords.lng}`,
                ix + 1
            );
        }
    }

    function updateWaypoint() {
        let newArr = [];
        for (let ix = 0; ix < waypoints.length; ix++) {
            if (ix != selectedWaypointIndex) {
                if (ix != selectedWaypointIndex + 1) {
                    newArr.push(waypoints[ix]);
                } else {
                    const newDistance = distance(
                        [currentLng, currentLat],
                        [
                            waypoints[ix + 1].coords.lng,
                            waypoints[ix + 1].coords.lat,
                        ],
                        { units: "kilometers" }
                    );
                    newArr.push({
                        ...waypoints[ix],
                        distance: newDistance.toFixed(2),
                    });
                }
            } else {
                const waypointMarkerID = `WMO.${waypoints[ix].coords.lat}-${waypoints[ix].coords.lng}`;
                if (waypointMarkers[waypointMarkerID]) {
                    waypointMarkers[waypointMarkerID].marker.remove();
                    waypointMarkers[waypointMarkerID].markerArea.remove();
                    delete waypointMarkers[waypointMarkerID];
                }
                waypointMarkers[
                    `WMO.${waypoints[ix].coords.lat}-${waypoints[ix].coords.lng}`
                ] = addWaypoint(
                    map,
                    "10vh",
                    { lng: currentLat, lat: currentLng }, //fml we should really figure this out
                    `${currentLat}|${currentLng}`,
                    ix + 1
                );
                const newDistance = distance(
                    [currentLng, currentLat],
                    [
                        waypoints[ix - 1].coords.lng,
                        waypoints[ix - 1].coords.lat,
                    ],
                    { units: "kilometers" }
                );
                newArr.push({
                    ...waypoints[ix],
                    coords: {
                        lng: currentLng.toFixed(5),
                        lat: currentLat.toFixed(5),
                    },
                    distance: newDistance.toFixed(2),
                });
            }
        }
        waypoints = newArr;
    }

    export { show, addWaypointFromEditor, currentLng, currentLat, map };
</script>

<svelte:window
    on:click={(e) => {
        if (
            e.target.className
                .toString()
                .split(" ")
                .indexOf("waypointContainerElement") == -1
        ) {
            if (waypoints[selectedWaypointIndex] != undefined) {
                waypoints[selectedWaypointIndex].selected = false;
            }
            selectedWaypointIndex = -1;
        }
    }}
/>
{#if show}
    <div class="waypointEditorContainer">
        <div
            class="waypointsContainer"
            style="border-radius: {getDynamicBorderRadius(5)}"
        >
            <ul id="waypointList">
                <Label
                    show={waypoints.length == 0}
                    horizontalFont="10px"
                    width="100%"
                    height="10%"
                    style="border-radius: {getDynamicBorderRadius(5)};"
                    backdropFilter="blur(5px)"
                    backgroundColor="#2400FF20"
                    color="#BEB4FF"
                    text={"Waypoints will appear here"}
                />
                {#each waypoints as waypoint, ix}
                    <WaypointCard
                        on:onSelectedWaypoint={onSelectedWaypoint}
                        ix={ix + 1}
                        distance={waypoint.distance}
                        coords={waypoint.coords}
                        selected={waypoint.selected}
                    />
                {/each}
            </ul>
        </div>
        {#if selectedWaypointIndex != -1}
            <div transition:fade={{ duration: 100 }}>
                <Button
                    onClick={removeWaypoint}
                    label="Remove Waypoint"
                    horizontalFont="10px"
                    left="31%"
                    width="18.59375%"
                    height="8.222222222%"
                    color="#FF0010"
                    borderColor="#FF0010"
                    backgroundColor="#FF001020"
                    style="border-radius: {getDynamicBorderRadius(5)};"
                    backdropFilter="blur(5px)"
                    top="88.722222222%"
                />
                <Button
                    onClick={updateWaypoint}
                    label="Update Selected Waypoint"
                    horizontalFont="8px"
                    left="51.25%"
                    width="18.59375%"
                    height="8.222222222%"
                    color="#FFF"
                    borderColor="#2400FF"
                    backgroundColor="#2400FF20"
                    style="border-radius: {getDynamicBorderRadius(5)};"
                    backdropFilter="blur(5px)"
                    top="88.722222222%"
                />
            </div>
        {/if}
        {#if selectedWaypointIndex == -1}
            <div transition:fade={{ duration: 100 }}>
                <Button
                    onClick={() => dispatch("addWaypointCall")}
                    label="Add Waypoint"
                    horizontalFont="10px"
                    left="50%"
                    width="18.59375%"
                    height="8.222222222%"
                    color="#FFF"
                    borderColor="#2400FF"
                    backgroundColor="#2400FF20"
                    style="border-radius: {getDynamicBorderRadius(
                        5
                    )}; transform: translate(-50%);"
                    backdropFilter="blur(5px)"
                    top="88.722222222%"
                />
            </div>
        {/if}
        <Button
            onClick={() => dispatch("setWaypointEditor", false)}
            label="Done"
            horizontalFont="10px"
            left="0.625%"
            width="18.59375%"
            height="8.222222222%"
            color="#FFF"
            borderColor="#2400FF"
            backgroundColor="#2400FF20"
            style="border-radius: {getDynamicBorderRadius(5)};"
            backdropFilter="blur(5px)"
            top="88.722222222%"
        />
    </div>
{/if}

<style>
    .waypointsContainer {
        position: absolute;
        top: 3.333333333%;
        left: 0.775%;
        width: 18.740375%;
        height: 84.055555556%;
    }
    #waypointList {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        overflow-y: scroll;
    }
    #waypointList::-webkit-scrollbar {
        width: 0vh;
        height: 0vh;
    }

    #waypointList::-webkit-scrollbar-thumb {
        background: #2400ff;
    }
    #waypointList::-webkit-scrollbar-track {
        background: #00008300;
    }
</style>
