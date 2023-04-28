<script>
    import MainMenuDeco from "./MainMenuDeco.svelte";
    import Label from "./Label.svelte";
    import Button from "./Button.svelte";

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
            color="#4200FF"
            horizontalFont="20px"
            style="letter-spacing: 1.4vh"
        />
        <Label
            text="Build [230428+0]"
            top="15.833333333%"
            left="23.59375%"
            color="#4200FF"
            horizontalFont="10px"
            style="letter-spacing: 0.4vh"
        />
        <Label
            text="[49C235C]"
            top="21.111111111%"
            left="23.59375%"
            color="#4200FF"
            horizontalFont="10px"
            style="letter-spacing: 0.4vh"
        />
        <div style="position: absolute; top: 0%; left: 0%; width: 34.7222vh; height: 34.7222vh; background-color: #2400FF05; backdrop-filter: blur(3px);"></div>
        <Button onClick={() => onHideMenu()} label="Survival Run" color="#5C41FF" backdropFilter="none" top="46.111111111%" left="7.5%" borderColor="#2400FF" style="border-radius: 5px" backgroundColor="#2400FF20" width="35.15625%" height="41.666666667%" horizontalFont="16px" />
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
