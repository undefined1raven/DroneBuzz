<script>
    import Button from "../common/Button.svelte";
    import Label from "../common/Label.svelte";
    import EnemyLockDeco from "../deco/EnemyLockDeco.svelte";
    import KillDeco from "../deco/KillDeco.svelte";

    let deadcount;
    let timeString;
    let bestTime;
    let started;
    let fire;
    let killCount = 0;
    let missileLockCount = 0;

    let killCountLabelColor = "#5C41FF";
    let missileLockLabelColor = "#5C0006";

    $: handleKillCountChange(killCount);
    $: enemyLockColorHandler(missileLockCount);

    function handleKillCountChange(killCount) {
        killCountLabelColor = "#BEB4FB";
        setTimeout(() => {
            killCountLabelColor = "#5C41FF";
        }, 250);
    }

    function enemyLockColorHandler(lockCount) {
        if (lockCount > 0) {
            missileLockLabelColor = "#FF4652";
            setTimeout(() => {
                if (lockCount > 0) {
                    missileLockLabelColor = "#FF0010";
                } else {
                    missileLockLabelColor = "#5C0006";
                }
            }, 250);
        } else {
            missileLockLabelColor = "#5C0006";
        }
    }

    function getDynamicBorderRadius(pxRadius) {
        return `${
            (parseFloat(pxRadius * 100) / 360 / 100) *
                document.documentElement.clientHeight +
            "px"
        }`;
    }

    function getRightCurvedBorder() {
        return `border-radius: 0px ${getDynamicBorderRadius(
            5
        )} ${getDynamicBorderRadius(5)} 0px;`;
    }

    function getLeftCurvedBorder() {
        return `border-radius: ${getDynamicBorderRadius(
            5
        )} 0px 0px ${getDynamicBorderRadius(5)};`;
    }
    export {
        timeString,
        deadcount,
        bestTime,
        started,
        fire,
        missileLockCount,
        killCount,
    };
</script>

{#if started}
    <div class="objectiveContainer">
        <div class="currentSurvivalRunTime">
            <Label
                id="currentRunTimer"
                top="83.333333333%"
                left="12.03125%"
                color="#5C41FF"
                borderColor="#2400FF00"
                text={timeString}
                width="9.53125%"
                height="6.111111111%"
                horizontalFont="9px"
                VerticalFont="8px"
                backdropFilter="blur(5px)"
                style="{getLeftCurvedBorder()} border-right: solid 1px #2400FF;"
                backgroundColor="#2400FF20"
            />
            <Label
                id="currentRunLabel"
                top="83.333333333%"
                left="1.71875%"
                color="#5C41FF"
                borderColor="#2400FF00"
                text="Current Run"
                width="9.53125%"
                height="6.111111111%"
                horizontalFont="9px"
                VerticalFont="8px"
                backdropFilter="blur(5px)"
                style="{getRightCurvedBorder()} border-left: solid 1px #2400FF;"
                backgroundColor="#2400FF20"
            />
        </div>
        <div class="enemyLockContainer">
            <Label
                id="enemyLockLabel"
                top="2.777777778%"
                left="1.71875%"
                color={missileLockLabelColor}
                borderColor="#2400FF00"
                text="Enemy Lock [{missileLockCount}]"
                width="9.03125%"
                height="3.055555556%"
                horizontalFont="6px"
                VerticalFont="8px"
                backdropFilter="blur(5px)"
                style="{getRightCurvedBorder()} border-left: solid 1px {missileLockLabelColor}; justify-content: start; padding-left: 0.5%; transition: all linear 0.1s; transition: color linear 0s;"
                backgroundColor="{missileLockLabelColor}20"
                ><EnemyLockDeco
                    color={missileLockLabelColor}
                    size="2vh"
                    style="left: 83%;"
                /></Label
            >
        </div>
        <div class="killCountContainer">
            <Label
                id="killCount"
                top="6.944444444%"
                left="1.71875%"
                color={killCountLabelColor}
                borderColor="#2400FF00"
                text="{killCount} kills"
                width="9.03125%"
                height="3.055555556%"
                horizontalFont="6px"
                VerticalFont="8px"
                backdropFilter="blur(5px)"
                style="{getRightCurvedBorder()} border-left: solid 1px {killCountLabelColor}; justify-content: start; padding-left: 0.5%; transition: all linear 0.1s; transition: color linear 0s;"
                backgroundColor="{killCountLabelColor}20"
                ><KillDeco
                    color={killCountLabelColor}
                    size="2.5vh"
                    style="left: 83%;"
                /></Label
            >
        </div>
        <div class="bestSurvivalRunTime">
            <Label
                id="bestRunTimer"
                top="91.111111111%"
                left="12.03125%"
                color="#5C41FF"
                borderColor="#2400FF00"
                text={bestTime}
                width="9.53125%"
                height="6.111111111%"
                horizontalFont="9px"
                VerticalFont="8px"
                backdropFilter="blur(5px)"
                style="{getLeftCurvedBorder()} border-right: solid 1px #2400FF;"
                backgroundColor="#2400FF20"
            />
            <Label
                id="bestRunLabel"
                top="91.111111111%"
                left="1.71875%"
                color="#5C41FF"
                borderColor="#2400FF00"
                text="Best Run"
                width="9.53125%"
                height="6.111111111%"
                horizontalFont="9px"
                VerticalFont="8px"
                backdropFilter="blur(5px)"
                style="{getRightCurvedBorder()} border-left: solid 1px #2400FF;"
                backgroundColor="#2400FF20"
            />
        </div>
    </div>
{/if}
