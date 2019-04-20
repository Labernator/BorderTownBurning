import { IUnit, IMissileWeapon, IArmour, IMeleeWeapon } from "../constants";
import React, { useState } from "react";
import { store } from "..";
import { UPDATE_UNIT, REMOVE_UNIT_FROM_ROSTER, ADD_CAMPAIGN_POINTS } from "../actions";
import { getEquipmentByName, isWeapon, isArmour, isToughUnit } from "../utilities/utils";
import { BitterEnemyDialog } from "./BitterEnemy";

enum InjuryState {
    ShowAll,
    ArmWound,
    Madness,
    SmashedLeg,
    BitterEnemy,
    Captured,
    GetInTheRing,
}

export class HeroInjuriesEnum {
    public static readonly DEAD = new HeroInjuriesEnum("DEAD", "Dead", "11 - 15 DEAD (removed from roster)");
    public static readonly LEGWOUND = new HeroInjuriesEnum("LEGWOUND", "Leg Wound", "22 Leg Wound (-1 Movement)");
    public static readonly ARMWOUND = new HeroInjuriesEnum("ARMWOUND", "Arm Wound", "23 Arm Wound (Choose Again)");
    public static readonly ARMWOUND_AMPUTATION = new HeroInjuriesEnum("ARMWOUND_AMPUTATION", "Arm Wound", "Arm Wound - Amputate Arm");
    public static readonly ARMWOUND_MISS = new HeroInjuriesEnum("ARMWOUND_MISS", "Arm Wound", "Arm Wound - Misses next game");
    public static readonly MADNESS = new HeroInjuriesEnum("MADNESS", "Madness", "24 Madness (Choose Again)");
    public static readonly MADNESS_FRENZY = new HeroInjuriesEnum("MADNESS_FRENZY", "Madness", "Madness - Is Frenzied from now on");
    public static readonly MADNESS_STUPIDITY = new HeroInjuriesEnum("MADNESS_STUPIDITY", "Madness", "Madness - Is Stupid from now on");
    public static readonly SMASHEDLEG = new HeroInjuriesEnum("SMASHEDLEG", "Smashed Leg", "25 Smashed Leg (Choose Again)");
    public static readonly SMASHEDLEG_RUNNING = new HeroInjuriesEnum("SMASHEDLEG_RUNNING", "Smashed Leg", "Smashed Leg - The hero may not run anymore.");
    public static readonly SMASHEDLEG_MISS = new HeroInjuriesEnum("SMASHEDLEG_MISS", "Smashed Leg", "Smashed Leg - Misses next game");
    public static readonly CHESTWOUND = new HeroInjuriesEnum("CHESTWOUND", "Chest Wound", "26 Chest Wound (-1 Toughness)");
    public static readonly BLINDEDINONEEYE = new HeroInjuriesEnum("BLINDEDINONEEYE", "Blinded in one Eye", "31 Blinded in one Eye (-1 Ballistic Skill)");
    public static readonly OLDBATTLEWOUND = new HeroInjuriesEnum("OLDBATTLEWOUND", "Old Battle Wound", "32 Old battle Wound (Roll D6 before every battle: 1 = miss this battle)");
    public static readonly NERVOUSCONDITION = new HeroInjuriesEnum("NERVOUSCONDITION", "Nervous Condition", "33 Nervous Condition (-1 Initiative)");
    public static readonly HANDINJURY = new HeroInjuriesEnum("HANDINJURY", "Hand Injury", "34 Hand Injury (-1 Weapon Skill)");
    public static readonly DEEPWOUND = new HeroInjuriesEnum("DEEPWOUND", "Deep Wound", "35 Deep Wound (Hero must miss the next D3 games.)");
    public static readonly ROBBED = new HeroInjuriesEnum("ROBBED", "Robbed", "36 Robbed (Hero loses weapons, armour and all other equipment)");
    public static readonly FULLRECOVERY = new HeroInjuriesEnum("FULLRECOVERY", "Full Recovery", "41 - 55 Full Recovery (no Effect)");
    public static readonly BITTERENEMY = new HeroInjuriesEnum("BITTERENEMY", "Bitter Enemy", "56 Bitter Enemy (Choose Again)");
    public static readonly BITTERENEMY_INPUT = new HeroInjuriesEnum("BITTERENEMY_INPUT", "Bitter Enemy", "Enter the name of what the warrior hates from now on:");
    public static readonly CAPTURED = new HeroInjuriesEnum("CAPTURED", "Captured", "61 Captured (Choose Again)");
    public static readonly CAPTURED_BOUGHT_BACK = new HeroInjuriesEnum("CAPTURED_BOUGHT_BACK", "Captured", "Captured - The hero is bought back.");
    public static readonly CAPTURED_LOST = new HeroInjuriesEnum("CAPTURED_LOST", "Captured", "Captured - The hero is lost.");
    public static readonly HARDENED = new HeroInjuriesEnum("HARDENED", "Hardened", "62 - 63 Hardened (Immune to Fear from now on)");
    public static readonly HORRIBLESCARS = new HeroInjuriesEnum("HORRIBLESCARS", "Horrible Scars", "64 Horrible Scars (Causes Fear from now on)");
    public static readonly GETINTHERING = new HeroInjuriesEnum("GETINTHERING", "Get In the Ring", "65 Get In the Ring (Choose again)");
    public static readonly GETINTHERING_WIN = new HeroInjuriesEnum("GETINTHERING_WIN", "Get In the Ring", "Your hero won the fight (gain +1 CP, +2 EXP, Blackblood Mutation");
    public static readonly GETINTHERING_LOSS_SURVIVED = new HeroInjuriesEnum(
        "GETINTHERING_LOSS_SURVIVED",
        "Get In the Ring",
        "Your hero lost the fight, but survived. He loses his weapons and armour.",
    );
    public static readonly GETINTHERING_LOSS_KILLED = new HeroInjuriesEnum(
        "GETINTHERING_LOSS_KILLED",
        "Get In the Ring",
        "Your hero lost the fight, and died. He is removed from the warband roster.",
    );
    public static readonly SURVIVED = new HeroInjuriesEnum("SURVIVED", "Survives against the odds", "66 Survives against the odds (+1 Experience)");
    public static readonly MISSESNEXTGAME = new HeroInjuriesEnum("MISSESNEXTGAME", "Misses Next Game", "");

    public static getBasicProps() {
        return [
            this.DEAD,
            this.LEGWOUND,
            this.ARMWOUND,
            this.MADNESS,
            this.SMASHEDLEG,
            this.CHESTWOUND,
            this.BLINDEDINONEEYE,
            this.OLDBATTLEWOUND,
            this.NERVOUSCONDITION,
            this.HANDINJURY,
            this.DEEPWOUND,
            this.ROBBED,
            this.FULLRECOVERY,
            this.BITTERENEMY,
            this.CAPTURED,
            this.HARDENED,
            this.HORRIBLESCARS,
            this.GETINTHERING,
            this.SURVIVED,
        ];
    }
    public static getToughUnitProps() {
        return [
            this.DEAD,
            this.LEGWOUND,
            this.ARMWOUND,
            this.MADNESS,
            this.SMASHEDLEG,
            this.CHESTWOUND,
            this.BLINDEDINONEEYE,
            this.OLDBATTLEWOUND,
            this.NERVOUSCONDITION,
            this.HANDINJURY,
            this.DEEPWOUND,
            this.FULLRECOVERY,
        ];
    }
    public static getArmWoundProps() {
        return [
            this.ARMWOUND_AMPUTATION,
            this.ARMWOUND_MISS,
        ];
    }
    public static getMadnessProps() {
        return [
            this.MADNESS_FRENZY,
            this.MADNESS_STUPIDITY,
        ];
    }
    public static getSmashedLegProps() {
        return [
            this.SMASHEDLEG_RUNNING,
            this.SMASHEDLEG_MISS,
        ];
    }
    public static getBitterEnemyProps() {
        return [
            this.BITTERENEMY_INPUT,
        ];
    }
    public static getCapturedProps() {
        return [
            this.CAPTURED_BOUGHT_BACK,
            this.CAPTURED_LOST,
        ];
    }
    public static getRingProps() {
        return [
            this.GETINTHERING_WIN,
            this.GETINTHERING_LOSS_SURVIVED,
            this.GETINTHERING_LOSS_KILLED,
        ];
    }
    // private to disallow creating other instances of this type
    private constructor(private readonly key: string, public readonly value: string, public readonly text: string) {
    }

    public toString() {
        return this.key;
    }
}

export const HeroInjuriesDialog = ({ unit, callback, update }: { unit: IUnit; callback: any; update: any }) => {
    const [mode, setMode] = useState(InjuryState.ShowAll);
    const handleBtnClick = (event: any, dispatchCase: string, inputValue?: string) => {
        const injuries: string[] = unit.injuries === undefined ? [] : unit.injuries;
        const skills: string[] = unit.skills === undefined ? [] : unit.skills;
        switch (dispatchCase) {
            case HeroInjuriesEnum.DEAD.toString():
            case HeroInjuriesEnum.GETINTHERING_LOSS_KILLED.toString():
            case HeroInjuriesEnum.CAPTURED_LOST.toString():
                store.dispatch({ type: REMOVE_UNIT_FROM_ROSTER, payload: unit });
                callback();
                update(unit);
                break;
            case HeroInjuriesEnum.LEGWOUND.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.LEGWOUND.value],
                        characteristics: { ...unit.characteristics, Movement: unit.characteristics.Movement - 1 },
                    },
                });
                callback();
                update(unit);
                break;
            case HeroInjuriesEnum.ARMWOUND.toString():
                setMode(InjuryState.ArmWound);
                break;
            case HeroInjuriesEnum.ARMWOUND_AMPUTATION.toString():
                store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, injuries: [...injuries, HeroInjuriesEnum.ARMWOUND.value] } });
                callback();
                update(unit);
                break;
            case HeroInjuriesEnum.ARMWOUND_MISS.toString():
                store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, injuries: [...injuries, HeroInjuriesEnum.MISSESNEXTGAME.value] } });
                callback();
                update(unit);
                break;
            case HeroInjuriesEnum.MADNESS.toString():
                setMode(InjuryState.Madness);
                break;
            case HeroInjuriesEnum.MADNESS_FRENZY.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.MADNESS_FRENZY.value],
                        skills: [...skills, "Frenzy"],
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.MADNESS_STUPIDITY.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.MADNESS_STUPIDITY.value],
                        skills: [...skills, "Stupidity"],
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.SMASHEDLEG.toString():
                setMode(InjuryState.SmashedLeg);
                break;
            case HeroInjuriesEnum.SMASHEDLEG_RUNNING.toString():
                store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, injuries: [...injuries, HeroInjuriesEnum.SMASHEDLEG_RUNNING.value] } });
                callback();
                break;
            case HeroInjuriesEnum.SMASHEDLEG_MISS.toString():
                store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, injuries: [...injuries, HeroInjuriesEnum.MISSESNEXTGAME.value] } });
                callback();
                break;
            case HeroInjuriesEnum.CHESTWOUND.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.CHESTWOUND.value],
                        characteristics: { ...unit.characteristics, Toughness: unit.characteristics.Toughness - 1 },
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.BLINDEDINONEEYE.toString():
                if (unit.injuries !== undefined && unit.injuries.includes(HeroInjuriesEnum.BLINDEDINONEEYE.value)) {
                    store.dispatch({ type: REMOVE_UNIT_FROM_ROSTER, payload: unit });
                } else {
                    store.dispatch({
                        type: UPDATE_UNIT,
                        payload: {
                            ...unit,
                            injuries: [...injuries, HeroInjuriesEnum.BLINDEDINONEEYE.value],
                            characteristics: { ...unit.characteristics, BallisticSkill: unit.characteristics.BallisticSkill - 1 },
                        },
                    });
                }
                callback();
                break;
            case HeroInjuriesEnum.OLDBATTLEWOUND.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.OLDBATTLEWOUND.value],
                        skills: [...skills, HeroInjuriesEnum.OLDBATTLEWOUND.value],
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.NERVOUSCONDITION.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.NERVOUSCONDITION.value],
                        characteristics: { ...unit.characteristics, Initiative: unit.characteristics.Initiative - 1 },
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.HANDINJURY.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.HANDINJURY.value],
                        characteristics: { ...unit.characteristics, WeaponSkill: unit.characteristics.WeaponSkill - 1 },
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.DEEPWOUND.toString():
                store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, injuries: [...injuries, HeroInjuriesEnum.DEEPWOUND.value] } });
                callback();
                break;
            case HeroInjuriesEnum.ROBBED.toString():
                store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, equipment: [] } });
                callback();
                break;
            case HeroInjuriesEnum.BITTERENEMY.toString():
                setMode(InjuryState.BitterEnemy);
                break;
            case HeroInjuriesEnum.BITTERENEMY_INPUT.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        skills: [...skills, `${HeroInjuriesEnum.BITTERENEMY.value} (${inputValue})`],
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.CAPTURED.toString():
                setMode(InjuryState.Captured);
                break;
            case HeroInjuriesEnum.CAPTURED_BOUGHT_BACK.toString():
                store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, injuries: [...injuries, HeroInjuriesEnum.CAPTURED.value] } });
                callback();
                break;
            case HeroInjuriesEnum.HARDENED.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.HARDENED.value],
                        skills: [...skills, "Immune to Fear"],
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.HORRIBLESCARS.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.HORRIBLESCARS.value],
                        skills: [...skills, "Fear"],
                    },
                });
                callback();
                break;
            case HeroInjuriesEnum.GETINTHERING.toString():
                setMode(InjuryState.GetInTheRing);
                break;
            case HeroInjuriesEnum.GETINTHERING_WIN.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        experience: unit.experience + 1,
                        skills: [...skills, "Blackblood"],
                    },
                });
                store.dispatch({
                    type: ADD_CAMPAIGN_POINTS,
                    payload: 1,
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
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        equipment: survivedEquipment,
                    },
                });
                store.dispatch({
                    type: ADD_CAMPAIGN_POINTS,
                    payload: 1,
                });
                callback();
                break;
            case HeroInjuriesEnum.SURVIVED.toString():
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: {
                        ...unit,
                        injuries: [...injuries, HeroInjuriesEnum.SURVIVED.value],
                        experience: unit.experience + 1,
                    },
                });
                callback();
                break;
            default: // unit recovered
                console.log(store.getState());
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
            case InjuryState.Captured:
                return HeroInjuriesEnum.getCapturedProps();
            case InjuryState.GetInTheRing:
                return HeroInjuriesEnum.getRingProps();
            default:
                return [];
        }
    };
    const injuryList: HeroInjuriesEnum[] = getInjuryList();

    const renderDivs = injuryList.map((injury) => {
        if (injury === HeroInjuriesEnum.BITTERENEMY_INPUT) {
            return <BitterEnemyDialog id={`${unit.name}BitterEnemy`} btnClick={handleBtnClick}></BitterEnemyDialog>;
        } else {
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
