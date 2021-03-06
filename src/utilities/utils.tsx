import React from "react";
import { store } from "..";
import { IEquipment, IArmour, IArmy, IMeleeWeapon, IMiscallaneous, IMissileWeapon, IUnit, IRacialMaximums, ISkillList, ISkill } from "../constants";
import * as ArmyJson from "../constants/Armies.json";
import * as SkillsJson from "../constants/Skills.json";
import * as MaxJson from "../constants/RacialMaximums.json";
import * as EquipmentJson from "../constants/Equipment.json";
const ArmyList = ArmyJson.armies as IArmy[];
const SkillLists = SkillsJson.SkillLists as ISkillList[];
const RacialMaximums = MaxJson.maximums as IRacialMaximums[];
const MeleeEquipment = EquipmentJson.equipment[0].MeleeWeapons as IMeleeWeapon[];
const RangeEquipment = EquipmentJson.equipment[1].MissileWeapons as IMissileWeapon[];
const ArmourEquipment = EquipmentJson.equipment[2].Armour as IArmour[];
const MiscallaneousEquipment = EquipmentJson.equipment[3].Miscallaneous as IMiscallaneous[];
export const getMeleeWeapons = (): IMeleeWeapon[] => MeleeEquipment;
export const getMissileWeapons = (): IMissileWeapon[] => RangeEquipment;
export const getArmours = (): IArmour[] => ArmourEquipment;
export const getMisc = (): IMiscallaneous[] => MiscallaneousEquipment;
export const getArmyList = (): string[] => ArmyList.map((army) => army.type);

export const printStringArray = (array: string[]) => array.join(", ");

export const filterMeleeWeapons = (filterList: string[]): IMeleeWeapon[] => {
    const MeleeWeapons = getMeleeWeapons();
    return MeleeWeapons.length > 0 ? MeleeWeapons.filter((weapon) => filterList.includes(weapon.type)) : [];
};

export const filterMissileWeapons = (filterList: string[]): IMissileWeapon[] => {
    const MissileEquipment = getMissileWeapons();
    return MissileEquipment.length > 0 ? MissileEquipment.filter((weapon) => filterList.includes(weapon.type)) : [];
};

export const filterArmour = (filterList: string[]): IArmour[] => {
    const Armour = getArmours();
    return Armour.length > 0 ? Armour.filter((armour) => filterList.includes(armour.type)) : [];
};

const getUnitMaximums = (unit: IUnit) => {
    const originalUnit = getUnit(unit.type);
    const maximums = RacialMaximums.find((max) => max.type === unit.race);
    if (maximums !== undefined) {
        if (!unit.isHero && originalUnit !== undefined) {
            return {
                characteristics: {
                    Movement: unit.characteristics.Movement,
                    WeaponSkill: Math.min(maximums.characteristics.WeaponSkill, originalUnit.characteristics.WeaponSkill + 1),
                    BallisticSkill: Math.min(maximums.characteristics.BallisticSkill, originalUnit.characteristics.BallisticSkill + 1),
                    Strength: Math.min(maximums.characteristics.Strength, originalUnit.characteristics.Strength + 1),
                    Toughness: unit.characteristics.Toughness,
                    Wounds: unit.characteristics.Wounds,
                    Initiative: Math.min(maximums.characteristics.Initiative, originalUnit.characteristics.Initiative + 1),
                    Attacks: Math.min(maximums.characteristics.Attacks, originalUnit.characteristics.Attacks + 1),
                    Leadership: Math.min(maximums.characteristics.Leadership, originalUnit.characteristics.Leadership + 1),
                },
            };
        }
    }
    return maximums;
};

export const getAdvanceOptions = (unit: IUnit, onClickFn: any) => (
    checkRacialMaximums(unit).map((item) => {
        if (item.name === "Movement" || (!unit.isHero && (item.name === "Toughness" || item.name === "Wounds"))) {
            return undefined;
        }
        return item.maxReached ? undefined :
            <button
                className="EnabledButton"
                key={`${unit.name}${item.name}`}
                onClick={() => onClickFn(item.name)}>
                {`Add +1 ${item.name}`}
            </button>;
    }));

export const checkRacialMaximums = (unit: IUnit) => {
    const arr = [];
    const maximums = getUnitMaximums(unit);

    if (maximums !== undefined) {
        arr.push({
            name: "Movement",
            maxReached: unit.characteristics.Movement >= maximums.characteristics.Movement ? true : false,
        });
        arr.push({
            name: "WeaponSkill",
            maxReached: unit.characteristics.WeaponSkill >= maximums.characteristics.WeaponSkill ? true : false,
        });
        arr.push({
            name: "BallisticSkill",
            maxReached: unit.characteristics.BallisticSkill >= maximums.characteristics.BallisticSkill ? true : false,
        });
        arr.push({
            name: "Strength",
            maxReached: unit.characteristics.Strength >= maximums.characteristics.Strength ? true : false,
        });
        arr.push({
            name: "Toughness",
            maxReached: unit.characteristics.Toughness >= maximums.characteristics.Toughness ? true : false,
        });
        arr.push({
            name: "Wounds",
            maxReached: unit.characteristics.Wounds >= maximums.characteristics.Wounds ? true : false,
        });
        arr.push({
            name: "Initiative",
            maxReached: unit.characteristics.Initiative >= maximums.characteristics.Initiative ? true : false,
        });
        arr.push({
            name: "Attacks",
            maxReached: unit.characteristics.Attacks >= maximums.characteristics.Attacks ? true : false,
        });
        arr.push({
            name: "Leadership",
            maxReached: unit.characteristics.Leadership >= maximums.characteristics.Leadership ? true : false,
        });
    }
    return arr;
};

export const filterMiscallaneous = (filterList: string[]): IMiscallaneous[] => {
    const MiscEquipment = getMisc();
    const ArmyType = store.getState().armyType;
    return MiscEquipment.reduce((filteredArr, misc) => {
        if (misc.restrictions === undefined) {
            filteredArr = filteredArr.concat(misc);
        } else {
            if (misc.restrictions.exclude !== undefined) {
                const excluded = misc.restrictions.exclude.find((exclude) => exclude === ArmyType);
                if (excluded === undefined) {
                    filteredArr = filteredArr.concat(misc);
                }
            }
            if (misc.restrictions.include !== undefined) {
                const included = misc.restrictions.include.find((exclude) => exclude === ArmyType);
                if (included !== undefined) {
                    filteredArr = filteredArr.concat(misc);
                }
            }
        }
        return filteredArr;
    }, [] as IMiscallaneous[]);
};

export const isToughUnit = (unit: IUnit): boolean => (unit.skills !== undefined && unit.skills.includes("Tough"));

export const isWeapon = (value: IMeleeWeapon | IMissileWeapon | IArmour | IMiscallaneous | undefined): value is IMeleeWeapon => (
    Boolean(value) && (value as Partial<IMeleeWeapon | IMissileWeapon>).weaponType !== undefined
);

export const isArmour = (value: IMeleeWeapon | IMissileWeapon | IArmour | IMiscallaneous | undefined): value is IArmour => (
    Boolean(value) && (value as Partial<IArmour>).armourType !== undefined
);

export const getEquipmentByName = (equipmentName: string): IMeleeWeapon | IMissileWeapon | IArmour | IMiscallaneous | undefined => {
    const MeleeWeapons = getMeleeWeapons();
    const MissileEquipment = getMissileWeapons();
    const Armour = getArmours();
    const MiscEquipment = getMisc();
    const meleeWeapon = MeleeWeapons.find((melee) => melee.type === equipmentName);
    if (meleeWeapon !== undefined) {
        return meleeWeapon;
    }
    const missileWeapon = MissileEquipment.find((missile) => missile.type === equipmentName);
    if (missileWeapon !== undefined) {
        return missileWeapon;
    }
    const foundArmour = Armour.find((armour) => armour.type === equipmentName);
    if (foundArmour !== undefined) {
        return foundArmour;
    }
    const miscEquipment = MiscEquipment.find((misc) => misc.type === equipmentName);
    if (miscEquipment !== undefined) {
        return miscEquipment;
    }
    return undefined;
};

export function getEquipment(equipmentListNames: string[]): IEquipment[] {
    const Army = ArmyList.find((army) => army.type === store.getState().armyType);
    if (Army !== undefined && equipmentListNames.length > 0) {
        return equipmentListNames.reduce((filteredArr, equipmentListName) => {
            const equipmentList = Army.allowedEquipment.find((equiList) => equiList.type === equipmentListName);
            if (equipmentList !== undefined) {
                filteredArr = filteredArr.concat(equipmentList.equipment);
            }
            return filteredArr;
        }, [] as IEquipment[]);
    }
    return [];
}

export function getArmyTreasury(armyType: string): number {
    const Army = ArmyList.find((army) => army.type === armyType);
    if (Army !== undefined) {
        return Army.startingCapital;
    } else {
        return 0;
    }
}

export function getRestrictedObjectiveList(armyType: string): string[] {
    const Army = ArmyList.find((army) => army.type === armyType);
    if (Army !== undefined) {
        return Army.objectives;
    } else {
        return [];
    }
}

export function getRestrictedAlignmentList(armyType: string): string[] {
    const Army = ArmyList.find((army) => army.type === armyType);
    if (Army !== undefined) {
        return Army.alignments;
    } else {
        return [];
    }
}

export function getArmySizeLimit(armyType: string): number {
    const Army = ArmyList.find((army) => army.type === armyType);
    if (Army !== undefined) {
        return Army.sizeLimit;
    } else {
        return 0;
    }
}

export function getUnits(armyType: string): IUnit[] {
    const Army = ArmyList.find((army) => army.type === armyType);
    if (Army !== undefined) {
        return Army.units;
    } else {
        return [];
    }
}

export function getUnit(unitType: string) {
    const units = getUnits(store.getState().armyType);
    return units.find((unit) => unit.type === unitType);
}

export const isUnitSlowWitted = (skills: string[] | undefined) => (skills !== undefined && Boolean(skills.find((skill) => skill === "Slow Witted")));

export const isAdvancing = (isHero: boolean, experience: number, isSlowWitted: boolean) => {
    if (isHero) {
        switch (experience) {
            case isSlowWitted ? 4 : 2:
            case isSlowWitted ? 8 : 4:
            case isSlowWitted ? 12 : 6:
            case isSlowWitted ? 16 : 8:
            case isSlowWitted ? 22 : 11:
            case isSlowWitted ? 28 : 14:
            case isSlowWitted ? 34 : 17:
            case isSlowWitted ? 40 : 20:
            case isSlowWitted ? 48 : 24:
            case isSlowWitted ? 56 : 28:
            case isSlowWitted ? 64 : 32:
            case isSlowWitted ? 72 : 36:
            case isSlowWitted ? 82 : 41:
            case isSlowWitted ? 92 : 46:
            case isSlowWitted ? 102 : 51:
            case isSlowWitted ? 114 : 57:
            case isSlowWitted ? 126 : 63:
            case isSlowWitted ? 138 : 69:
            case isSlowWitted ? 152 : 76:
            case isSlowWitted ? 166 : 83:
            case isSlowWitted ? 180 : 90: return true;
            default: return false;
        }
    } else {
        switch (experience) {
            case isSlowWitted ? 4 : 2:
            case isSlowWitted ? 10 : 5:
            case isSlowWitted ? 18 : 9:
            case isSlowWitted ? 28 : 14: return true;
            default: return false;
        }
    }
};

export const getNumberOfWarbandMembers = (warbandRoster: IUnit[]) => {
    let unitCount = 0;
    warbandRoster.map((unit) => {
        if (!unit.isHiredSword && (unit.isHero || unit.number === undefined)) {
            unitCount++;
        } else if (unit.number !== undefined) {
            unitCount += unit.number;
        }
    });
    return unitCount;
};

export const getTotalNumberOfWarbandMembers = (warbandRoster: IUnit[]) => {
    let unitCount = 0;
    warbandRoster.map((unit) => {
        if (unit.isHero || unit.number === undefined) {
            unitCount++;
        } else if (unit.number !== undefined) {
            unitCount += unit.number;
        }
    });
    return unitCount;
};

export const getHeroCount = () => (store.getState().warbandRoster.filter((unit) => (unit.isHero && !unit.isHiredSword)).length);

export const getSkills = (unit: IUnit) => {
    if (unit.skillLists === undefined) {
        return undefined;
    }
    const skills = unit.skillLists.reduce((acc: ISkill[], listname) => {
        const listOfSkills = getSkillsForList(listname);
        return acc.concat(listOfSkills);
    }, []);
    const filteredSkills = skills.filter((skill) => {
        let keep = true;
        // filter out all skills that the unit already has
        if (unit.skills !== undefined) {
            keep = !unit.skills.includes(skill.name);
        }
        // check if the prerequisites are met
        if (keep) {
            keep = checkSkillPrerequisites(skill, unit);
        }
        return keep;
    });
    return filteredSkills;
};

const getSkillsForList = (listName: string) => (SkillLists.reduce((acc: ISkill[], list) => {
    if (list.name === listName) {
        acc = list.list;
    }
    return acc;
}, []));

const checkSkillPrerequisites = (skill: ISkill, unit: IUnit) => {
    if (skill.prerequisite !== undefined) {
        if (skill.prerequisite.type === "characteristic" && skill.prerequisite.lookup !== undefined && typeof (skill.prerequisite.lookup) === "string") {
            return unit.characteristics[skill.prerequisite.lookup] >= skill.prerequisite.condition;
        }
        if (skill.prerequisite.type === "skill" && skill.prerequisite.lookup !== undefined && typeof (skill.prerequisite.lookup) === "string" && unit.skills !== undefined) {
            if (typeof (skill.prerequisite.condition) === "number") {
                const skillObjects = getSkillsForList(skill.prerequisite.lookup);
                const skillCount = skillObjects.filter((skillObject) => unit.skills !== undefined && unit.skills.includes(skillObject.name)).length;
                return skillCount >= skill.prerequisite.condition;
            } else if (typeof (skill.prerequisite.condition) === "string") {
                return unit.skills.includes(skill.prerequisite.condition);
            }
        }
        if (skill.prerequisite.type === "special") {
            return checkSpecialPrerequisites(skill, unit);
        }
    }
    return true;
};

const checkSpecialPrerequisites = (skill: ISkill, unit: IUnit) => {
    if (skill.prerequisite !== undefined) {
        switch (skill.prerequisite.condition) {
            case "Magic User":
                return unit.skills !== undefined ? unit.skills.includes("Magic User") : false;
            case "Magic / Pray User":
                return unit.skills !== undefined ? unit.skills.includes("Magic User") || unit.skills.includes("Pray User") : false;
            case "Any Weapons":
                return unit.skills !== undefined ? !unit.skills.includes("No Weapons allowed") : true;
            case "Any Armour":
                return unit.skills !== undefined ? !unit.skills.includes("No Armor allowed") : true;
            case "No no Pain":
                return unit.skills !== undefined ? !unit.skills.includes("No Pain") : true;
            case "Not Sisters of Sigmar":
                return unit.isHiredSword || store.getState().armyType !== "Sisters of Sigmar";
            default: return true;
        }
    }
    return true;
};

export const getGoldFromWyrdstones = (amount: number) => {
    const warbandSize = getTotalNumberOfWarbandMembers(store.getState().warbandRoster);
    switch (amount) {
        case 1: return (warbandSize <= 3) ? 45 : (warbandSize <= 6) ? 40 : (warbandSize <= 9) ? 35 : (warbandSize <= 15) ? 30 : 25;
        case 2: return (warbandSize <= 3) ? 60 : (warbandSize <= 6) ? 55 : (warbandSize <= 9) ? 50 : (warbandSize <= 12) ? 45 : (warbandSize <= 15) ? 40 : 35;
        case 3: return (warbandSize <= 3) ? 75 : (warbandSize <= 6) ? 70 : (warbandSize <= 9) ? 65 : (warbandSize <= 12) ? 60 : (warbandSize <= 15) ? 55 : 50;
        case 4: return (warbandSize <= 3) ? 90 : (warbandSize <= 6) ? 80 : (warbandSize <= 9) ? 70 : (warbandSize <= 12) ? 65 : (warbandSize <= 15) ? 60 : 55;
        case 5: return (warbandSize <= 3) ? 110 : (warbandSize <= 6) ? 100 : (warbandSize <= 9) ? 90 : (warbandSize <= 12) ? 80 : (warbandSize <= 15) ? 70 : 65;
        case 6: return (warbandSize <= 3) ? 120 : (warbandSize <= 6) ? 110 : (warbandSize <= 9) ? 100 : (warbandSize <= 12) ? 90 : (warbandSize <= 15) ? 80 : 70;
        case 7: return (warbandSize <= 3) ? 145 : (warbandSize <= 6) ? 130 : (warbandSize <= 9) ? 120 : (warbandSize <= 12) ? 110 : (warbandSize <= 15) ? 100 : 90;
        case 0: return 0;
        default: return (warbandSize <= 3) ? 155 : (warbandSize <= 6) ? 140 : (warbandSize <= 9) ? 130 : (warbandSize <= 12) ? 120 : (warbandSize <= 15) ? 110 : 100;
    }
};

export const getWyrdstonesFromExplorationRoll = (amount: number) => {
    if (amount < 5) {
        return 1;
    } else if (amount <= 11) {
        return 2;
    } else if (amount <= 17) {
        return 3;
    } else if (amount <= 24) {
        return 4;
    } else if (amount <= 30) {
        return 5;
    } else if (amount <= 35) {
        return 6;
    } else if (amount > 35) {
        return 7;
    } else {
        return 0;
    }
};

export const getLadsSkillLists = () => {
    const heros = store.getState().warbandRoster.filter((unit) => (unit.isHero && !unit.isHiredSword));
    return heros.reduce((accu: string[], hero) => {
        if (hero.skillLists !== undefined) {
            hero.skillLists.forEach((list) => {
                if (!accu.includes(list)) {
                    accu.push(list);
                }
            });
        }
        return accu;
    }, []);
};

export const getWarbandRating = (warbandRoster: IUnit[]) => warbandRoster.reduce((acc, unit) => {
    acc += getUnitRating(unit) * (unit.number !== undefined ? unit.number : 1);
    return acc;
}
    , 0);

export const getUnitRating = (unit: IUnit) => {
    let rating = 0;
    if (Boolean(unit)) {
        rating += 5;
        rating += unit.experience;
        if (unit.isLarge) {
            rating += 20;
        } else {
            rating += unit.price > 60 ? 5 : unit.price > 80 ? 10 : unit.price > 100 ? 15 : 0;
        }
    }
    return rating;
};
