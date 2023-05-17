
function checkObjectiveCompletion(currentWaypointIndex, waypointsCount) {
    return { completed: currentWaypointIndex + 1 == waypointsCount, displayLabel: 'Waypoints', displayStatus: `${currentWaypointIndex + 1}/${waypointsCount}` };
}

export default checkObjectiveCompletion;