export interface IList {
    names: string[] | undefined;
    title: string;
}

export interface ILabel {
    title: string;
    value: string;
}

export interface IUnitProps {
    unit: IUnit;
}

export enum AppMode {
    Initial,
    ExistingWarband,
}

export interface IRacialMaximums {
    type: string;
    characteristics: ICharacteristics;
}

export const initialState: IAppState = {
    appMode: AppMode.Initial,
    campaignAchievements: [],
    armyAlignment: "",
    campaignPoints: 0,
    armyName: "",
    armyObjective: "",
    armyStash: [],
    armyTreasury: 0,
    armyType: "",
    wyrdstoneShards: 0,
    // listOfAlignments: [
    //     "Lawful",
    //     "Lawful/Neutral",
    //     "Neutral",
    //     "Neutral/Chaotic",
    //     "Chaotic",
    // ],
    // listOfObjectives: [
    //     "The Scion of Chaos",
    //     "The Scourge of the Realm",
    //     "The Celestial Protectorate",
    //     "The Lure of Fortune",
    //     "The Silent Threat",
    //     "The Damned Shall Burn",
    // ],
    listOfUnits: [],
    warbandRating: 0,
    warbandRoster: [],
};

export interface IEquipment {
    type: string;
    cost: number;
}
export interface EquipmentList {
    type: string;
    modificationOptions: string[];
    equipment: IEquipment[];
}
export interface IArmy {
    name?: string;
    type: string;
    sizeLimit: number;
    alignments: string[];
    objectives: string[];
    units: IUnit[];
    startingCapital: number;
    allowedEquipment: EquipmentList[];
}

export interface IAppState {
    appMode: AppMode;
    armyType: string;
    armyName: string;
    armyAlignment: string;
    armyObjective: string;
    // listOfAlignments: string[];
    // listOfObjectives: string[];
    listOfUnits: IUnit[];
    warbandRoster: IUnit[];
    armyTreasury: number;
    armyStash: string[];
    campaignPoints: number;
    wyrdstoneShards: number;
    campaignAchievements: string[];
    warbandRating: number;
}

export interface IUnit {
    name?: string;
    race: string;
    type: string;
    characteristics: ICharacteristics;
    price: number;
    isHero: boolean;
    isLarge: boolean;
    skills?: string[];
    skillLists?: string[];
    spells?: string[];
    spellLists?: string[];
    allowedEquipment: string[];
    include: number[];
    experience: number;
    equipment: string[];
    replaces?: string[];
    number?: number;
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
    [key: string]: number;
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
    type: string;
    cost: number;
    rarity: number;
    rules: string[];
    restrictions?: {
        include?: string[];
        exclude?: string[];
    };
}
