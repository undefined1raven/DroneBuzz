<script>
    import Button from "./Button.svelte";

    let deadcount;
    let timeString;
    let bestTime;
    let opacity;

    export { timeString, deadcount, bestTime, opacity };
</script>

<div class="fireControlDashboard" style="opacity: {opacity};">
    <div id="fireControl">
        <Button
            top="61.290322581%"
            left="57.438016529%"
            color="#5C41FF"
            borderColor="#2400FF"
            label="Fire"
            width="26.033057851%"
            height="29.032258065%"
            fontSize="3.5vh"
            onClick={() => {
                console.log("fireee");
            }}
            backgroundColor="#2400FF20"
        />
        <Button
            top="27.419354839%"
            left="57.438016529%"
            color="#5C41FF"
            borderColor="#2400FF"
            label="LOS"
            width="11.983471074%"
            height="29.032258065%"
            fontSize="3.5vh"
            onClick={() => {
                console.log("fireee");
            }}
            backgroundColor="#2400FF20"
        />
        <Button
            top="27.419354839%"
            left="71.487603306%"
            color="#5C41FF"
            borderColor="#2400FF"
            label="Auto"
            width="11.983471074%"
            height="29.032258065%"
            fontSize="3.5vh"
            onClick={() => {
                console.log("fireee");
            }}
            backgroundColor="#2400FF20"
        />
        <Button
            top="27.419354839%"
            left="0%"
            color="#FF0010"
            borderColor="#2400FF00"
            label={`Drone Dead Count: ${deadcount}`}
            width="55.983471074%"
            height="29.032258065%"
            fontSize="3.5vh"
            onClick={() => {
                console.log("fireee");
            }}
            backgroundColor="#2400FF00"
        />
        <Button
                id="time"
                top="60.419354839%"
                left="0%"
                color="#2400FF"
                borderColor="#2400FF00"
                label={`Current<>Best | ${timeString}<>${bestTime == undefined ? 'N/A' : bestTime}`}
                width="55.983471074%"
                height="29.032258065%"
                fontSize="2.8vh"
                onClick={() => {
                    console.log("fireee");
                }}
                backgroundColor="#2400FF00"
            />
    </div>
    <div id="fireControlTargetSelection">
        <Button
            top="9.677419355%"
            left="88.016528926%"
            color="#5C41FF"
            borderColor="#2400FF"
            label="01"
            width="9.917355372%"
            height="22.580645161%"
            fontSize="3.5vh"
            onClick={() => {
                console.log("fireee");
            }}
            backgroundColor="#2400FF20"
        />
        <Button
            top="38.709677419%"
            left="88.016528926%"
            color="#5C41FF"
            borderColor="#2400FF"
            label="02"
            width="9.917355372%"
            height="22.580645161%"
            fontSize="3.5vh"
            onClick={() => {
                console.log("fireee");
            }}
            backgroundColor="#2400FF20"
        />
        <Button
            top="67.741935484%"
            left="88.016528926%"
            color="#5C41FF"
            borderColor="#2400FF"
            label="03"
            width="9.917355372%"
            height="22.580645161%"
            fontSize="3.5vh"
            onClick={() => {
                console.log("fireee");
            }}
            backgroundColor="#2400FF20"
        />
    </div>
</div>

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
