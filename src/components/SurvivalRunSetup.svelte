<script>
    import Label from "./Label.svelte";
    import Button from "./Button.svelte";
    import SurvivalRunDeco from "./deco/SurvivalRunDeco.svelte";

    let onBack;
    let onStartRun;
    let runConfig = {
        difficulty: "easy",
        objective: "none",
        location: { lng: 26.02985041110172, lat: 44.35381465897361 },
    };

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

    export { onBack, onStartRun };
</script>

<div class="survivalRunSetupContainer">
    <div class="navContainer">
        <SurvivalRunDeco size="30vh" top="47.210300429%" />
        <Label
            text="Survival Run"
            color="#5C41FF"
            horizontalFont="15px"
            top="34.334763948%"
        />
        <Button
            onClick={onBack}
            label="Back"
            color="#3A1AFF"
            borderColor="#1A00BA"
            horizontalFont="15px"
            top="7.296137339%"
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
            style="border-left: solid 1px #6D55FF; border-radius: 0px 5px 5px 0px;"
            width="14.53125%"
            height="8.333333333%"
            top="53.055555556%"
            left="25%"
        />
        <Label
            className="fromAboveAni"
            text="Location"
            color="#6D55FF"
            horizontalFont="13px"
            backgroundColor="#1A00BA30"
            style="border-left: solid 1px #6D55FF; border-radius: 0px 5px 5px 0px;"
            width="14.53125%"
            height="8.333333333%"
            top="65.555555556%"
            left="25%"
        />

        <!--Difficulty Start-->
        <div class="difficultyControlsGroup">
            <Label
                className="fromAboveAni"
                text="Difficulty"
                color="#6D55FF"
                horizontalFont="13px"
                backgroundColor="#1A00BA30"
                style="border-left: solid 1px #6D55FF; border-radius: 0px 5px 5px 0px;"
                width="14.53125%"
                height="8.333333333%"
                top="40.555555556%"
                left="25%"
            />
            <Button
                className="fromAboveAni"
                onClick={() => (runConfig.difficulty = "easy")}
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
            />
            <Button
                className="fromAboveAni"
                onClick={() => (runConfig.difficulty = "medium")}
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
            />
            <Button
                className="fromAboveAni"
                onClick={() => (runConfig.difficulty = "hard")}
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
            />
            <Button
                className="fromAboveAni"
                onClick={() => (runConfig.difficulty = "insane")}
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
            />
        </div>
        <!--Difficulty End-->
    </div>
    <div class="flyButtonBkg" />
    <Button
        id="survivalRunStartButton"
        onClick={() => onStartRun(runConfig)}
        label="Fly"
        color="#FFF"
        borderColor="#2400FF"
        backgroundColor="#2400FF20"
        horizontalFont="18px"
        top="83.333333333%"
        left="46.875%"
        width="29.53125%"
        height="13.055555556%"
        borderRadius="5px"
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
    :global(#survivalRunStartButton) {
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
