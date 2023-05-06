<script>
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
    import Button from "../common/Button.svelte";
    const dispatch = createEventDispatcher();
    let started;
    let fire;
    let defensiveFire;
    let isHunted;
    let isLaserCannonFiring = false;
    let laserCannonFireStartUnix;
    let cannonTempIndiTop = -100;
    let cannonTempIndiColor = "#2400FF";
    let laserCannonOverheatDuration;

    $: onLaserCannonFiringChange(isLaserCannonFiring);

    function onLaserCannonFiringChange(isLaserCannonFiring) {
        let cannonTempInterval;
        if (isLaserCannonFiring) {
            cannonTempInterval = setInterval(() => {
                const delta = Date.now() - laserCannonFireStartUnix;
                const percentage = (delta * 100) / laserCannonOverheatDuration;
                cannonTempIndiTop = 100 - percentage;
                if (percentage >= 50) {
                    cannonTempIndiColor = "#2400FF";
                }
                if (percentage < 50 && percentage >= 20) {
                    cannonTempIndiColor = "#FFB800";
                }
                if (percentage < 20 && percentage >= 0) {
                    cannonTempIndiColor = "#FF0010";
                }
            }, 50);
        } else {
            if (cannonTempInterval != undefined) {
                clearInterval(cannonTempInterval);
            }
        }
    }

    export {
        started,
        fire,
        defensiveFire,
        isHunted,
        isLaserCannonFiring,
        laserCannonFireStartUnix,
        laserCannonOverheatDuration,
    };
</script>

{#if started}
    <!--<div class="opsDashboard"></div>-->
    {#if isHunted}
        <Button
            top="75.277777778%"
            left="78.28125%"
            color="#FF0010"
            borderColor="#FF0010"
            lightColor="#FF00AA"
            label="Deploy Countermeasures"
            width="20.15625%"
            height="10.277777778%"
            horizontalFont="10px"
            VerticalFont="15px"
            backdropFilter="blur(4px)"
            borderRadius="5px"
            onClick={(e) => {
                defensiveFire();
            }}
            backgroundColor="#FF001020"
        />
    {/if}
    <Button
        on:onTouchStart={() => {
            dispatch("onFireStart");
        }}
        on:onTouchEnd={() => {
            dispatch("onFireEnd");
        }}
        id="fireButton"
        top="86.944444444%"
        left="78.28125%"
        color="#5C41FF"
        borderColor="#2400FF"
        backdropFilter="blur(4px)"
        backgroundColor="#2400FF20"
        label="Fire"
        lightColor="#7963FF"
        width="20.15625%"
        height="10.277777778%"
        horizontalFont="14px"
        VerticalFont="15px"
        borderRadius="5px"
        onClick={() => {
            fire();
        }}
    />
    {#if isLaserCannonFiring}
        <div
            class="laserCannonTempIndiContainer"
            style="background-color: {cannonTempIndiColor}20;"
        >
            <div
                class="laserCannonTempIndiActual"
                style="top: {cannonTempIndiTop}%; color: {cannonTempIndiColor};"
            />
        </div>
    {/if}
{/if}

<style>
    .laserCannonTempIndiActual {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: #2400ff;
    }
    .laserCannonTempIndiContainer {
        position: absolute;
        top: 86.944444444%;
        left: 77.8125%;
        width: 0.3125%;
        height: 10.277777778%;
        overflow: hidden;
        border-radius: 5px;
        backdrop-filter: blur(5px);
    }
    .opsDashboard {
        position: absolute;
        top: 76%; /*82.777777778*/
        left: 62.1875%;
        width: 37.8125%;
        height: 24%; /*17.222222222*/
        background-color: #0c001c00;
        backdrop-filter: blur(0px);
        border-radius: 5px 0px 0px 0px;
    }
</style>
