<script>
    import { getDynamicBorderRadius } from "../../fn/dynamicBorders";
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let show = false;
    export { show };
</script>

{#if show}
    <div class="waypointEditorContainer">
        <div
        on:click={() => dispatch('setWaypointEditor', false)}
            class="waypointsContainer"
            style="border-radius: {getDynamicBorderRadius(5)}"
        />
    </div>
{/if}

<style>
    .waypointsContainer {
        position: absolute;
        top: 3.333333333%;
        left: 1.875%;
        width: 18.59375%;
        height: 83.055555556%;
        background-color: #2400ff20;
        backdrop-filter: blur(5px);
    }
</style>
