<script>
    import { onMount } from "svelte";

    let started;
    let UAVContactsHash;
    let UAVRadius;

    let minimapHeight;
    let minimapWidth;
    let sweepAniDeg = 0;
    let sweepAniDeg9 = 90;

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
    $: onStartedChange(started);

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

    function onStartedChange(started) {
        if (started) {
            setTimeout(() => {
                minimapHeight = document.getElementById("minimap").clientHeight;
                minimapWidth = document.getElementById("minimap").clientWidth;
            }, 100);
            setInterval(() => {
                if (sweepAniDeg <= 360) {
                    sweepAniDeg++;
                    sweepAniDeg9++;
                    if (sweepAniDeg == 360) {
                        sweepAniDeg = 0;
                    }
                    if (sweepAniDeg9 == 360) {
                        sweepAniDeg9 = 90;
                    }
                }
            }, 10);
        }
    }
    const isTablet = document.documentElement.clientWidth > 1023;

    export { started, UAVContactsHash, UAVRadius };
</script>

{#if started}
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
            style="position: absolute; top: 50%; left: 0%; transform: translate(0, -50%) rotate({sweepAniDeg}deg); width: 100%; height: 0.5vh; background-color: #0500FF01; backdrop-filter: blur(5px); z-index: 150;"
        />
        <div
            style="position: absolute; top: 50%; left: 0%; transform: translate(0, -50%) rotate({-sweepAniDeg}deg); width: 100%; height: 0.5vh; background-color: #0500FF01; backdrop-filter: blur(5px); z-index: 150;"
        />
        <div
            style="position: absolute; top: 50%; left: 0%; transform: translate(0, -50%) rotate({sweepAniDeg9}deg); width: 100%; height: 0.5vh; background-color: #0500FF01; backdrop-filter: blur(5px); z-index: 150;"
        />
        <div
            style="position: absolute; top: 50%; left: 0%; transform: translate(0, -50%) rotate({-sweepAniDeg9}deg); width: 100%; height: 0.5vh; background-color: #0500FF01; backdrop-filter: blur(5px); z-index: 150;"
        />
    </div>
{/if}
