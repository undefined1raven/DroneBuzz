<script>
    import Button from "./Button.svelte";
    import Label from "./Label.svelte";
    import UAVDeco from "./deco/UAVDeco.svelte";
    import { getLeftCurvedBorder } from "../fn/dynamicBorders";
    import UAVConfigFunc from "../config/UAV";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";
    const dispatch = createEventDispatcher();

    const UAVConfig = UAVConfigFunc();

    let started;
    let scorestreakArray = ["UAV"];
    let scorestreakButtonsColorHash = {};

    scorestreakArray.forEach((key, ix) => {
        scorestreakButtonsColorHash[key] = "#1B00BC";
    });

    let killCount;

    let dogWatcherInterval;

    let iconHash = { UAV: { deco: UAVDeco, config: UAVConfig } };

    let deployedStreaks = {};
    let availableScorestreaks = {};

    onMount(() => {
        dogWatcherInterval = setInterval(() => {
            for (let deployedStreakKey in deployedStreaks) {
                if (
                    Date.now() - deployedStreaks[deployedStreakKey].tx >
                    iconHash[deployedStreakKey].config.duration
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
            if (killCount % iconHash[streakKey]?.config.cost == 0) {
                availableScorestreaks[streakKey] = true;
                scorestreakButtonsColorHash[streakKey] = "#2400FF";
            }
        }
    }

    function getColorFromStreakAvailability(streakKey) {
        console.log(availableScorestreaks[streakKey]);
        if (availableScorestreaks[streakKey] == true) {
            return "#2400FF";
        } else {
            return "#000000";
        }
    }

    export { started, scorestreakArray, killCount };
</script>

{#if started}
    <div class="scorestreakContainer">
        <Button
            onClick={() => {
                if (availableScorestreaks[scorestreakArray[0]]) {
                    dispatch("deployScorestreak", { key: scorestreakArray[0] });
                    deployedStreaks[scorestreakArray[0]] = { tx: Date.now() };
                    scorestreakButtonsColorHash[scorestreakArray[0]] =
                        "#1B00BC";
                    delete availableScorestreaks[scorestreakArray[0]];
                }
            }}
            top="64.444444444%"
            left="92.03125%"
            width="6.25%"
            height="6.111111111%"
            borderColor="#0500ff00"
            style="{getLeftCurvedBorder(
                5
            )} border-right: solid 1px {scorestreakButtonsColorHash[
                scorestreakArray[0]
            ]};"
            backgroundColor="{scorestreakButtonsColorHash[
                scorestreakArray[0]
            ]}20"
            backdropFilter="blur(5px)"
            ><svelte:component this={iconHash["UAV"].deco} /></Button
        >
    </div>
{/if}
