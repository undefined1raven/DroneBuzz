<script>
    import Button from "./Button.svelte";
    import Label from "./Label.svelte";
    import UAVDeco from "./deco/UAVDeco.svelte";
    import CounterUAVDeco from "./deco/CounterUAVDeco.svelte";
    import { getLeftCurvedBorder } from "../fn/dynamicBorders";
    import UAVConfigFunc from "../config/UAV";
    import counterUAVConfigFunc from "../config/counterUAV";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";
    const dispatch = createEventDispatcher();

    const UAVConfig = UAVConfigFunc();
    const counterUAVConfig = counterUAVConfigFunc();

    let started;
    let scorestreakArray = ["UAV", "counterUAV"];
    let killCount;

    let dogWatcherInterval;

    let streakMap = {
        UAV: { deco: UAVDeco, config: UAVConfig },
        counterUAV: { deco: CounterUAVDeco, config: counterUAVConfig },
    };

    let deployedStreaks = {};
    let availableScorestreaks = {};

    onMount(() => {
        scorestreakArray.forEach((key) => {
            availableScorestreaks[key] = false;
        });
    });

    onMount(() => {
        dogWatcherInterval = setInterval(() => {
            for (let deployedStreakKey in deployedStreaks) {
                if (
                    Date.now() - deployedStreaks[deployedStreakKey].tx >
                    streakMap[deployedStreakKey].config.duration
                ) {
                    dispatch("killScorestreak", { key: deployedStreakKey });
                    delete deployedStreaks[deployedStreakKey];
                }
            }
        }, 50);
    });

    onDestroy(() => {
        clearInterval(dogWatcherInterval);
    });

    $: assessDeployment(killCount);

    function assessDeployment(killCount) {
        for (let ix = 0; ix < scorestreakArray.length; ix++) {
            const streakKey = scorestreakArray[ix];
            if (
                killCount % parseFloat(streakMap[streakKey]?.config.cost) ==
                0
            ) {
                availableScorestreaks[streakKey] = true;
            }
        }
    }

    const streakAvailableColor = "#2400FF";
    const streakUnavailableColor = "#555";

    export { started, scorestreakArray, killCount };
</script>

{#if started}
    <div class="scorestreakContainer">
        <Button
            onClick={() => {
                if (availableScorestreaks[scorestreakArray[0]] == true) {
                    dispatch("deployScorestreak", { key: scorestreakArray[0] });
                    deployedStreaks[scorestreakArray[0]] = { tx: Date.now() };
                    availableScorestreaks[scorestreakArray[0]] = false;
                }
            }}
            top="64.444444444%"
            left="92.03125%"
            width="6.25%"
            height="6.111111111%"
            borderColor="#0500ff00"
            style="{getLeftCurvedBorder(
                5
            )} border-right: solid 1px {availableScorestreaks[
                scorestreakArray[0]
            ] == true
                ? streakAvailableColor
                : streakUnavailableColor};"
            backgroundColor="{availableScorestreaks[scorestreakArray[0]] == true
                ? streakAvailableColor
                : streakUnavailableColor}40"
            backdropFilter="blur(5px)"
            ><svelte:component
                this={streakMap[scorestreakArray[0]].deco}
                size="5vh"
                color={availableScorestreaks[scorestreakArray[0]] == true
                    ? streakAvailableColor
                    : streakUnavailableColor}
            /></Button
        >
        <Button
            onClick={() => {
                if (availableScorestreaks[scorestreakArray[1]] == true) {
                    dispatch("deployScorestreak", { key: scorestreakArray[1] });
                    deployedStreaks[scorestreakArray[1]] = { tx: Date.now() };
                    availableScorestreaks[scorestreakArray[1]] = false;
                }
            }}
            top="57.222222222%"
            left="92.03125%"
            width="6.25%"
            height="6.111111111%"
            borderColor="#0500ff00"
            style="{getLeftCurvedBorder(
                5
            )} border-right: solid 1px {availableScorestreaks[
                scorestreakArray[1]
            ] == true
                ? streakAvailableColor
                : streakUnavailableColor};"
            backgroundColor="{availableScorestreaks[scorestreakArray[1]] == true
                ? streakAvailableColor
                : streakUnavailableColor}40"
            backdropFilter="blur(5px)"
            ><svelte:component
                this={streakMap[scorestreakArray[1]].deco}
                width="8vh"
                height="5vh"
                color={availableScorestreaks[scorestreakArray[1]] == true
                    ? streakAvailableColor
                    : streakUnavailableColor}
            /></Button
        >
    </div>
{/if}
