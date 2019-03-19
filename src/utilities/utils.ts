import { IArmy, IUnit, Equipment, IMeleeWeapon, IEquipment, IMissileWeapon, IArmour } from "../constants";
import { store } from "..";


const ArmyList: IArmy[] = require("../constants/Armies.json").armies;
const EquipmentList: IEquipment = require("../constants/Equipment.json").equipment;

export const getMeleeWeapons = (): IMeleeWeapon[] => {
    return EquipmentList.MeleeWeapons;
}

export const filterMeleeWeapons = (filterList: string[]): IMeleeWeapon[] => {
    const MeleeWeapons = getMeleeWeapons();
    return MeleeWeapons.filter(weapon => filterList.includes(weapon.name));
}

export const getMissileWeapons = (): IMissileWeapon[] => {
    return EquipmentList.MissileWeapons;
}

export const getArmours = (): IArmour[] => {
    return EquipmentList.Armour;
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


export function getEquipment(equipmentListName: string): Equipment[] {
    const Army = ArmyList.find((army) => army.name === store.getState().selectedArmy);
    if (Army !== undefined) {
        const equipmentList = Army.allowedEquipment.find(equipmentList => equipmentList.name === equipmentListName)
        if (equipmentList) {
            return equipmentList.equipment;
        }
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
