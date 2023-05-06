<script>
    import Button from "./Button.svelte";
    import Label from "./Label.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    let decoThis;
    let decoProps;
    let width;
    let height;
    let displayName;
    let secondaryLabel;
    let selectedWeaponID = "";
    let weaponID = "x";
    let isSelected = weaponID == selectedWeaponID;
    let buttonStyle;
    let style;
    let className;

    $: isSelected = weaponID == selectedWeaponID;

    //Color Hashes
    const primaryLabelColorHash = { true: "#3F1FFF", false: "#2400FF" };
    const buttonColorsHash = {
        true: { border: "#3F1FFF", bkg: "#3F1FFF20" },
        false: { border: "#2400FF", bkg: "#3F1FFF00" },
    };

    export {
        decoThis,
        decoProps,
        width,
        height,
        displayName,
        secondaryLabel,
        isSelected,
        buttonStyle,
        style,
        className,
        weaponID,
        selectedWeaponID,
    };
</script>

<Button
    onClick={() => dispatch("onWeaponSelection", { weaponID: weaponID })}
    style={style ? style : ""}
    className={className ? className : ""}
    borderColor={buttonColorsHash[isSelected].border}
    backgroundColor={buttonColorsHash[isSelected].bkg}
    borderRadius="5px"
    {height}
    {width}
    ><Label
        color={primaryLabelColorHash[isSelected]}
        text={displayName}
        horizontalFont="10px"
        left="4.402515723%"
        top="10%"
        tabletTop="22%"
    /><Label
        color={primaryLabelColorHash[isSelected]}
        text={secondaryLabel ? secondaryLabel : "NDX"}
        horizontalFont="7px"
        left="4.402515723%"
        top="60%"
        tabletTop="57%"
    /><svelte:component this={decoThis} {...decoProps} /></Button
>
