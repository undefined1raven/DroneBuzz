<script>
    import MainMenuDeco from "./deco/MainMenuDeco.svelte";
    import Label from "./Label.svelte";
    import Button from "./Button.svelte";
    import SurvivalRunDeco from "./deco/SurvivalRunDeco.svelte";
    import CampaignDeco from "./deco/CampaignDeco.svelte";
    let show;
    let onHideMenu;
    const root = document.documentElement;
    let screenWidth = root.clientWidth;

    export { show, onHideMenu };
</script>

{#if show && screenWidth < 1020}
    <div class="mainMenuContainer">
        <div class="topGradientBkg" />
        <div class="bottomGradientBkg" />
        <MainMenuDeco />
        <Label
            text="Drone Buzz"
            top="7.222222222%"
            left="23.59375%"
            color="#9E7CFF"
            horizontalFont="20px"
            style="letter-spacing: 1.4vh"
        />
        <Label
            text="Build [230428+0]"
            top="15.833333333%"
            left="23.59375%"
            color="#7B4DFF"
            horizontalFont="10px"
            style="letter-spacing: 0.4vh"
        />
        <Label
            text="[49C235C]"
            top="21.111111111%"
            left="23.59375%"
            color="#7B4DFF"
            horizontalFont="10px"
            style="letter-spacing: 0.4vh"
        />
        <div
            style="position: absolute; top: 0%; left: 0%; width: 100%; height: 34.7222vh; background-color: #2400FF01; backdrop-filter: blur(2px) hue-rotate(00deg); border-bottom: solid 1px #4200FF"
        />
        <div
            style="position: absolute; top: 46.111111111%; left: 7.5%; display: flex; align-items: center; justify-content: center; width: 35.15625%; height: calc(41.666666667% - 4%);"
        >
            <Button
                onClick={() => onHideMenu()}
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
            <SurvivalRunDeco top="48.333333333%" />
        </div>
        <div
        style="position: absolute; top: 46.111111111%; left: 57.34375%; display: flex; align-items: center; justify-content: center; width: 35.15625%; height: calc(41.666666667% - 4%);"
    >
        <Button
            onClick={() => onHideMenu()}
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

<style>
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
            )
            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
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
