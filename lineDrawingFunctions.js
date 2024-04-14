
function drawRhumbLines() {
    clearMarkers();
    if (latInput.value.length > 0 && lngInput.value.length > 0)
        StartingPoint = new google.maps.LatLng(parseFloat(latInput.value), parseFloat(lngInput.value));
    if (distanceInput.value.length > 0)
        defaultDistance = parseInt(distanceInput.value);
    map.setCenter({ lat: StartingPoint.lat(), lng: StartingPoint.lng()});

    angles.forEach(function (angle) {
        lines.push(getRhumbLine(StartingPoint, defaultDistance, angle, "#F00"))
    });

    angles2.forEach(function (angle) {
        lines.push(getRhumbLine(StartingPoint, defaultDistance, angle, "#666"))
    });
}

function getRhumbLine(origin, distance, angle, color) {
    var destinationPoint = google.maps.geometry.spherical.computeOffset(origin, distance * 1000, angle);
    return new google.maps.Polyline({
        path: [origin, destinationPoint],
        geodesic: false,
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 2,
        map: map,
    });
}

function clearMarkers() {
    lines.forEach(function (line) {
        line.setMap(null);
    });
    lines = [];
}
function changeDistance(distance){
    var ZoomNum = 12- Math.floor(Math.log2(distance/3));
    DistanceInputValue = distance;
    map.setZoom(ZoomNum);
    drawRhumbLines();
}