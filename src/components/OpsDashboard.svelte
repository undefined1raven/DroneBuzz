<script>
    import Button from "./Button.svelte";
    let opacity;
    let fire;
    let defensiveFire;
    let counterButtonOpacity;

    export { opacity, fire, defensiveFire, counterButtonOpacity };
</script>

<div class="opsDashboard" style="opacity: {opacity};">
    <Button
        top="20.290322581%"
        left="20.438016529%"
        color="#5C41FF"
        borderColor="#2400FF"
        label="Fire"
        lightColor="#7963FF"
        width="60.0331%"
        height="55.032258065%"
        fontSize="4.2vh"
        onClick={() => {
            fire();
        }}
        backgroundColor="#2400FF20"
    />
    <Button
        top="-45.290322581%"
        left="20.438016529%"
        color="#FF0010"
        borderColor="#FF0010"
        lightColor="#FF00AA"
        label="Deploy Countermeasures"
        width="60.0331%"
        height="55.032258065%"
        fontSize="4.2vh"
        opacity="{counterButtonOpacity}"
        onClick={(e) => {
            defensiveFire();
        }}
        backgroundColor="#FF001020"
    />
</div>

<style>
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
