export enum PostSequence {
    "HENCHMEN_INJURIES",
    "HERO_INJURIES",
    "EXPERIENCE",
    "EXPLORATION",
    "RARES",
    "HIREANDBUY",
}

export interface ILabel {
    title: string;
    value: string;
}

export interface IRacialMaximums {
    type: string;
    characteristics: ICharacteristics;
}

export const initialState: IAppState = {
    armyAlignment: "",
    armyName: "",
    armyObjective: "",
    armyStash: [],
    armyTreasury: 0,
    armyType: "",
    campaignAchievements: [],
    campaignPoints: 0,
    listOfUnits: [],
    warbandRating: 0,
    warbandRoster: [],
    wyrdstoneShards: 0,
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
export interface ISkill {
    name: string;
    type: string;
    text: string;
    prerequisite?: {
        type: string;
        condition: number | string;
        lookup?: string | string[];
    };
}
export interface ISkillList {
    name: string;
    list: ISkill[];
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
    armyType: string;
    armyName: string;
    armyAlignment: string;
    armyObjective: string;
    listOfUnits: IUnit[];
    warbandRoster: IUnit[];
    armyTreasury: number;
    armyStash: string[];
    campaignPoints: number;
    wyrdstoneShards: number;
    campaignAchievements: string[];
    warbandRating: number;
}

export interface IExportState {
    armyType: string;
    armyName: string;
    armyAlignment: string;
    armyObjective: string;
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
    isHiredSword?: boolean;
    injuries?: string[];
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
    variableCost?: string;
    rarity: number;
    rules: string[];
    restrictions?: {
        include?: string[];
        exclude?: string[];
    };
}

export enum InjuryState {
    ShowAll,
    ArmWound,
    Madness,
    SmashedLeg,
    BitterEnemy,
    Captured,
    GetInTheRing,
    DeepWound,
    CapturedDialog,
}

export class HeroInjuriesEnum {
    public static readonly DEAD = new HeroInjuriesEnum("DEAD", "Dead", "11 - 15 DEAD (removed from roster)");
    public static readonly LEGWOUND = new HeroInjuriesEnum("LEGWOUND", "Leg Wound", "22 Leg Wound (-1 Movement)");
    public static readonly ARMWOUND = new HeroInjuriesEnum("ARMWOUND", "Arm Wound", "23 Arm Wound (Choose Again)");
    public static readonly ARMWOUND_AMPUTATION = new HeroInjuriesEnum("ARMWOUND_AMPUTATION", "Amputated Arm", "Arm Wound - Amputate Arm");
    public static readonly ARMWOUND_MISS = new HeroInjuriesEnum("ARMWOUND_MISS", "Arm Wound", "Arm Wound - Misses next game");
    public static readonly MADNESS = new HeroInjuriesEnum("MADNESS", "Madness", "24 Madness (Choose Again)");
    public static readonly MADNESS_FRENZY = new HeroInjuriesEnum("MADNESS_FRENZY", "Madness(Frenzy)", "Madness - Is Frenzied from now on");
    public static readonly MADNESS_STUPIDITY = new HeroInjuriesEnum("MADNESS_STUPIDITY", "Madness(Stupidity)", "Madness - Is Stupid from now on");
    public static readonly SMASHEDLEG = new HeroInjuriesEnum("SMASHEDLEG", "Smashed Leg", "25 Smashed Leg (Choose Again)");
    public static readonly SMASHEDLEG_RUNNING = new HeroInjuriesEnum("SMASHEDLEG_RUNNING", "Slow", "Smashed Leg - The hero may not run anymore.");
    public static readonly SMASHEDLEG_MISS = new HeroInjuriesEnum("SMASHEDLEG_MISS", "Smashed Leg", "Smashed Leg - Misses next game");
    public static readonly CHESTWOUND = new HeroInjuriesEnum("CHESTWOUND", "Chest Wound", "26 Chest Wound (-1 Toughness)");
    public static readonly BLINDEDINONEEYE = new HeroInjuriesEnum("BLINDEDINONEEYE", "Blinded in one Eye", "31 Blinded in one Eye (-1 Ballistic Skill)");
    public static readonly OLDBATTLEWOUND = new HeroInjuriesEnum("OLDBATTLEWOUND", "Old Battle Wound", "32 Old battle Wound (Roll D6 before every battle: 1 = miss this battle)");
    public static readonly NERVOUSCONDITION = new HeroInjuriesEnum("NERVOUSCONDITION", "Nervous Condition", "33 Nervous Condition (-1 Initiative)");
    public static readonly HANDINJURY = new HeroInjuriesEnum("HANDINJURY", "Hand Injury", "34 Hand Injury (-1 Weapon Skill)");
    public static readonly DEEPWOUND = new HeroInjuriesEnum("DEEPWOUND", "Deep Wound", "35 Deep Wound (Hero must miss the next D3 games.)");
    public static readonly DEEP_WOUND_INPUT = new HeroInjuriesEnum("DEEP_WOUND_INPUT", "Deep Wound", "Hero must miss the next D3 games.");
    public static readonly ROBBED = new HeroInjuriesEnum("ROBBED", "Robbed", "36 Robbed (Hero loses weapons, armour and all other equipment)");
    public static readonly FULLRECOVERY = new HeroInjuriesEnum("FULLRECOVERY", "Full Recovery", "41 - 55 Full Recovery (no Effect)");
    public static readonly BITTERENEMY = new HeroInjuriesEnum("BITTERENEMY", "Bitter Enemy", "56 Bitter Enemy (Choose Again)");
    public static readonly BITTER_ENEMY_INPUT = new HeroInjuriesEnum("BITTERENEMY_INPUT", "Hatred", "Enter the name of what the warrior hates from now on:");
    public static readonly CAPTURED = new HeroInjuriesEnum("CAPTURED", "Captured", "61 Captured (Choose Again)");
    public static readonly CAPTURED_BOUGHT_BACK = new HeroInjuriesEnum("CAPTURED_BOUGHT_BACK", "Captured", "Captured - The hero is bought back.");
    public static readonly CAPTURED_INPUT = new HeroInjuriesEnum("CAPTURED_INPUT", "Captured", "Captured - The hero is bought back.");
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
            this.BITTER_ENEMY_INPUT,
        ];
    }
    public static getDeepWoundProps() {
        return [
            this.DEEP_WOUND_INPUT,
        ];
    }
    public static getCapturedProps() {
        return [
            this.CAPTURED_BOUGHT_BACK,
            this.CAPTURED_LOST,
        ];
    }
    public static getCapturedDialogProps() {
        return [
            this.CAPTURED_INPUT,
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
