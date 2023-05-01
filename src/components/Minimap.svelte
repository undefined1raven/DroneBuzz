<script>
    import { onMount, onDestroy } from "svelte";

    let show;
    let UAVContactsHash;
    let UAVRadius;

    let minimapHeight;
    let minimapWidth;
    let sweepAniSize = 0;
    let aniInterval;

    function addContactToMinimap(top, left) {
        let contact = document.createElement("img");
        contact.src = "./visual_assets/ContactPing.svg";
        contact.style.width = "1vh";
        contact.style.height = "1vh";
        contact.style.position = "absolute";
        contact.style.left = left;
        contact.style.top = top;
        contact.className = "UAVPing";
        document.getElementById("minimap").append(contact);
    }

    $: onNewContacts(UAVContactsHash);
    $: onShowChange(show);

    function onNewContacts(UAVContactsHash) {
        for (let ping in UAVContactsHash) {
            const contact = UAVContactsHash[ping];
            let absX = Math.abs((minimapWidth * contact.dlng) / UAVRadius);
            let absY = Math.abs((minimapWidth * contact.dlat) / UAVRadius);
            let left = 0;
            let top = 0;
            if (contact.dlng >= 0) {
                left = minimapWidth / 2 - absX;
            } else {
                left = minimapWidth / 2 + absX;
            }

            if (contact.dlat >= 0) {
                top = minimapWidth / 2 + absY;
            } else {
                top = minimapWidth / 2 - absY;
            }
            addContactToMinimap(`${top}px`, `${left}px`);
        }
    }

    onDestroy(() => {
        clearInterval(aniInterval);
    });

    function onShowChange(show) {
        if (show) {
            setTimeout(() => {
                minimapHeight = document.getElementById("minimap").clientHeight;
                minimapWidth = document.getElementById("minimap").clientWidth;
            }, 100);
            aniInterval = setInterval(() => {
                if (sweepAniSize <= 100) {
                    sweepAniSize++;
                    if (sweepAniSize == 100) {
                        sweepAniSize = 0;
                    }
                }
            }, 10);
        }
    }
    const isTablet = document.documentElement.clientWidth > 1023;

    export { show, UAVContactsHash, UAVRadius };
</script>

{#if show}
    <div
        id="minimap"
        style="
position: absolute; 
top: 1.111111111%; 
left: {isTablet ? '80%' : '86.875%'}; 
width: 22.2222vh; 
height: 22.2222vh; 
background-color: #2400FF20; 
backdrop-filter: blur(5px);
border-radius: 1000px;
overflow: hidden;"
    >
        <div
            style="position: absolute; top: 0%; left: 50%; transform: translate(-50%); height: 100%; width: 0.1vh; background-color: #0500FF;"
        />
        <div
            style="position: absolute; top: 50%; left: 0%; transform: translate(0, -50%); width: 100%; height: 0.1vh; background-color: #0500FF;"
        />
        <div
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: {sweepAniSize}%; height: {sweepAniSize}%; background-color: #0500FF00; z-index: 150; border-radius: 1000px; border: solid 1px #0500FF50"
        />
    </div>
{/if}
