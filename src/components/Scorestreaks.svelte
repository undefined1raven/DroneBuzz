<script>
    import Button from "./Button.svelte";
    import Label from "./Label.svelte";
    import { scale } from "svelte/transition";
    import UAVDeco from "./deco/UAVDeco.svelte";
    import CounterUAVDeco from "./deco/CounterUAVDeco.svelte";
    import { getLeftCurvedBorder } from "../fn/dynamicBorders";
    import UAVConfigFunc from "../config/UAV";
    import counterUAVConfigFunc from "../config/counterUAV";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";
    import { getRightCurvedBorder } from "../fn/dynamicBorders";
    import MisslesCounterDeco from "./deco/MisslesCounterDeco.svelte";
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
    {#if deployedStreaks["counterUAV"]}
        <div class="enemyLockContainer">
            <Label
                id="enemyLockLabel"
                top="11.111111111%"
                left="1.71875%"
                color="#5C41FF"
                borderColor="#2400FF00"
                text="Jamming Active"
                width="9.03125%"
                height="3.055555556%"
                horizontalFont="6px"
                VerticalFont="8px"
                backdropFilter="blur(5px)"
                style="{getRightCurvedBorder(
                    5
                )} border-left: solid 1px #5C41FF; justify-content: start; padding-left: 0.5%; transition: all linear 0.1s; transition: color linear 0s;"
                backgroundColor="#5C41FF20"
                ><MisslesCounterDeco size="2.5vh" style="left: 83%;" /></Label
            >
        </div>
    {/if}
{/if}

<style>
    @keyframes ini{
        0%{transform: scaleX(0.2) scaleY(0.5) translateX(-70%);}
        100%{transform: scaleX(1) scaleY(1) translateX(0%);}
    }
    :global(#enemyLockLabel){
        animation: ini linear 0.15s;
    }
</style>