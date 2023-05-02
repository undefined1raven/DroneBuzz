<script>
    import Button from "../common/Button.svelte";
    let started;
    let fire;
    let defensiveFire;
    let isHunted;

    export { started, fire, defensiveFire, isHunted };
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
{/if}

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
