<script>
    import MainMenuDeco from "../deco/MainMenuDeco.svelte";
    import Label from "../common/Label.svelte";
    import Button from "../common/Button.svelte";
    import SurvivalRunSetup from "./SurvivalRunSetup.svelte";
    import SurvivalRunDeco from "../deco/SurvivalRunDeco.svelte";
    import CampaignDeco from "../deco/CampaignDeco.svelte";
    import FullscreenDeco from "../deco/FullscreenDeco.svelte";
    import RefreshDeco from "../deco/RefreshDeco.svelte";
    import CalibrationDeco from "../deco/CalibrationDeco.svelte";
    import MinifyScreenDeco from "../deco/MinifyScreenDeco.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let show;
    let started;
    const root = document.documentElement;
    let screenWidth = root.clientWidth;
    let screenHeight = root.clientHeight;
    let isFullscreen;
    let menuOpacityOverride = 1;

    //Menu State
    let activeWindowID = "menu"; //menu | survivalRunSetup | ....

    function onWindowResize() {
        screenWidth = root.clientWidth;
        screenHeight = root.clientHeight;
    }

    function startRun(runConfig) {
        dispatch("startSurvivalRun", {
            restart: started,
            runConfig: runConfig,
        });
    }

    function setActiveWindow(WID) {
        activeWindowID = WID;
        dispatch("stateChange", { WID: WID });
    }

    export { show, started, isFullscreen, menuOpacityOverride };
</script>

<svelte:window on:resize={onWindowResize} />
{#if show && screenHeight < screenWidth}
    <div class="mainMenuContainer" style="opacity: {menuOpacityOverride};">
        <div class="topGradientBkg" />
        <div class="bottomGradientBkg" />
        <Button
            onClick={() => dispatch("onFullscreen")}
            top="10.555555556%"
            left="83.4375%"
            width="9.0625%"
            height="12.222222222%"
            backgroundColor="#2400FF20"
            style="z-index: 1500;"
            borderRadius="5px"
            borderColor="#2400FF"
            >{#if !isFullscreen}<FullscreenDeco />{:else}<MinifyScreenDeco
                />{/if}</Button
        >
        <Button
            onClick={() => window.location.reload()}
            top="10.555555556%"
            left="72.5%"
            width="9.0625%"
            height="12.222222222%"
            backgroundColor="#2400FF20"
            style="z-index: 1500;"
            borderRadius="5px"
            borderColor="#2400FF"><RefreshDeco /></Button
        >
        <Button
            onClick={() => dispatch("onStartCalibration")}
            top="10.555555556%"
            left="61.40625%"
            width="9.0625%"
            height="12.222222222%"
            backgroundColor="#2400FF20"
            style="z-index: 1500;"
            borderRadius="5px"
            borderColor="#2400FF"
            ><CalibrationDeco
                staticColor="#2400FF"
                style="top: auto;"
                size="8vh"
            /></Button
        >
        <MainMenuDeco />
        <Label
            text="Drone Buzz"
            top="7.222222222%"
            left="23.59375%"
            tabletLeft="30%"
            tabletTop="8%"
            color="#9E7CFF"
            horizontalFont="20px"
            style="letter-spacing: 1.4vh"
        />
        <Label
            text="Build [300423+5]"
            top="15.833333333%"
            left="23.59375%"
            tabletLeft="30%"
            tabletTop="16%"
            color="#7B4DFF"
            horizontalFont="10px"
            style="letter-spacing: 0.4vh"
        />
        <Label
            text="[ddc3ebd]"
            top="21.111111111%"
            left="23.59375%"
            tabletLeft="30%"
            tabletTop="20%"
            color="#7B4DFF"
            horizontalFont="10px"
            style="letter-spacing: 0.4vh"
        />
        <div
            style="position: absolute; top: 0%; left: 0%; width: 100%; height: 34.7222vh; background-color: #2400FF01; backdrop-filter: blur(2px) hue-rotate(00deg); border-bottom: solid 1px #4200FF"
        />

        {#if activeWindowID == "menu"}
            <div id="menuContainerActual">
                <div
                    on:click={() => setActiveWindow("survivalRunSetup")}
                    class="menuButton"
                    style="position: absolute; top: 46.111111111%;  left: 7.5%; display: flex; align-items: center; justify-content: center; width: 35.15625%; height: calc(41.666666667% - 4%);"
                >
                    <Button
                        onClick={() => setActiveWindow("survivalRunSetup")}
                        label="Survival Run"
                        color="#5C41FF"
                        backdropFilter="none"
                        top=""
                        left=""
                        borderColor="#2400FF"
                        style="border-radius: 5px; align-items: start; padding-top: 10%"
                        backgroundColor="#2400FF20"
                        width="100%"
                        height="90%"
                        horizontalFont="16px"
                    />
                    <SurvivalRunDeco top="48.333333333%" tabletTop="38%" />
                </div>
                <div
                    class="menuButton"
                    style="position: absolute; top: 46.111111111%; left: 57.34375%; display: flex; align-items: center; justify-content: center; width: 35.15625%; height: calc(41.666666667% - 4%);"
                >
                    <Button
                        onClick={() => dispatch("hideMenu")}
                        label="Campaign"
                        color="#5C41FF"
                        backdropFilter="none"
                        top=""
                        left=""
                        borderColor="#2400FF"
                        style="border-radius: 5px; align-items: start; padding-top: 10%"
                        backgroundColor="#2400FF20"
                        width="100%"
                        height="90%"
                        horizontalFont="16px"
                    />
                    <CampaignDeco top="48.333333333%" />
                </div>
            </div>
        {/if}
        {#if activeWindowID == "survivalRunSetup"}
            <SurvivalRunSetup
                on:setWaypointEditor
                on:locationPreviewOverrideUpdate
                on:onLocationPick
                onBack={() => {
                    setActiveWindow("menu");
                    dispatch("locationPreviewOverrideUpdate", true);
                }}
                onStartRun={(runConfig) => startRun(runConfig)}
            />
        {/if}
    </div>
{/if}

<style>
    @keyframes ini {
        0% {
            transform: translateY(50%) scaleY(0.4) scaleX(0.4);
            opacity: 0;
        }
        100% {
            transform: translateY(0%) scaleY(1) scaleX(1);
            opacity: 1;
        }
    }
    .menuButton {
        animation: ini ease-in-out 0.1s;
    }
    .bottomGradientBkg {
        position: absolute;
        top: 60.277777778%;
        left: 0%;
        width: 100%;
        height: 39.722222222%;
        background: radial-gradient(
            100% 100% at 50% 0%,
            rgba(27, 0, 193, 0.3) 0%,
            rgba(19, 0, 43, 0) 100%
        );
        transform: rotate(-180deg);
    }
    .topGradientBkg {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 39.722222222%;
        background: radial-gradient(
            84.62% 84.62% at 50% 3.5%,
            rgba(82, 0, 255, 0.3) 0%,
            rgba(19, 0, 43, 0) 100%
        );
    }
    .mainMenuContainer {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0%;
        left: 0%;
        background-color: rgba(6, 0, 30, 0.7);
        backdrop-filter: blur(4px);
    }
</style>
