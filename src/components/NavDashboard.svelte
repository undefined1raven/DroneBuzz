<script>
    import Button from "./Button.svelte";

    let opacity;
    export { opacity };
</script>

<div class="navDashboard" style="opacity: {opacity};" />

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
