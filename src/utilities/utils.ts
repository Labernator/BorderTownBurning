import { store } from "..";
import { IEquipment, IArmour, IArmy, IMeleeWeapon, IMiscallaneous, IMissileWeapon, IUnit, AppMode, IRacialMaximums } from "../constants";
import * as ArmyJson from "../constants/Armies.json";
const ArmyList = ArmyJson.armies as IArmy[];
const RacialMaximums: IRacialMaximums[] = require("../constants/RacialMaximums.json").maximums;
const MeleeEquipment: IMeleeWeapon[] = require("../constants/Equipment.json").equipment[0].MeleeWeapons;
const RangeEquipment: IMissileWeapon[] = require("../constants/Equipment.json").equipment[1].MissileWeapons;
const ArmourEquipment: IArmour[] = require("../constants/Equipment.json").equipment[2].Armour;
const MiscallaneousEquipment: IMiscallaneous[] = require("../constants/Equipment.json").equipment[3].Miscallaneous;
export const getMeleeWeapons = (): IMeleeWeapon[] => MeleeEquipment;
export const getMissileWeapons = (): IMissileWeapon[] => RangeEquipment;
export const getArmours = (): IArmour[] => ArmourEquipment;
export const getMisc = (): IMiscallaneous[] => MiscallaneousEquipment;
export const getArmyList = (): string[] => ArmyList.map((army) => army.type);

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

export const checkRacialMaximums = (unit: IUnit) => {
    const arr = [];
    const maximums = RacialMaximums.find((max) => max.type === unit.race);
    if (maximums !== undefined) {
        arr.push({ name: "Movement", maxReached: unit.characteristics.Movement === maximums.characteristics.Movement ? true : false });
        arr.push({ name: "WeaponSkill", maxReached: unit.characteristics.WeaponSkill === maximums.characteristics.WeaponSkill ? true : false });
        arr.push({ name: "BallisticSkill", maxReached: unit.characteristics.BallisticSkill === maximums.characteristics.BallisticSkill ? true : false });
        arr.push({ name: "Strength", maxReached: unit.characteristics.Strength === maximums.characteristics.Strength ? true : false });
        arr.push({ name: "Toughness", maxReached: unit.characteristics.Toughness === maximums.characteristics.Toughness ? true : false });
        arr.push({ name: "Wounds", maxReached: unit.characteristics.Wounds === maximums.characteristics.Wounds ? true : false });
        arr.push({ name: "Initiative", maxReached: unit.characteristics.Initiative === maximums.characteristics.Initiative ? true : false });
        arr.push({ name: "Attacks", maxReached: unit.characteristics.Attacks === maximums.characteristics.Attacks ? true : false });
        arr.push({ name: "Leadership", maxReached: unit.characteristics.Leadership === maximums.characteristics.Leadership ? true : false });
    }
    return arr;
};

export const filterMiscallaneous = (filterList: string[]): IMiscallaneous[] => {
    const MiscEquipment = getMisc();
    if (store.getState().appMode === AppMode.ExistingWarband) {
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
    }
    return MiscEquipment.length > 0 ? MiscEquipment.filter((misc) => filterList.includes(misc.type)) : [];
};

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

export function getRestrictedAlignmentList(armyType: string): string[] {
    const Army = ArmyList.find((army) => army.type === armyType);
    if (Army !== undefined) {
        return Army.alignments;
    } else {
        return [];
    }
}

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

export const checkLevelUp = (unit: IUnit) => {
    if (unit.isHero) {
        switch (unit.experience) {
            case 2:
            case 4:
            case 6:
            case 8:
            case 11:
            case 14:
            case 17:
            case 20:
            case 24:
            case 28:
            case 32:
            case 36:
            case 41:
            case 46:
            case 51:
            case 57:
            case 63:
            case 69:
            case 76:
            case 83:
            case 90: handleHeroLevelUp(unit); break;
            default: // do nothing
        }
    } else {
        switch (unit.experience) {
            case 2:
            case 5:
            case 9:
            case 14: handleHenchmenLevelUp(unit); break;
            default: // do nothing
        }
    }
}

const handleHeroLevelUp = (unit: IUnit) => {
    // Create new Level Up component with all possible advances
}

const handleHenchmenLevelUp = (unit: IUnit) => {
    // Create new Level Up component with all possible advances
}
