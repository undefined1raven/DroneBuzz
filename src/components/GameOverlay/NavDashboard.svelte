<script>
    import Button from "../common/Button.svelte";

    let started;
    export { started };
</script>

{#if started}
    <div class="navDashboard" />
{/if}

<style>
    .navDashboard {
        position: absolute;
        top: 76%; /*82.777777778*/
        left: 38.28125%;
        width: 23.4375%;
        height: 24%; /*17.222222222*/
        background-color: #0c001c00;
        backdrop-filter: blur(0px);
        border-radius: 5px 5px 0px 0px;
    }
</style>
