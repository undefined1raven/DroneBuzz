
function drawLine(map, width, coords, id, color) {
    if (coords.length > 0 && map) {
        removeLine(map, id);
        map.addLayer({
            "id": id,
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": coords
                    }
                }
            },
            "paint": {
                "line-color": color ? color : "#FFF",
                "line-width": width,
            }
        });
    }
}


function removeLine(map, id) {
    if (map && map?.getLayer(id)) {
        map.removeLayer(id);
        map.removeSource(id);
    }
}

export { drawLine, removeLine };