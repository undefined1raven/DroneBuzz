
function checkObjectiveCompletion(startUnix, configuredDuration) {
    const durationUnix = configuredDuration * 60 * 1000;
    const unixDelta = durationUnix - (Date.now() - startUnix);
    return { completed: Date.now() - startUnix >= durationUnix, displayLabel: 'Duration', displayStatus: `${unixDelta > 0 ? '' : '-'}${Math.floor(Math.abs(unixDelta) / 1000 / 60).toString().padStart(2, '0')}:${((Math.abs(unixDelta) / 1000) % 60).toFixed(3).toString().padStart(6, '0')}` };
}

export default checkObjectiveCompletion;