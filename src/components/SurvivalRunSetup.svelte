<script>
    import Label from "./Label.svelte";
    import Button from "./Button.svelte";
    import SurvivalRunDeco from "./deco/SurvivalRunDeco.svelte";

    let onBack;
    let onStartRun;

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
    <div class="settingsContainer" />
    <div class="flyButtonBkg" />
    <Button
        id="survivalRunStartButton"
        onClick={onStartRun}
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
        }
        50% {
            transform: translateX(-20%);
        }
        100% {
            transform: translateX(0%);
        }
    }
    @keyframes iniFromBelow {
        0% {
            transform: translateY(50%);
        }
        50% {
            transform: translateY(20%);
        }
        100% {
            transform: translateY(0%);
        }
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
        border-top: solid 1px #2400FF;
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
