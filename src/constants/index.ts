export enum PostSequence {
    "HENCHMEN_INJURIES",
    "HERO_INJURIES",
    "EXPERIENCE",
    "EXPLORATION",
    "VETERANS",
    "RARES",
    "HIREANDBUY",
}

export interface IUpdate {
    updatingUnit: IUnit;
    types: any[];
    payload: any[];
    injuryString: string;
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
    veteranExperience: 0,
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
    veteranExperience: number;
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
    equipment?: string[];
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

export class HeroMultiplesEnum {
    public static readonly WATERING_HOLE = new HeroMultiplesEnum("WATERING_HOLE", 11, "11 Watering Hole");
    public static readonly RAZED_VILLAGE = new HeroMultiplesEnum("RAZED_VILLAGE", 22, "22 Razed Village");
    public static readonly MORTALLY_WOUNDED_WARRIOR = new HeroMultiplesEnum("MORTALLY_WOUNDED_WARRIOR", 33, "33 Mortally Wounded Warrior");
    public static readonly DISCARDED_SATTLE_BAG = new HeroMultiplesEnum("DISCARDED_SATTLE_BAG", 44, "44 Discarded Sattle Bag");
    public static readonly STATUE = new HeroMultiplesEnum("STATUE", 55, "55 Statue");
    public static readonly RUNAWAY_HORSE = new HeroMultiplesEnum("RUNAWAY_HORSE", 66, "66 Runaway Horse");
    public static readonly TREMBLING_BUSHES = new HeroMultiplesEnum("TREMBLING_BUSHES", 111, "111 Trembling Bushes");
    public static readonly WOUNDED_EXPLORER = new HeroMultiplesEnum("WOUNDED_EXPLORER", 222, "222 Wounded Explorer");
    public static readonly UNSCRUPULOUS_THIEF = new HeroMultiplesEnum("UNSCRUPULOUS_THIEF", 333, "333 Unscrupulous Thief");
    public static readonly DRAGON_MONK = new HeroMultiplesEnum("DRAGON_MONK", 444, "444 Dragon Monk");
    public static readonly SECLUDED_COTTAGE = new HeroMultiplesEnum("SECLUDED_COTTAGE", 555, "555 Secluded Cottage");
    public static readonly SLAVE_MINE = new HeroMultiplesEnum("SLAVE_MINE", 666, "666 Slave Mine");
    public static readonly CRASHED_CARAVAN = new HeroMultiplesEnum("CRASHED_CARAVAN", 1111, "1111 Crashed Caravan");
    public static readonly TREE_OF_WOE = new HeroMultiplesEnum("TREE_OF_WOE", 2222, "2222 Tree of Woe");
    public static readonly TEMPLE_OF_SKULLS = new HeroMultiplesEnum("TEMPLE_OF_SKULLS", 3333, "3333 Temple of Skulls");
    public static readonly KHAZAG_HORSEMEN = new HeroMultiplesEnum("KHAZAG_HORSEMEN", 4444, "4444 Khazag Horsemen");
    public static readonly UNLIKELY_GUIDE = new HeroMultiplesEnum("UNLIKELY_GUIDE", 5555, "5555 Unlikely Guide");
    public static readonly MUTATING_VAULT = new HeroMultiplesEnum("MUTATING_VAULT", 6666, "6666 Mutating Vault");
    public static readonly ABANDONED_TRADING_POST = new HeroMultiplesEnum("ABANDONED_TRADING_POST", 11111, "11111 Abandoned Trading Post");
    public static readonly BORDER_PATROL = new HeroMultiplesEnum("BORDER_PATROL", 22222, "22222 Border Patrol");
    public static readonly FALLEN_PRIEST = new HeroMultiplesEnum("FALLEN_PRIEST", 33333, "33333 Fallen Priest");
    public static readonly MAGNIFICENT_TOTEM = new HeroMultiplesEnum("MAGNIFICENT_TOTEM", 44444, "44444 Magnificent Totem");
    public static readonly GHARTOKS_TOMB = new HeroMultiplesEnum("GHARTOKS_TOMB", 55555, "55555 Ghartok's Tomb");
    public static readonly SATCHEL_OF_MAPS = new HeroMultiplesEnum("SATCHEL_OF_MAPS", 66666, "66666 Satchel of Maps");
    public static readonly KHANS_RETINUE = new HeroMultiplesEnum("KHANS_RETINUE", 111111, "111111 Khan's retinue");
    public static readonly SLAUGHTERED_CONVOY = new HeroMultiplesEnum("SLAUGHTERED_CONVOY", 222222, "222222 Slaughtered Convoy");
    public static readonly HERDSTONE = new HeroMultiplesEnum("HERDSTONE", 333333, "333333 Herdstone");
    public static readonly GIANTS_CARCASS = new HeroMultiplesEnum("GIANTS_CARCASS", 444444, "444444 Giant's Carcass");
    public static readonly CHAOS_CHAMPION = new HeroMultiplesEnum("CHAOS_CHAMPION", 555555, "555555 Chaos Champion");
    public static readonly TAINTED_ONES = new HeroMultiplesEnum("TAINTED_ONES", 666666, "666666 Tainted Ones");

    public static getBasicProps() {
        return [
            this.WATERING_HOLE,
            this.RAZED_VILLAGE,
            this.MORTALLY_WOUNDED_WARRIOR,
            this.DISCARDED_SATTLE_BAG,
            this.STATUE,
            this.RUNAWAY_HORSE,
            this.TREMBLING_BUSHES,
            this.WOUNDED_EXPLORER,
            this.UNSCRUPULOUS_THIEF,
            this.DRAGON_MONK,
            this.SECLUDED_COTTAGE,
            this.SLAVE_MINE,
            this.CRASHED_CARAVAN,
            this.TREE_OF_WOE,
            this.TEMPLE_OF_SKULLS,
            this.KHAZAG_HORSEMEN,
            this.UNLIKELY_GUIDE,
            this.MUTATING_VAULT,
            this.ABANDONED_TRADING_POST,
            this.BORDER_PATROL,
            this.FALLEN_PRIEST,
            this.MAGNIFICENT_TOTEM,
            this.GHARTOKS_TOMB,
            this.SATCHEL_OF_MAPS,
            this.KHANS_RETINUE,
            this.SLAUGHTERED_CONVOY,
            this.HERDSTONE,
            this.GIANTS_CARCASS,
            this.CHAOS_CHAMPION,
            this.TAINTED_ONES,
        ];
    }
    // private to disallow creating other instances of this type
    private constructor(private readonly key: string, public readonly value: number, public readonly text: string) {
    }

    public toString() {
        return this.key;
    }
}
