<script>
    import Button from "../common/Button.svelte";
    import Label from "../common/Label.svelte";
    import {
        getLeftCurvedBorder,
        getRightCurvedBorder,
    } from "../../fn/dynamicBorders.js";
    import { createEventDispatcher, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import WeaponSelectionButton from "../common/WeaponSelectionButton.svelte";
    import MissileDeco from "../deco/MissileDeco.svelte";
    const dispatch = createEventDispatcher();
    let show;

    let selectedOffensiveWeapon = "smartMissile";

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
        <!--Offensive Config-->
        <Label
            className="fromLeftAniSurvivalRunObjectives"
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
        <ul
            id="offensiveAvailableWeaponsList"
            class="fromLeftAniSurvivalRunObjectives"
        >
            <WeaponSelectionButton
                on:onWeaponSelection={(e) =>
                    (selectedOffensiveWeapon = e.detail.weaponID)}
                selectedWeaponID={selectedOffensiveWeapon}
                weaponID="smartMissile"
                className="weaponsListItem"
                displayName="Smart AT3 Missile"
                secondaryLabel="knows where it is at all times"
                width="100%"
                height="27.5%"
                decoThis={MissileDeco}
                decoProps={{
                    color: "#3F1FFF",
                    opacity: 0.7,
                    left: "87%",
                    tabletLeft: "82%",
                    width: "4.5vh",
                    height: "5.5vh",
                }}
            />
            <WeaponSelectionButton
                on:onWeaponSelection={(e) =>
                    (selectedOffensiveWeapon = e.detail.weaponID)}
                selectedWeaponID={selectedOffensiveWeapon}
                weaponID="laserCannon"
                className="weaponsListItem"
                displayName="LYTE Laser Cannon"
                secondaryLabel="is mad about the inverse square law"
                width="100%"
                height="27.5%"
                decoThis={MissileDeco}
                decoProps={{
                    color: "#2400FF",
                    opacity: 0.7,
                    left: "87%",
                    tabletLeft: "82%",
                    width: "4.5vh",
                    height: "5.5vh",
                }}
            />
        </ul>
    </div>
{/if}

<style>
    :global(.weaponsListItem) {
        position: relative !important;
        margin-bottom: 6%;
    }
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
    #offensiveAvailableWeaponsList {
        position: absolute;
        top: 46.78111588%;
        left: 1.167315175%;
        width: 30.93385214%;
        height: 51.502145923%;
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
    }
</style>
