
function checkObjectiveCompletion(currentWaypointIndex, waypointsCount) {
    return { completed: currentWaypointIndex == waypointsCount, displayLabel: 'Waypoints', displayStatus: `${currentWaypointIndex}/${waypointsCount}` };
}

export default checkObjectiveCompletion;