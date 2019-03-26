import { IUnit } from "../constants";

export const SET_ARMY = 'SET_ARMY';
export const SET_ALIGNMENT = 'SET_ALIGNMENT';
export const SET_OBJECTIVE = 'SET_OBJECTIVE';
export const RESTRICT_ALIGNMENTS = 'RESTRICT_ALIGNMENTS';
export const RESTRICT_OBJECTIVES = 'RESTRICT_OBJECTIVES';
export const RESTRICT_UNITS = 'RESTRICT_UNITS';
export const ADD_UNIT_TO_UNITLIST = 'ADD_UNIT_TO_UNITLIST';
export const REMOVE_UNIT_FROM_UNITLIST = 'REMOVE_UNIT_FROM_UNITLIST';
export const ADD_MONEY_TO_TREASURY = 'ADD_MONEY_TO_TREASURY';
export const RESET_TREASURY = 'RESET_TREASURY';
export const SUBTRACT_MONEY_FROM_TREASURY = 'SUBTRACT_MONEY_FROM_TREASURY';
export const ADD_UNIT_TO_ROSTER = 'ADD_UNIT_TO_ROSTER';
export const REMOVE_UNIT_FROM_ROSTER = 'REMOVE_UNIT_FROM_ROSTER';
export const ADD_WARBAND_RATING = 'ADD_WARBAND_RATING';
export const SUBTRACT_WARBAND_RATING = 'SUBTRACT_WARBAND_RATING';
export const UPDATE_UNIT = 'UPDATE_UNIT';
export const UPDATE_UNITLIST = 'UPDATE_UNITLIST';

class SetArmy {
    readonly type = SET_ARMY
    constructor(public payload: string) { }
}
class SetAlignment {
    readonly type = SET_ALIGNMENT
    constructor(public payload: string) { }
}
class SetObjective {
    readonly type = SET_OBJECTIVE
    constructor(public payload: string) { }
}
class RestrictAlignment {
    readonly type = RESTRICT_ALIGNMENTS
    constructor(public payload: string[]) { }
}
class RestrictObjectives {
    readonly type = RESTRICT_OBJECTIVES
    constructor(public payload: string[]) { }
}
class RestrictUnits {
    readonly type = RESTRICT_UNITS
    constructor(public payload: IUnit[]) { }
}
class AddMoneyToTreasury {
    readonly type = ADD_MONEY_TO_TREASURY
    constructor(public payload: number) { }
}
class ResetTreasury {
    readonly type = RESET_TREASURY
    constructor(public payload: number) { }
}
class SubtractMoneyFromTreasury {
    readonly type = SUBTRACT_MONEY_FROM_TREASURY
    constructor(public payload: number) { }
}
class AddUnitToRoster {
    readonly type = ADD_UNIT_TO_ROSTER
    constructor(public payload: IUnit) { }
}
class RemoveUnitFromRoster {
    readonly type = REMOVE_UNIT_FROM_ROSTER
    constructor(public payload: IUnit) { }
}

class RemoveUnitFromUnitList {
    readonly type = REMOVE_UNIT_FROM_UNITLIST
    constructor(public payload: string) { }
}

class UpdateUnitList {
    readonly type = UPDATE_UNITLIST
    constructor(public payload: IUnit[]) { }
}

class AddUnitToUnitList {
    readonly type = ADD_UNIT_TO_UNITLIST
    constructor(public payload: IUnit) { }
}

class AddWarbandRating {
    readonly type = ADD_WARBAND_RATING
    constructor(public payload: IUnit) { }
}
class SubtractWarbandRating {
    readonly type = SUBTRACT_WARBAND_RATING
    constructor(public payload: IUnit) { }
}

class UpdateUnit {
    readonly type = UPDATE_UNIT
    constructor(public payload: IUnit) { }
}


export type StateActions = SetArmy | SetAlignment | SetObjective | RestrictAlignment |
    RestrictObjectives | RestrictUnits | SubtractMoneyFromTreasury | AddMoneyToTreasury |
    RemoveUnitFromRoster | AddUnitToRoster | RemoveUnitFromUnitList | AddWarbandRating | ResetTreasury |
    AddUnitToUnitList | SubtractWarbandRating | UpdateUnit | UpdateUnitList;