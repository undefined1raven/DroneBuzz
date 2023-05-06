<script>
    import Button from "../common/Button.svelte";
    import Label from "../common/Label.svelte";
    import { fade } from "svelte/transition";
    import UAVDeco from "../deco/UAVDeco.svelte";
    import CounterUAVDeco from "../deco/CounterUAVDeco.svelte";
    import EnergyWeaponDeco from "../deco/EnergyWeaponDeco.svelte";
    import { getLeftCurvedBorder } from "../../fn/dynamicBorders";
    import UAVConfigFunc from "../../config/scorestreaks/UAV";
    import counterUAVConfigFunc from "../../config/scorestreaks/counterUAV";
    import energyWeaponConfigFunc from "../../config/scorestreaks/energyWeapon";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";
    import { getRightCurvedBorder } from "../../fn/dynamicBorders";
    import MisslesCounterDeco from "../deco/MisslesCounterDeco.svelte";
    const dispatch = createEventDispatcher();

    const UAVConfig = UAVConfigFunc();
    const counterUAVConfig = counterUAVConfigFunc();
    const energyWeaponConfig = energyWeaponConfigFunc();

    let started;
    let scorestreakArray = ["UAV", "counterUAV", "energyWeapon"];
    let killCount;
    let scorestreakActiveIndicatorTopHash = {}; //used to set the top for the labels showing active scorestreaks

    let dogWatcherInterval;

    let streakMap = {
        UAV: { deco: UAVDeco, config: UAVConfig },
        counterUAV: { deco: CounterUAVDeco, config: counterUAVConfig },
        energyWeapon: { deco: EnergyWeaponDeco, config: energyWeaponConfig },
    };

    let deployedStreaks = {};
    let availableScorestreaks = {};

    onMount(() => {
        scorestreakArray.forEach((key) => {
            availableScorestreaks[key] = false;
        });
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

    let buttonFillArray = [0, 0, 0];

    $: assessAvailability(killCount);

    function assessAvailability(killCount) {
        for (let ix = 0; ix < scorestreakArray.length; ix++) {
            const streakKey = scorestreakArray[ix];
            if (
                killCount % parseFloat(streakMap[streakKey]?.config.cost) ==
                0
            ) {
                availableScorestreaks[streakKey] = true;
                buttonFillArray[ix] = 0;
            } else {
                buttonFillArray.forEach((fill, ix) => {
                    buttonFillArray[ix] = getButtonDynamicFill(ix);
                });
            }
        }
    }

    const streakAvailableColor = "#2400FF";
    const streakUnavailableColor = "#555";

    function getButtonDynamicFill(scorestreakArrarIndex) {
        let cost = parseFloat(
            streakMap[scorestreakArray[scorestreakArrarIndex]]?.config.cost
        );
        return ((killCount % cost) * 100) / cost;
    }

    export { started, scorestreakArray, killCount };
</script>

{#if started}
    <div class="scorestreakContainer">
        <Button
            onClick={() => {
                if (availableScorestreaks[scorestreakArray[0]] == true) {
                    scorestreakActiveIndicatorTopHash[scorestreakArray[0]] =
                        dispatch("deployScorestreak", {
                            key: scorestreakArray[0],
                        });
                    deployedStreaks[scorestreakArray[0]] = { tx: Date.now() };
                    availableScorestreaks[scorestreakArray[0]] = false;
                }
            }}
            top="62.222222222%"
            left="89.21875%"
            width="9.0625%"
            height="8.333333333%"
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
                size="8vh"
                style="z-index: 150;"
                color={availableScorestreaks[scorestreakArray[0]] == true
                    ? streakAvailableColor
                    : streakUnavailableColor}
            /><Label
                width="100%"
                height="{buttonFillArray[0]}%"
                backgroundColor="#2400FF40"
                text=""
                borderColor="#2400FF00"
                top="{100 - buttonFillArray[0]}%"
                className="scorestreakFill"
                left="0%"
                style="{getLeftCurvedBorder(5)} border-top-left-radius: 0px;"
            /></Button
        >
        <Button
            onClick={() => {
                if (availableScorestreaks[scorestreakArray[1]] == true) {
                    scorestreakActiveIndicatorTopHash[scorestreakArray[1]] =
                        dispatch("deployScorestreak", {
                            key: scorestreakArray[1],
                        });
                    deployedStreaks[scorestreakArray[1]] = { tx: Date.now() };
                    availableScorestreaks[scorestreakArray[1]] = false;
                }
            }}
            top="51.111111111%"
            left="89.21875%"
            width="9.0625%"
            height="8.333333333%"
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
                width="10vh"
                style="z-index: 150;"
                height="7vh"
                color={availableScorestreaks[scorestreakArray[1]] == true
                    ? streakAvailableColor
                    : streakUnavailableColor}
            />
            <Label
                className="scorestreakFill"
                width="100%"
                height="{buttonFillArray[1]}%"
                backgroundColor="#2400FF40"
                text=""
                borderColor="#2400FF00"
                top="{100 - buttonFillArray[1]}%"
                left="0%"
                style="{getLeftCurvedBorder(5)} border-top-left-radius: 0px;"
            /></Button
        >
        <Button
            onClick={() => {
                if (availableScorestreaks[scorestreakArray[2]] == true) {
                    scorestreakActiveIndicatorTopHash[scorestreakArray[2]] =
                        dispatch("deployScorestreak", {
                            key: scorestreakArray[2],
                        });
                    deployedStreaks[scorestreakArray[2]] = { tx: Date.now() };
                    availableScorestreaks[scorestreakArray[2]] = false;
                }
            }}
            top="40%"
            left="89.21875%"
            width="9.0625%"
            height="8.333333333%"
            borderColor="#0500ff00"
            style="{getLeftCurvedBorder(
                5
            )} border-right: solid 1px {availableScorestreaks[
                scorestreakArray[2]
            ] == true
                ? streakAvailableColor
                : streakUnavailableColor};"
            backgroundColor="{availableScorestreaks[scorestreakArray[2]] == true
                ? streakAvailableColor
                : streakUnavailableColor}40"
            backdropFilter="blur(5px)"
            ><svelte:component
                this={streakMap[scorestreakArray[2]].deco}
                size="8vh"
                style="z-index: 150;"
                color={availableScorestreaks[scorestreakArray[2]] == true
                    ? streakAvailableColor
                    : streakUnavailableColor}
            />
            <Label
                className="scorestreakFill"
                width="100%"
                height="{buttonFillArray[2]}%"
                backgroundColor="#2400FF40"
                text=""
                borderColor="#2400FF00"
                top="{100 - buttonFillArray[2]}%"
                left="0%"
                style="{getLeftCurvedBorder(5)} border-top-left-radius: 0px;"
            /></Button
        >
    </div>
    <ul id="deployedStreaksActiveLabelsList">
        {#if deployedStreaks["counterUAV"]}
            <div
                class="enemyLockContainer deployedScorestreakActiveLabelItem"
                transition:fade={{ duration: 150 }}
            >
                <Label
                    id="enemyLockLabel"
                    left="0%"
                    color="#5C41FF"
                    borderColor="#2400FF00"
                    text="Jamming Active"
                    width="96%"
                    height="100%"
                    horizontalFont="6px"
                    tabletWidth="99%"
                    VerticalFont="8px"
                    backdropFilter="blur(5px)"
                    style="{getRightCurvedBorder(
                        5
                    )} border-left: solid 1px #5C41FF; justify-content: start; padding-left: 4%; transition: all linear 0.1s; transition: color linear 0s;"
                    backgroundColor="#5C41FF20"
                    ><MisslesCounterDeco
                        size="2.5vh"
                        style="left: 83%;"
                    /></Label
                >
            </div>
        {/if}
        {#if deployedStreaks["energyWeapon"]}
            <div
                class="energyWeaponOnlineIndi deployedScorestreakActiveLabelItem"
                transition:fade={{ duration: 150 }}
            >
                <Label
                    id="energyWeaponOnlineLabel"
                    left="0%"
                    color="#5C41FF"
                    borderColor="#2400FF00"
                    text="Laser Array Online"
                    width="96%"
                    tabletWidth="99%"
                    height="100%"
                    horizontalFont="5px"
                    VerticalFont="8px"
                    backdropFilter="blur(5px)"
                    style="{getRightCurvedBorder(
                        5
                    )} border-left: solid 1px #5C41FF; justify-content: start; padding-left: 4%; transition: all linear 0.1s; transition: color linear 0s;"
                    backgroundColor="#5C41FF20"
                    ><svelte:component
                        this={streakMap["energyWeapon"].deco}
                        size="2.05vh"
                        color="#5C41FF"
                        style="left: 82%;"
                    /></Label
                >
            </div>
        {/if}
    </ul>
{/if}

<style>
    @keyframes ini {
        0% {
            transform: scaleX(0.2) scaleY(0.5) translateX(-70%);
        }
        100% {
            transform: scaleX(1) scaleY(1) translateX(0%);
        }
    }
    :global(#enemyLockLabel, #energyWeaponOnlineLabel) {
        animation: ini linear 0.15s;
    }
    :global(.scorestreakFill) {
        transition: all linear 0.08s;
    }
    #deployedStreaksActiveLabelsList {
        position: absolute;
        top: 11.11%;
        left: 1.71875%;
        width: 9.43125%;
        height: 24.444444444%;
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
    }
    .deployedScorestreakActiveLabelItem {
        margin-bottom: 4.545454545%;
        position: relative;
        width: 100%;
        height: 12.5%;
    }
</style>
