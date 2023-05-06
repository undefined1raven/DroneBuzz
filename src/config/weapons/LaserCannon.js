
const LaserCannonConfig = (maxTargets, radius, powerScale, overheatDuration, overheatTimeout) => {
    const config = {
        maxTargets: maxTargets ? maxTargets : 2,
        radius: radius ? radius : 0.00808,
        powerScale: powerScale ? powerScale : 4,
        overheatDuration: overheatDuration ? overheatDuration : 5000,
        overheatTimeout: overheatTimeout ? overheatTimeout : 3000,
    }
    return config;
}

export default LaserCannonConfig;