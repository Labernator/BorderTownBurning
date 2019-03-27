export interface ICharTable {
    characteristics: ICharacteristics;
}

export interface IList {
    names: string[];
}

export interface ILabel {
    title: string;
    value: string;
}

export interface IUnitEquipment {
    unit: IUnit;
}

export const initialState: IAppState = {
    selectedArmy: "",
    selectedAlignment: "",
    selectedObjective: "",
    listOfAlignments: [
        "Lawful",
        "Lawful/Neutral",
        "Neutral",
        "Neutral/Chaotic",
        "Chaotic",
    ],
    listOfObjectives: [
        "The Scion of Chaos",
        "The Scourge of the Realm",
        "The Celestial Protectorate",
        "The Lure of Fortune",
        "The Silent Threat",
        "The Damned Shall Burn",
    ],
    listOfUnits: [],
    warbandRoster: [],
    armyTreasury: 0,
    armyStash: [],
    armyCampaignPoints: 0,
    armyWyrdstoneShards: 0,
    armyAchievements: [],
    warbandRating: 0,
};

export interface Equipment {
    name: string;
    cost: number;
}
export interface EquipmentList {
    name: string;
    modificationOptions: string[];
    equipment: Equipment[];
}
export interface IArmy {
    name: string;
    sizeLimit: number;
    alignments: string[];
    objectives: string[];
    units: IUnit[];
    startingCapital: number;
    allowedEquipment: EquipmentList[];
}

export interface IAppState {
    selectedArmy: string;
    selectedAlignment: string;
    selectedObjective: string;
    listOfAlignments: string[];
    listOfObjectives: string[];
    listOfUnits: IUnit[];
    warbandRoster: IUnit[];
    armyTreasury: number;
    armyStash: string[];
    armyCampaignPoints: number;
    armyWyrdstoneShards: number;
    armyAchievements: string[];
    warbandRating: number;
}

export interface IUnit {
    name: string;
    Characteristics: ICharacteristics;
    Price: number;
    isHero: boolean;
    isLarge: boolean;
    Skills: string[];
    SkillLists: string[];
    allowedEquipment: string[];
    include: number[];
    experience: number;
    equipment: string[];
    replaces?: string[];
}

export interface ICharacteristics {
    Movement: number;
    WeaponSkill: number;
    BallisticSkill: number;
    Strength: number;
    Toughness: number;
    Wounds: number;
    Initiative: number;
    Attacks: number;
    Leadership: number;
}

export interface IEquipment {
    MeleeWeapons: IMeleeWeapon[];
    MissileWeapons: IMissileWeapon[];
    Armour: IArmour[];

}

export interface IMeleeWeapon extends IEquip {
    weaponType: string;
    strengthModifier: string;
}

export interface IMissileWeapon extends IEquip {
    weaponType: string;
    strength: string;
    range: number;
}

export interface IArmour extends IEquip {
    armourType: string;
    strength: string;
    armour: number;
}

export interface IMiscallaneous extends IEquip {
    type: string;
}
interface IEquip {
    name: string;
    cost: number;
    rarity: number;
    rules: string[];
    restrictions: string[];
}
