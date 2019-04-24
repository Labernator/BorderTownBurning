import { IUnit, InjuryState, HeroInjuriesEnum } from "../../constants";
import React, { useState } from "react";
import { store } from "../..";
import { UPDATE_UNIT, REMOVE_UNIT_FROM_ROSTER, ADD_CAMPAIGN_POINTS, SUBTRACT_MONEY_FROM_TREASURY } from "../../actions";
import { getEquipmentByName, isWeapon, isArmour, isToughUnit } from "../../utilities/utils";
import { BitterEnemyDialog } from "./BitterEnemy";
import { DeepWoundDialog } from "./DeepWound";
import { CapturedDialog } from "./Captured";

export const HeroInjuriesDialog = ({ unit, callback, update }: { unit: IUnit; callback: any; update: any }) => {
    const [mode, setMode] = useState(InjuryState.ShowAll);
    const handleBtnClick = (event: any, dispatchCase: string, inputValue?: string) => {
        const injuries: string[] = unit.injuries === undefined ? [] : unit.injuries;
        const skills: string[] = unit.skills === undefined ? [] : unit.skills;
        switch (dispatchCase) {
            case HeroInjuriesEnum.DEAD.toString():
            case HeroInjuriesEnum.GETINTHERING_LOSS_KILLED.toString():
            case HeroInjuriesEnum.CAPTURED_LOST.toString():
                update({
                    updatingUnit: unit,
                    types: [REMOVE_UNIT_FROM_ROSTER],
                    payload: [unit],
                    injuryString: `${unit.name} (${unit.type}) was killed`,
                });
                callback();
                break;
            case HeroInjuriesEnum.LEGWOUND.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.LEGWOUND.value],
                        characteristics: { ...unit.characteristics, Movement: unit.characteristics.Movement - 1 },
                    }],
                    injuryString: `${unit.name} (${unit.type}) has sustained a leg wound and lost 1 movement`,
                });
                callback();
                break;
            case HeroInjuriesEnum.ARMWOUND.toString():
                setMode(InjuryState.ArmWound);
                break;
            case HeroInjuriesEnum.ARMWOUND_AMPUTATION.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.ARMWOUND_AMPUTATION.value],
                    }],
                    injuryString: `${unit.name} (${unit.type}) has lost an arm.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.SMASHEDLEG_MISS.toString():
            case HeroInjuriesEnum.ARMWOUND_MISS.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.MISSESNEXTGAME.value],
                    }],
                    injuryString: `${unit.name} (${unit.type}) will miss the next game.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.MADNESS.toString():
                setMode(InjuryState.Madness);
                break;
            case HeroInjuriesEnum.MADNESS_FRENZY.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.MADNESS_FRENZY.value],
                        skills: [...skills, "Frenzy"],
                    }],
                    injuryString: `${unit.name} (${unit.type}) has gone mad and is frenzied from now on.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.MADNESS_STUPIDITY.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.MADNESS_STUPIDITY.value],
                        skills: [...skills, "Stupidity"],
                    }],
                    injuryString: `${unit.name} (${unit.type}) has gone mad and is stupid from now on.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.SMASHEDLEG.toString():
                setMode(InjuryState.SmashedLeg);
                break;
            case HeroInjuriesEnum.SMASHEDLEG_RUNNING.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        skills: [...skills, HeroInjuriesEnum.SMASHEDLEG.value],
                        injuries: [...injuries, HeroInjuriesEnum.SMASHEDLEG_RUNNING.value],
                    }],
                    injuryString: `${unit.name} (${unit.type}) has a smashed leg and cannot run anymore.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.CHESTWOUND.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.CHESTWOUND.value],
                        characteristics: { ...unit.characteristics, Toughness: unit.characteristics.Toughness - 1 },
                    }],
                    injuryString: `${unit.name} (${unit.type}) has sustained a chest wound and lost 1 toughness`,
                });
                callback();
                break;
            case HeroInjuriesEnum.BLINDEDINONEEYE.toString():
                if (unit.injuries !== undefined && unit.injuries.includes(HeroInjuriesEnum.BLINDEDINONEEYE.value)) {
                    update({
                        updatingUnit: unit,
                        types: [REMOVE_UNIT_FROM_ROSTER],
                        payload: [unit],
                        injuryString: `${unit.name} (${unit.type}) was blinded in both eyes and has to retire.`,
                    });
                } else {
                    update({
                        updatingUnit: unit,
                        types: [UPDATE_UNIT],
                        payload: [{
                            ...unit,
                            injuries: [...injuries, HeroInjuriesEnum.BLINDEDINONEEYE.value],
                            characteristics: { ...unit.characteristics, BallisticSkill: unit.characteristics.BallisticSkill - 1 },
                        }],
                        injuryString: `${unit.name} (${unit.type}) has lost and eye and 1 ballistic skill.`,
                    });
                }
                callback();
                break;
            case HeroInjuriesEnum.OLDBATTLEWOUND.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.OLDBATTLEWOUND.value],
                        skills: [...skills, HeroInjuriesEnum.OLDBATTLEWOUND.value],
                    }],
                    injuryString: `${unit.name} (${unit.type}) was hit on an old battle wound and will now have to check every battle.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.NERVOUSCONDITION.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.NERVOUSCONDITION.value],
                        characteristics: { ...unit.characteristics, Initiative: unit.characteristics.Initiative - 1 },
                    }],
                    injuryString: `${unit.name} (${unit.type}) has sustained a nervous condition and lost 1 initiative`,
                });
                callback();
                break;
            case HeroInjuriesEnum.HANDINJURY.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.HANDINJURY.value],
                        characteristics: { ...unit.characteristics, WeaponSkill: unit.characteristics.WeaponSkill - 1 },
                    }],
                    injuryString: `${unit.name} (${unit.type}) has sustained a hand injury and lost 1 toughness`,
                });
                callback();
                break;
            case HeroInjuriesEnum.DEEPWOUND.toString():
                setMode(InjuryState.DeepWound);
                break;
            case HeroInjuriesEnum.DEEP_WOUND_INPUT.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, `Misses next ${inputValue} games`],
                    }],
                    injuryString: `${unit.name} (${unit.type}) has sustained a deep wound and will miss the next ${inputValue} games.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.ROBBED.toString():
                update({
                    updatingUnit: unit,
                    type: [UPDATE_UNIT],
                    payload: [{ ...unit, equipment: [] }],
                    injuryString: `${unit.name} (${unit.type}) was robbed and lost all inventory (weapons, armour, other equipment).`,
                });
                callback();
                break;
            case HeroInjuriesEnum.BITTERENEMY.toString():
                setMode(InjuryState.BitterEnemy);
                break;
            case HeroInjuriesEnum.BITTER_ENEMY_INPUT.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        skills: [...skills, `${HeroInjuriesEnum.BITTER_ENEMY_INPUT.value} (${inputValue})`],
                    }],
                    injuryString: `${unit.name} (${unit.type}) now is the bitter enemy of ${inputValue}.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.CAPTURED.toString():
                setMode(InjuryState.Captured);
                break;
            case HeroInjuriesEnum.CAPTURED_BOUGHT_BACK.toString():
                setMode(InjuryState.CapturedDialog);
                break;
            case HeroInjuriesEnum.CAPTURED_INPUT.toString():
                const costs = inputValue !== undefined ? parseInt(inputValue, 10) : 0;
                update({
                    updatingUnit: unit,
                    types: [SUBTRACT_MONEY_FROM_TREASURY],
                    payload: [costs],
                    injuryString: `${unit.name} (${unit.type}) was captured and bought back for ${inputValue}.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.HARDENED.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.HARDENED.value],
                        skills: [...skills, "Immune to Fear"],
                    }],
                    injuryString: `${unit.name} (${unit.type}) now is Immune to Fear.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.HORRIBLESCARS.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.HORRIBLESCARS.value],
                        skills: [...skills, "Fear"],
                    }],
                    injuryString: `${unit.name} (${unit.type}) now causes Fear.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.GETINTHERING.toString():
                setMode(InjuryState.GetInTheRing);
                break;
            case HeroInjuriesEnum.GETINTHERING_WIN.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT, ADD_CAMPAIGN_POINTS],
                    payload: [{
                        ...unit,
                        experience: unit.experience + 2,
                        skills: [...skills, "Blackblood"],
                    },
                        1,
                    ],
                    injuryString: `${unit.name} (${unit.type}) has slain the Lord of the Pit!`,
                });
                callback();
                break;
            case HeroInjuriesEnum.GETINTHERING_LOSS_SURVIVED.toString():
                const survivedEquipment = unit.equipment !== undefined ? unit.equipment.filter((equi) => {
                    const equip = getEquipmentByName(equi);
                    if (!(isArmour(equip) || isWeapon(equip))) {
                        return equip;
                    }
                }) : [];
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        equipment: survivedEquipment,
                    }],
                    injuryString: `${unit.name} (${unit.type}) was beaten in the pit and lost his weapons and armour.`,
                });
                callback();
                break;
            case HeroInjuriesEnum.SURVIVED.toString():
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.SURVIVED.value],
                        experience: unit.experience + 1,
                    }],
                    injuryString: `${unit.name} (${unit.type}) gained 1 XP for being lucky.`,
                });
                callback();
                break;
            default: // unit recovered
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [unit],
                    injuryString: `${unit.name} (${unit.type}) has fully recovered.`,
                });
                callback();
        }

    };
    const getInjuryList = () => {
        switch (mode) {
            case InjuryState.ShowAll:
                return isToughUnit(unit) ? HeroInjuriesEnum.getToughUnitProps() : HeroInjuriesEnum.getBasicProps();
            case InjuryState.ArmWound:
                return HeroInjuriesEnum.getArmWoundProps();
            case InjuryState.Madness:
                return HeroInjuriesEnum.getMadnessProps();
            case InjuryState.SmashedLeg:
                return HeroInjuriesEnum.getSmashedLegProps();
            case InjuryState.BitterEnemy:
                return HeroInjuriesEnum.getBitterEnemyProps();
            case InjuryState.DeepWound:
                return HeroInjuriesEnum.getDeepWoundProps();
            case InjuryState.Captured:
                return HeroInjuriesEnum.getCapturedProps();
            case InjuryState.GetInTheRing:
                return HeroInjuriesEnum.getRingProps();
            case InjuryState.CapturedDialog:
                return HeroInjuriesEnum.getCapturedDialogProps();
            default:
                return [];
        }
    };
    const injuryList: HeroInjuriesEnum[] = getInjuryList();

    const renderDivs = injuryList.map((injury) => {
        switch (injury) {
            case HeroInjuriesEnum.BITTER_ENEMY_INPUT:
                return <BitterEnemyDialog id={`${unit.name}BitterEnemy`} btnClick={handleBtnClick}></BitterEnemyDialog>;
            case HeroInjuriesEnum.DEEP_WOUND_INPUT:
                return <DeepWoundDialog id={`${unit.name}DeepWound`} btnClick={handleBtnClick}></DeepWoundDialog>;
            case HeroInjuriesEnum.CAPTURED_INPUT:
                return <CapturedDialog id={`${unit.name}Captured`} btnClick={handleBtnClick}></CapturedDialog>;
            default:
                return (
                    <div key={injury.toString()} style={{ display: "grid" }}>
                        <button
                            onClick={(e) => handleBtnClick(e, injury.toString())}
                            className="heroInjuryButton">
                            {injury.text}
                        </button>
                    </div>
                );
        }
    });
    return (
        <div style={{ display: "inline-table", width: "100%" }}>
            {renderDivs}
        </div>
    );
};
