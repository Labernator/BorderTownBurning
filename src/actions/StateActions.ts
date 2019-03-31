import { IUnit, AppMode } from "../constants";

export const SET_MODE = "SET_MODE";
export const SET_ARMY = "SET_ARMY";
export const SET_ARMYNAME = "SET_ARMYNAME";
export const SET_ALIGNMENT = "SET_ALIGNMENT";
export const SET_OBJECTIVE = "SET_OBJECTIVE";
export const RESTRICT_ALIGNMENTS = "RESTRICT_ALIGNMENTS";
export const RESTRICT_OBJECTIVES = "RESTRICT_OBJECTIVES";
export const RESTRICT_UNITS = "RESTRICT_UNITS";
export const ADD_UNIT_TO_UNITLIST = "ADD_UNIT_TO_UNITLIST";
export const REMOVE_UNIT_FROM_UNITLIST = "REMOVE_UNIT_FROM_UNITLIST";
export const ADD_MONEY_TO_TREASURY = "ADD_MONEY_TO_TREASURY";
export const RESET_TREASURY = "RESET_TREASURY";
export const SET_TREASURY = "SET_TREASURY";
export const SUBTRACT_MONEY_FROM_TREASURY = "SUBTRACT_MONEY_FROM_TREASURY";
export const ADD_UNIT_TO_ROSTER = "ADD_UNIT_TO_ROSTER";
export const REMOVE_UNIT_FROM_ROSTER = "REMOVE_UNIT_FROM_ROSTER";
export const SET_WARBAND_RATING = "SET_WARBAND_RATING";
export const ADD_WARBAND_RATING = "ADD_WARBAND_RATING";
export const SUBTRACT_WARBAND_RATING = "SUBTRACT_WARBAND_RATING";
export const UPDATE_UNIT = "UPDATE_UNIT";
export const UPDATE_UNITLIST = "UPDATE_UNITLIST";

class SetArmy {
    public readonly type = SET_ARMY;
    constructor(public payload: string) { }
}
class SetArmyName {
    public readonly type = SET_ARMYNAME;
    constructor(public payload: string) { }
}
class SetAlignment {
    public readonly type = SET_ALIGNMENT;
    constructor(public payload: string) { }
}
class SetObjective {
    public readonly type = SET_OBJECTIVE;
    constructor(public payload: string) { }
}
class RestrictAlignment {
    public readonly type = RESTRICT_ALIGNMENTS;
    constructor(public payload: string[]) { }
}
class RestrictObjectives {
    public readonly type = RESTRICT_OBJECTIVES;
    constructor(public payload: string[]) { }
}
class RestrictUnits {
    public readonly type = RESTRICT_UNITS;
    constructor(public payload: IUnit[]) { }
}
class AddMoneyToTreasury {
    public readonly type = ADD_MONEY_TO_TREASURY;
    constructor(public payload: number) { }
}
class ResetTreasury {
    public readonly type = RESET_TREASURY;
    constructor(public payload: number) { }
}
class SetTreasury {
    public readonly type = SET_TREASURY;
    constructor(public payload: number) { }
}
class SubtractMoneyFromTreasury {
    public readonly type = SUBTRACT_MONEY_FROM_TREASURY;
    constructor(public payload: number) { }
}
class AddUnitToRoster {
    public readonly type = ADD_UNIT_TO_ROSTER;
    constructor(public payload: IUnit) { }
}
class RemoveUnitFromRoster {
    public readonly type = REMOVE_UNIT_FROM_ROSTER;
    constructor(public payload: IUnit) { }
}

class RemoveUnitFromUnitList {
    public readonly type = REMOVE_UNIT_FROM_UNITLIST;
    constructor(public payload: string) { }
}

class UpdateUnitList {
    public readonly type = UPDATE_UNITLIST;
    constructor(public payload: IUnit[]) { }
}

class AddUnitToUnitList {
    public readonly type = ADD_UNIT_TO_UNITLIST;
    constructor(public payload: IUnit) { }
}

class AddWarbandRating {
    public readonly type = ADD_WARBAND_RATING;
    constructor(public payload: IUnit) { }
}
class SubtractWarbandRating {
    public readonly type = SUBTRACT_WARBAND_RATING;
    constructor(public payload: IUnit) { }
}
class SetWarbandRating {
    public readonly type = SET_WARBAND_RATING;
    constructor(public payload: number) { }
}
class UpdateUnit {
    public readonly type = UPDATE_UNIT;
    constructor(public payload: IUnit) { }
}

class SetMode {
    public readonly type = SET_MODE;
    constructor(public payload: AppMode) { }
}

export type StateActions = SetArmy | SetArmyName | SetAlignment | SetObjective | RestrictAlignment |
    RestrictObjectives | RestrictUnits | SubtractMoneyFromTreasury | AddMoneyToTreasury | SetWarbandRating |
    RemoveUnitFromRoster | AddUnitToRoster | RemoveUnitFromUnitList | AddWarbandRating | ResetTreasury | SetTreasury |
    AddUnitToUnitList | SubtractWarbandRating | UpdateUnit | UpdateUnitList | SetMode;
