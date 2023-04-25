
function getRadiusFromPercentage(percentage) {
    return (percentage / 100) * document.documentElement.clientWidth;
}

export default getRadiusFromPercentage;