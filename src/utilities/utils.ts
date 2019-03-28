import { store } from "..";
import { Equipment, IArmour, IArmy, IMeleeWeapon, IMiscallaneous, IMissileWeapon, IUnit, IEquipment } from "../constants";
import * as ArmyJson from "../constants/Armies.json";
import * as EquipmentJson from "../constants/Equipment.json";
const ArmyList = ArmyJson.armies as IArmy[];

// const ArmyList: IArmy[] = require("../constants/Armies.json").armies;
const MeleeEquipment: IMeleeWeapon[] = require("../constants/Equipment.json").equipment[0].MeleeWeapons;
const RangeEquipment: IMissileWeapon[] = require("../constants/Equipment.json").equipment[1].MissileWeapons;
const ArmourEquipment: IArmour[] = require("../constants/Equipment.json").equipment[2].Armour;
const MiscallaneousEquipment: IMiscallaneous[] = require("../constants/Equipment.json").equipment[3].Miscallaneous;
export const getMeleeWeapons = (): IMeleeWeapon[] => MeleeEquipment;
export const getMissileWeapons = (): IMissileWeapon[] => RangeEquipment;
export const getArmours = (): IArmour[] => ArmourEquipment;
export const getMisc = (): IMiscallaneous[] => MiscallaneousEquipment;
export const getArmyList = (): string[] => ArmyList.map((army) => army.name);

export const filterMeleeWeapons = (filterList: string[]): IMeleeWeapon[] => {
    const MeleeWeapons = getMeleeWeapons();
    return MeleeWeapons.length > 0 ? MeleeWeapons.filter((weapon) => filterList.includes(weapon.name)) : [];
};

export const filterMissileWeapons = (filterList: string[]): IMissileWeapon[] => {
    const MissileEquipment = getMissileWeapons();
    return MissileEquipment.length > 0 ? MissileEquipment.filter((weapon) => filterList.includes(weapon.name)) : [];
};

export const filterArmour = (filterList: string[]): IArmour[] => {
    const Armour = getArmours();
    return Armour.length > 0 ? Armour.filter((armour) => filterList.includes(armour.name)) : [];
};

export const filterMiscallaneous = (filterList: string[]): IMiscallaneous[] => {
    const MiscEquipment = getMisc();
    return MiscEquipment.length > 0 ? MiscEquipment.filter((misc) => filterList.includes(misc.name)) : [];
};

export function getEquipment = (equipmentName: string): IMeleeWeapon | IMissileWeapon | IArmour | IMiscallaneous {
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
    if (Army !== undefined && equipmentListNames.length > 0) {
        return equipmentListNames.reduce((filteredArr, equipmentListName) => {
            const equipmentList = Army.allowedEquipment.find((equiList) => equiList.name === equipmentListName);
            if (equipmentList !== undefined) {
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
