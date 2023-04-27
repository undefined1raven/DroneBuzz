<script>
    import Button from "./Button.svelte";
    import Label from "./Label.svelte";

    let deadcount;
    let timeString;
    let bestTime;
    let started;
    let fire;

    export { timeString, deadcount, bestTime, started, fire };
</script>

{#if started}
    <div class="fireControlDashboard">
        <div id="fireControl">
            <Label
                top="27.419354839%"
                left="0%"
                color="#FF0010"
                borderColor="#2400FF00"
                text={`Drone Dead Count: ${deadcount}`}
                width="55.983471074%"
                height="29.032258065%"
                horizontalFont="10px"
                VerticalFont="8px"
                backgroundColor="#2400FF00"
            />
            <Label
                id="time"
                top="60.419354839%"
                left="0%"
                color="#2400FF"
                borderColor="#2400FF00"
                text={`Current<>Best | ${timeString}<>${
                    bestTime == undefined ? "N/A" : bestTime
                }`}
                width="55.983471074%"
                height="29.032258065%"
                horizontalFont="10px"
                VerticalFont="8px"
                backgroundColor="#2400FF00"
            />
        </div>
    </div>
{/if}

<style>
    .fireControlDashboard {
        position: absolute;
        top: 76%; /*82.777777778*/
        left: 0%;
        width: 37.8125%;
        height: 24%; /*17.222222222*/
        background-color: #0c001caa;
        backdrop-filter: blur(5px);
        border-radius: 0 5px 0 0;
    }
</style>
