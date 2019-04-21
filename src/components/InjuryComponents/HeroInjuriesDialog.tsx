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
                });
                callback();
                update(unit);
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
                });
                callback();
                update(unit);
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
                });
                callback();
                update(unit);
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
                });
                callback();
                break;
            case HeroInjuriesEnum.BLINDEDINONEEYE.toString():
                if (unit.injuries !== undefined && unit.injuries.includes(HeroInjuriesEnum.BLINDEDINONEEYE.value)) {
                    update({
                        updatingUnit: unit,
                        types: [REMOVE_UNIT_FROM_ROSTER],
                        payload: [unit],
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
                });
                callback();
                break;
            case HeroInjuriesEnum.ROBBED.toString():
                store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, equipment: [] } });
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
                });
                callback();
                break;
            case HeroInjuriesEnum.GETINTHERING_LOSS_SURVIVED.toString():
                const survivedEquipment = unit.equipment.filter((equi) => {
                    const equip = getEquipmentByName(equi);
                    if (!(isArmour(equip) || isWeapon(equip))) {
                        return equip;
                    }
                });
                update({
                    updatingUnit: unit,
                    types: [UPDATE_UNIT],
                    payload: [{
                        ...unit,
                        equipment: survivedEquipment,
                    }],
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
                });
                callback();
                break;
            default: // unit recovered
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
