<script>
    import Button from "../common/Button.svelte";
    import Label from "../common/Label.svelte";
    import {
        getLeftCurvedBorder,
        getRightCurvedBorder,
    } from "../../fn/dynamicBorders.js";
    import { createEventDispatcher, onMount } from "svelte";
    import { fade } from "svelte/transition";
    const dispatch = createEventDispatcher();
    let show;

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
    export { show };
</script>

{#if show}
    <div
        class="survivalRunObjectivesContainer"
        transition:fade={{ duration: 100 }}
    >
        <Button
            className="fromAboveAniSurvivalRunObjectives"
            onClick={() => dispatch("onBack")}
            label="Back"
            top="7.296137339%"
            left="1.167315175%"
            borderColor="#2400FF00"
            style="{getLeftCurvedBorder(
                5
            )} border-right: solid 1px #6D55FF; z-index: 5;"
            width="15.369649805%"
            height="14.163090129%"
            backdropFilter="blur(3px)"
            backgroundColor="#2400FF40"
            color="#6D55FF"
            horizontalFont="13px"
        />
        <Label
            className="fromAboveAniSurvivalRunObjectives"
            text="Loadout"
            left="16.73151751%"
            top="7.296137339%"
            height="calc(14.163090129% + 0.8%)"
            width="calc(82.101167315% - 3%)"
            backgroundColor="#2400FF40"
            backdropFilter="blur(3px)"
            style="{getRightCurvedBorder(
                5
            )} justify-content: start; padding-left: 3%;"
            color="#6D55FF"
            horizontalFont="13px"
        />
        <!---->
        <Label
            text="Offensive"
            top="27.896995708%"
            left="1.167315175%"
            width="30.93385214%"
            height="14.163090129%"
            backgroundColor="#2400FF40"
            backdropFilter="blur(3px)"
            color="#6D55FF"
            horizontalFont="13px"
            borderRadius="5px"
        />
        <ul>
            
        </ul>
    </div>
{/if}

<style>
    .survivalRunObjectivesContainer {
        position: absolute;
        top: 35.277777778%;
        left: 19.6875%;
        width: 80.3125%;
        height: 64.722222222%;
        background-color: #030017aa;
        backdrop-filter: blur(15px);
    }
    :global(.fromAboveAniSurvivalRunObjectives) {
        animation: iniFromAbove ease-in-out 0.15s;
    }
    :global(.fromLeftAniSurvivalRunObjectives) {
        animation: ini ease-in-out 0.15s;
    }
    :global(.fromBelowAniSurvivalRunObjectives) {
        animation: iniFromBelow ease-in-out 0.15s;
    }
</style>
