<script>
    import Label from "../common/Label.svelte";
    import Button from "../common/Button.svelte";
    import SurvivalRunDeco from "../deco/SurvivalRunDeco.svelte";
    import SurvivalRunObjectivesSetup from "./SurvivalRunObjectivesSetup.svelte";
    import { createEventDispatcher } from "svelte";
    import { getRightCurvedBorder } from "../../fn/dynamicBorders";
    import SurvivalRunLoadoutConfig from "./SurvivalRunLoadoutConfig.svelte";
    const dispatch = createEventDispatcher();

    let onBack;
    let onStartRun;
    let runConfig = {
        displayDifficulty: "easy",
        difficulty: "easy",
        objective: { type: "none" },
        location: { lng: 26.02985041110172, lat: 44.35381465897361 },
    };

    let activeWindowID = "main"; // main | objectives | loadout | stats

    function onDifficultySelected(difficulty, e) {
        runConfig.displayDifficulty = difficulty;
        runConfig.difficulty = difficulty;
        e.target.style.transition = "all linear 0.15s";
        setTimeout(() => {
            runConfig.difficulty = "lx";
        }, 50);
        setTimeout(() => {
            runConfig.difficulty = difficulty;
        }, 110);
    }

    let buttonColorsHash = {
        true: {
            color: "#FFF",
            backgroundColor: "#2400FF40",
            borderColor: "#2400FF",
        },
        false: {
            color: "#2400FF",
            backgroundColor: "#00000000",
            borderColor: "#2400FF",
        },
    };

    function getDynamicBorderRadius(pxRadius) {
        return `${
            (parseFloat(pxRadius * 100) / 360 / 100) *
                document.documentElement.clientHeight +
            "px"
        }`;
    }

    export { onBack, onStartRun };
</script>

<div class="survivalRunSetupContainer">
    <div class="navContainer">
        <SurvivalRunDeco
            size="30vh"
            tabletSize="25vh"
            top="47.210300429%"
            tabletTop="50%"
        />
        <Label
            text="Survival Run"
            color="#5C41FF"
            horizontalFont="15px"
            top="34.334763948%"
            tabletTop="35%"
        />
        <Button
            onClick={onBack}
            label="Back"
            color="#3A1AFF"
            borderColor="#1A00BA"
            horizontalFont="15px"
            top="7.296137339%"
            tabletTop="4%"
            width="89.6%"
            height="14.163090129%"
            borderRadius="5px"
        />
    </div>
    <div class="settingsContainer">
        <Label
            className="fromAboveAni"
            text="Objective"
            color="#6D55FF"
            horizontalFont="13px"
            backgroundColor="#1A00BA30"
            style="border-left: solid 1px #6D55FF; border-radius: 0px {getDynamicBorderRadius(
                5
            )} {getDynamicBorderRadius(5)} 0px ;"
            width="14.53125%"
            height="8.333333333%"
            top="53.055555556%"
            tabletTop="53.055555556%"
            tabletLeft="25%"
            left="25%"
        />
        <!--Location Start-->
        <div class="locationControlsGroup">
            <Button
                className="fromAboveAni"
                onClick={(e) => {
                    dispatch("onLocationPick");
                }}
                label="Pick"
                color={buttonColorsHash[true].color}
                horizontalFont="13px"
                backgroundColor={buttonColorsHash[true].backgroundColor}
                borderRadius="5px"
                borderColor={buttonColorsHash[true].borderColor}
                width="11.875%"
                height="8.333333333%"
                top="65.555555556%"
                left="41.40625%"
                tabletLeft="41.40625%"
            />
        </div>

        <!--Difficulty Start-->
        <div class="difficultyControlsGroup">
            <Label
                className="fromAboveAni"
                text="Difficulty"
                color="#6D55FF"
                horizontalFont="13px"
                backgroundColor="#1A00BA30"
                style="border-left: solid 1px #6D55FF; border-radius: 0px {getDynamicBorderRadius(
                    5
                )} {getDynamicBorderRadius(5)} 0px ;"
                width="14.53125%"
                height="8.333333333%"
                top="40.555555556%"
                tabletTop="40.555555556%"
                tabletLeft="25%"
                left="25%"
            />
            <Button
                className="fromAboveAni"
                onClick={(e) => {
                    onDifficultySelected("easy", e);
                }}
                label="Easy"
                color={buttonColorsHash[runConfig.difficulty === "easy"].color}
                horizontalFont="13px"
                backgroundColor={buttonColorsHash[
                    runConfig.difficulty === "easy"
                ].backgroundColor}
                borderRadius="5px"
                borderColor={buttonColorsHash[runConfig.difficulty === "easy"]
                    .borderColor}
                width="11.875%"
                height="8.333333333%"
                top="40.555555556%"
                left="41.40625%"
                tabletTop="40.555555556%"
                tabletLeft="41.40625%"
            />
            <Button
                className="fromAboveAni"
                onClick={(e) => {
                    onDifficultySelected("medium", e);
                }}
                label="Medium"
                color={buttonColorsHash[runConfig.difficulty === "medium"]
                    .color}
                horizontalFont="13px"
                backgroundColor={buttonColorsHash[
                    runConfig.difficulty === "medium"
                ].backgroundColor}
                borderRadius="5px"
                borderColor={buttonColorsHash[runConfig.difficulty === "medium"]
                    .borderColor}
                width="11.875%"
                height="8.333333333%"
                top="40.555555556%"
                left="55.15625%"
                tabletTop="40.555555556%"
                tabletLeft="55.15625%"
            />
            <Button
                className="fromAboveAni"
                onClick={(e) => {
                    onDifficultySelected("hard", e);
                }}
                label="Hard"
                color={buttonColorsHash[runConfig.difficulty === "hard"].color}
                horizontalFont="13px"
                backgroundColor={buttonColorsHash[
                    runConfig.difficulty === "hard"
                ].backgroundColor}
                borderRadius="5px"
                borderColor={buttonColorsHash[runConfig.difficulty === "hard"]
                    .borderColor}
                width="13.59375%"
                height="8.333333333%"
                top="40.555555556%"
                left="69.0625%"
                tabletTop="40.555555556%"
                tabletLeft="69.0625%"
            />
            <Button
                className="fromAboveAni"
                onClick={(e) => {
                    onDifficultySelected("insane", e);
                }}
                label="Goodluck :))"
                color={buttonColorsHash[runConfig.difficulty === "insane"]
                    .color}
                horizontalFont="13px"
                backgroundColor={buttonColorsHash[
                    runConfig.difficulty === "insane"
                ].backgroundColor}
                borderRadius="5px"
                borderColor={buttonColorsHash[runConfig.difficulty === "insane"]
                    .borderColor}
                width="11.875%"
                height="8.333333333%"
                top="40.555555556%"
                left="84.6875%"
                tabletTop="40.555555556%"
                tabletLeft="84.6875%"
            />
        </div>
        <!--Difficulty End-->
    </div>

    <div class="objectivesContainer">
        <Button
            className="fromAboveAni"
            onClick={(e) => {
                runConfig.objective = { type: "none" };
            }}
            label="None"
            color={buttonColorsHash[runConfig.objective.type === "none"].color}
            horizontalFont="13px"
            backgroundColor={buttonColorsHash[
                runConfig.objective.type === "none"
            ].backgroundColor}
            borderRadius="5px"
            borderColor={buttonColorsHash[runConfig.objective.type === "none"]
                .borderColor}
            width="11.875%"
            height="8.333333333%"
            top="53.055555556%"
            left="41.40625%"
            tabletTop="53.055555556%"
            tabletLeft="41.40625%"
        />
        <Button
            className="fromAboveAni"
            onClick={(e) => {
                activeWindowID = "objectives";
                dispatch("locationPreviewOverrideUpdate", false);
            }}
            label="Pick"
            color={buttonColorsHash[runConfig.objective.type !== "none"].color}
            horizontalFont="13px"
            backgroundColor={buttonColorsHash[
                runConfig.objective.type !== "none"
            ].backgroundColor}
            borderRadius="5px"
            borderColor={buttonColorsHash[runConfig.objective.type !== "none"]
                .borderColor}
            width="11.875%"
            height="8.333333333%"
            top="53.055555556%"
            left="55.15625%"
            tabletTop="53.055555556%"
            tabletLeft="55.15625%"
        />
    </div>
    <div class="flyButtonBkg" />
    <Button
        id="survivalRunStartButton"
        className="fromBelowAni"
        onClick={() => {
            onStartRun(runConfig);
        }}
        label="Fly"
        color="#FFF"
        borderColor="#2400FF"
        backgroundColor="#2400FF20"
        horizontalFont="18px"
        top="83.333333333%"
        tabletTop="83.333333333%"
        tabletLeft="46.875%"
        left="46.875%"
        width="29.53125%"
        height="13.055555556%"
        borderRadius="5px"
    />
    <Button
        id="chooseLoadoutButton"
        className="fromBelowAni"
        onClick={() => {
            dispatch("locationPreviewOverrideUpdate", false);
            activeWindowID = "loadout";
        }}
        label="Choose Loadout"
        color="#AEA0FF"
        borderColor="#2400FF"
        backgroundColor="#2400FF20"
        horizontalFont="13px"
        top="86.111111111%"
        tabletTop="86.111111111%"
        tabletLeft="calc(76.09375% + 0.5%)"
        left="calc(76.09375% + 0.5%)"
        width="22.5%"
        height="8.333333333%"
        style={getRightCurvedBorder(5)}
    />
    <SurvivalRunObjectivesSetup
        on:onObjective={(e) => {
            runConfig.objective = e.detail.objective;
        }}
        on:onBack={() => {
            activeWindowID = "main";
            dispatch("locationPreviewOverrideUpdate", true);
        }}
        show={activeWindowID == "objectives"}
    />
    <SurvivalRunLoadoutConfig
        on:onBack={() => {
            activeWindowID = "main";
            dispatch("locationPreviewOverrideUpdate", true);
        }}
        show={activeWindowID == "loadout"}
    />
</div>

<style>
    @keyframes ini {
        0% {
            transform: translateX(-50%);
            opacity: 0;
        }
        100% {
            transform: translateX(0%);
            opacity: 1;
        }
    }
    @keyframes iniFromAbove {
        0% {
            transform: translateY(-50%);
            opacity: 0;
        }
        100% {
            transform: translateY(0%);
            opacity: 1;
        }
    }
    @keyframes iniFromBelow {
        0% {
            transform: translateY(50%);
            opacity: 0;
        }
        100% {
            transform: translateY(0%);
            opacity: 1;
        }
    }
    :global(.fromAboveAni) {
        animation: iniFromAbove ease-in-out 0.15s;
    }
    :global(.fromBelowAni) {
        animation: iniFromBelow ease-in-out 0.15s;
    }
    .flyButtonBkg {
        position: absolute;
        top: 79.722222222%;
        left: 19.6875%;
        width: 80.3125%;
        height: 20.277777778%;
        border-top: solid 1px #2400ff;
        animation: iniFromBelow ease-in-out 0.15s;
        background: radial-gradient(
                50.5% 737.16% at 49.5% 46.79%,
                rgba(36, 0, 255, 0.25) 0%,
                rgba(36, 0, 255, 0) 100%
            )
            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    }
    .navContainer {
        position: absolute;
        animation: ini ease-in-out 0.15s;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 35.277777778%;
        left: 0%;
        width: 19.53125%;
        height: 64.722222222%;
        border-right: solid 1px #2400ff;
        background: radial-gradient(
            129.3% 91% at 49.6% 104%,
            rgba(36, 0, 255, 0.4) 0%,
            rgba(36, 0, 255, 0.1) 100%
        );
    }
</style>
