<script>
    import Button from "../common/Button.svelte";
    import Label from "../common/Label.svelte";
    import {
        getLeftCurvedBorder,
        getRightCurvedBorder,
    } from "../../fn/dynamicBorders.js";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import NumberPicker from "../common/NumberPicker.svelte";
    const dispatch = createEventDispatcher();
    let show;
    let objective = { type: "duration", lives: 1, config: 5 };

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
            text="Objective Picker"
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
        <!---Type Picker-->
        <Label
            className="fromLeftAniSurvivalRunObjectives"
            text="Type"
            top="29.613733906%"
            left="1.167315175%"
            borderColor="#2400FF00"
            style="{getLeftCurvedBorder(5)} border-right: solid 1px #6D55FF;"
            width="15.369649805%"
            height="14.163090129%"
            backdropFilter="blur(3px)"
            backgroundColor="#2400FF40"
            color="#6D55FF"
            horizontalFont="13px"
        />
        <Button
            className="fromBelowAniSurvivalRunObjectives"
            onClick={() => {
                objective.type = "duration";
            }}
            label="Duration"
            top="29.613733906%"
            left="19.260700389%"
            borderColor={buttonColorsHash[objective.type === "duration"]
                .borderColor}
            width="18.287937743%"
            height="14.163090129%"
            borderRadius="5px"
            backdropFilter="blur(3px)"
            backgroundColor={buttonColorsHash[objective.type === "duration"]
                .backgroundColor}
            color={buttonColorsHash[objective.type === "duration"].color}
            horizontalFont="13px"
        />
        <Button
            className="fromBelowAniSurvivalRunObjectives"
            onClick={() => {
                objective.type = "waypoints";
                objective.config = { waypoints: [] };
            }}
            label="Waypoints"
            top="29.613733906%"
            left="39.105058366%"
            borderColor={buttonColorsHash[objective.type === "waypoints"]
                .borderColor}
            width="18.287937743%"
            height="14.163090129%"
            borderRadius="5px"
            backdropFilter="blur(3px)"
            backgroundColor={buttonColorsHash[objective.type === "waypoints"]
                .backgroundColor}
            color={buttonColorsHash[objective.type === "waypoints"].color}
            horizontalFont="13px"
        />
        <Button
            className="fromBelowAniSurvivalRunObjectives"
            onClick={() => {
                objective.type = "kills";
                objective.config = 25;
            }}
            label="Kills"
            top="29.613733906%"
            left="58.949416342%"
            borderColor={buttonColorsHash[objective.type === "kills"]
                .borderColor}
            width="18.287937743%"
            height="14.163090129%"
            borderRadius="5px"
            backdropFilter="blur(3px)"
            backgroundColor={buttonColorsHash[objective.type === "kills"]
                .backgroundColor}
            color={buttonColorsHash[objective.type === "kills"].color}
            horizontalFont="13px"
        />
        <!---Life Count Picker-->
        <Label
            className="fromLeftAniSurvivalRunObjectives"
            text="# of lives"
            top="50.214592275%"
            left="1.167315175%"
            borderColor="#2400FF00"
            style="{getLeftCurvedBorder(5)} border-right: solid 1px #6D55FF;"
            width="15.369649805%"
            height="14.163090129%"
            backdropFilter="blur(3px)"
            backgroundColor="#2400FF40"
            color="#6D55FF"
            horizontalFont="13px"
        />
        <NumberPicker
            top="50.214592275%"
            left="19.260700389%"
            borderRadius="5px"
            defaultValue={5}
            max={5}
            min={1}
            horizontalFont="13px"
        />
        <!---Config-->
        <Label
            className="fromLeftAniSurvivalRunObjectives"
            text="Config"
            top="70.815450644%"
            left="1.167315175%"
            borderColor="#2400FF00"
            style="{getLeftCurvedBorder(5)} border-right: solid 1px #6D55FF;"
            width="15.369649805%"
            height="14.163090129%"
            backdropFilter="blur(3px)"
            backgroundColor="#2400FF40"
            color="#6D55FF"
            horizontalFont="13px"
        />
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
