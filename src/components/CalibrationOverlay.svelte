<script>
    import Label from "./Label.svelte";
    import Button from "./Button.svelte";
    import CalibrationDeco from ".//deco/CalibrationDeco.svelte";
    import { onMount, getContext } from "svelte";
    import cartesianDistance from "../fn/cartesianDistance.js";
    import MinifyScreenDeco from "./deco/MinifyScreenDeco.svelte";
    import FullscreenDeco from "./deco/FullscreenDeco.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    const { getMap } = getContext("map");
    const root = document.documentElement;
    let showCalibration;
    let statusObj = { top: false, bottom: false, left: false, right: false };
    let calibrationRawData = {
        leftLng: { lng: 0, refLat: 0 },
        rightLng: 0,
        topLat: { lat: 0, refLng: 0 },
        bottomLat: 0,
    }; //used to compute visible map bounds
    let map = getMap();
    let onCalibrationFinish;
    let isFullscreen;

    onMount(() => {
        setTimeout(() => {
            if (map != undefined) {
                map.on("load", () => {
                    map.on("click", (e) => {
                        if (e.point.x < 20) {
                            statusObj.left = true;
                            calibrationRawData.leftLng = {
                                lng: e.lngLat.lng,
                                refLat: e.lngLat.lat,
                            };
                        }
                        if (e.point.x > root.clientWidth - 20) {
                            statusObj.right = true;
                            calibrationRawData.rightLng = e.lngLat.lng;
                        }
                        if (e.point.y > root.clientHeight - 20) {
                            statusObj.bottom = true;
                            calibrationRawData.bottomLat = e.lngLat.lat;
                        }
                        if (e.point.y < 20) {
                            statusObj.top = true;
                            calibrationRawData.topLat = {
                                lat: e.lngLat.lat,
                                refLng: e.lngLat.lng,
                            };
                        }
                        if (
                            statusObj.top &&
                            statusObj.bottom &&
                            statusObj.left &&
                            statusObj.right
                        ) {
                            let refLat = calibrationRawData.leftLng.refLat;
                            let refLng = calibrationRawData.topLat.refLng;
                            let horizontalDistance = cartesianDistance(
                                {
                                    lng: calibrationRawData.leftLng.lng,
                                    lat: refLat,
                                },
                                {
                                    lng: calibrationRawData.rightLng,
                                    lat: refLat,
                                }
                            ).toFixed(10);
                            let verticalDistance = cartesianDistance(
                                {
                                    lng: refLng,
                                    lat: calibrationRawData.topLat.lat,
                                },
                                {
                                    lng: refLng,
                                    lat: calibrationRawData.bottomLat,
                                }
                            ).toFixed(10);
                            onCalibrationFinish({
                                vertical: verticalDistance,
                                horizontal: horizontalDistance,
                            });
                        }
                    });
                });
            }
        }, 50);
    });

    export { showCalibration, map, onCalibrationFinish, isFullscreen };
</script>

{#if showCalibration}
    <div class="caliOverlayContainer">
        <Label
            top="23.404255319%"
            text="Tap on every side of the screen as close to the edge as possible"
            color="#2400FF"
            horizontalFont="15px"
            verticalFont="12px"
            tabletTop="21%"
        />
        <Label
            top="5.404255319%"
            tabletTop="4%"
            text="One-time calibration"
            color="#593EFF"
            horizontalFont="12px"
            verticalFont="8px"
        />
        <CalibrationDeco {statusObj} />
    </div>
    <Label
        color="#725AFF"
        backdropFilter="blur(5px)"
        backgroundColor="#2400FF20"
        text="Go full screen before calibrating"
        horizontalFont="14px"
        width="44.21875%"
        height="12.222222222%"
        top="61.666666667%"
        left="15.3125%"
        borderRadius="5px"
    />
    <Button
        onClick={() => dispatch("onFullscreen")}
        top="61.666666667%"
        left="62.8125%"
        width="21.71875%"
        height="12.222222222%"
        backgroundColor="#2400FF20"
        style="z-index: 1500;"
        borderRadius="5px"
        borderColor="#2400FF"
        backdropFilter="blur(5px)"
        >{#if !isFullscreen}<FullscreenDeco />{:else}<MinifyScreenDeco />{/if}
    </Button>
{/if}

<style>
    .caliOverlayContainer {
        position: absolute;
        top: 31.111111111%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 69.21875%;
        height: 26.111111111%;
        background-color: #2400ff20;
        backdrop-filter: blur(5px);
        z-index: 1500;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
