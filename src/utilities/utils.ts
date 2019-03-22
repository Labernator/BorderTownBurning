import { IArmy, IUnit, Equipment, IMeleeWeapon, IEquipment, IMissileWeapon, IArmour, IMiscallaneous } from "../constants";
import { store } from "..";


const ArmyList: IArmy[] = require("../constants/Armies.json").armies;
const MeleeEquipment: IMeleeWeapon[] = require("../constants/Equipment.json").equipment[0].MeleeWeapons;
const RangeEquipment: IMissileWeapon[] = require("../constants/Equipment.json").equipment[1].MissileWeapons;
const ArmourEquipment: IArmour[] = require("../constants/Equipment.json").equipment[2].Armour;
const MiscallaneousEquipment: IMiscallaneous[] = require("../constants/Equipment.json").equipment[3].Miscallaneous;
export const getMeleeWeapons = (): IMeleeWeapon[] => {
    return MeleeEquipment;
}

export const filterMeleeWeapons = (filterList: string[]): IMeleeWeapon[] => {
    const MeleeWeapons = getMeleeWeapons();
    return MeleeWeapons ? MeleeWeapons.filter(weapon => filterList.includes(weapon.name)) : [];
}

export const getMissileWeapons = (): IMissileWeapon[] => {
    return RangeEquipment;
}

export const filterMissileWeapons = (filterList: string[]): IMissileWeapon[] => {
    const RangeEquipment = getMissileWeapons();
    return RangeEquipment ? RangeEquipment.filter(weapon => filterList.includes(weapon.name)) : [];
}

export const getArmours = (): IArmour[] => {
    return ArmourEquipment;
}

export const filterArmour = (filterList: string[]): IArmour[] => {
    const Armour = getArmours();
    return Armour ? Armour.filter(armour => filterList.includes(armour.name)) : [];
}

export const getMisc = (): IMiscallaneous[] => {
    return MiscallaneousEquipment;
}

export const filterMiscallaneous = (filterList: string[]): IMiscallaneous[] => {
    const MiscallaneousEquipment = getMisc();
    return MiscallaneousEquipment ? MiscallaneousEquipment.filter(misc => filterList.includes(misc.name)) : [];
}

export const getArmyList = (): string[] => {
    return ArmyList.map((army) => army.name);
}

export function getRestrictedAlignmentList(selectedArmy: string): string[] {
    const Army = ArmyList.find((army) => army.name === selectedArmy);
    if (Army !== undefined) {
        return Army.alignments;
    } else {
        return [];
    }
}

export function getEquipment(equipmentListNames: string[]): Equipment[] {
    const Army = ArmyList.find((army) => army.name === store.getState().selectedArmy);
    if (Army !== undefined) {
        return equipmentListNames.reduce((filteredArr, equipmentListName) => {
            const equipmentList = Army.allowedEquipment.find(equipmentList => equipmentList.name === equipmentListName)
            if (equipmentList) {
                filteredArr = filteredArr.concat(equipmentList.equipment);
            }
            return filteredArr;
        }, [] as Equipment[]);
    }
    return [];
}

export function getArmyTreasury(selectedArmy: string): number {
    const Army = ArmyList.find((army) => army.name === selectedArmy);
    if (Army !== undefined) {
        return Army.startingCapital;
    } else {
        return 0;
    }
}

export function getRestrictedObjectiveList(selectedArmy: string): string[] {
    const Army = ArmyList.find((army) => army.name === selectedArmy);
    if (Army !== undefined) {
        return Army.objectives;
    } else {
        return [];
    }
}

export function getArmySizeLimit(selectedArmy: string): number {
    const Army = ArmyList.find((army) => army.name === selectedArmy);
    if (Army !== undefined) {
        return Army.sizeLimit;
    } else {
        return 0;
    }
}

export function getUnits(selectedArmy: string): IUnit[] {
    const Army = ArmyList.find((army) => army.name === selectedArmy);
    if (Army !== undefined) {
        return Army.units;
    } else {
        return [];
    }
}

export function getUnit(selectedArmy: string): IUnit[] {
    const Army = ArmyList.find((army) => army.name === selectedArmy);
    if (Army !== undefined) {
        return Army.units;
    } else {
        return [];
    }
}
