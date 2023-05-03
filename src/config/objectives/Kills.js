
function checkObjectiveCompletion(kills, targetKillCount) {
    return { completed: kills >= targetKillCount, displayLabel: 'Kills', displayStatus: `${kills}/${targetKillCount}` };
}

export default checkObjectiveCompletion;