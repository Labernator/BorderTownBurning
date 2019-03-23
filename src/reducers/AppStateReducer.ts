import { StateActions, SET_ARMY, SET_ALIGNMENT, SET_OBJECTIVE, RESTRICT_ALIGNMENTS, RESTRICT_OBJECTIVES, RESTRICT_UNITS, SET_UNIT, ADD_MONEY_TO_TREASURY, SUBTRACT_MONEY_FROM_TREASURY, ADD_UNIT_TO_ROSTER, REMOVE_UNIT_FROM_ROSTER, REMOVE_UNIT_FROM_UNITLIST, ADD_WARBAND_RATING, RESET_TREASURY, ADD_UNIT_TO_UNITLIST, SUBTRACT_WARBAND_RATING, UPDATE_UNIT } from "../actions";
import { initSelectionState, ISelectionState, IUnit } from "../constants";
const getUnitRating = (unit: IUnit) => {
    let rating = 0;
    if (unit) {
        rating += 5;
        rating += unit.experience;
        if (unit.isLarge) {
            rating += 20;
        } else {
            rating += unit.Price > 60 ? 5 : unit.Price > 80 ? 10 : unit.Price > 100 ? 15 : 0;
        }
    }
    return rating;
}
export function stateReducer(state: ISelectionState = initSelectionState, action: StateActions): ISelectionState {
    switch (action.type) {
        case SET_ARMY:
            return { ...state, selectedArmy: action.payload };
        case SET_ALIGNMENT:
            return { ...state, selectedAlignment: action.payload };
        case SET_OBJECTIVE:
            return { ...state, selectedObjective: action.payload };
        case RESTRICT_ALIGNMENTS:
            return { ...state, listOfAlignments: action.payload };
        case RESTRICT_OBJECTIVES:
            return { ...state, listOfObjectives: action.payload };
        case RESTRICT_UNITS:
            return { ...state, listOfUnits: action.payload };
        case SET_UNIT:
            return { ...state, selectedUnit: action.payload };
        case ADD_UNIT_TO_ROSTER:
            return { ...state, warbandRoster: [...state.warbandRoster, action.payload] }
        case REMOVE_UNIT_FROM_ROSTER:
            return { ...state, warbandRoster: state.warbandRoster.filter((unit) => unit.name !== action.payload.name) };
        case ADD_MONEY_TO_TREASURY:
            return { ...state, armyTreasury: state.armyTreasury + action.payload };
        case RESET_TREASURY:
            return { ...state, armyTreasury: 0 };
        case SUBTRACT_MONEY_FROM_TREASURY:
            return { ...state, armyTreasury: state.armyTreasury - action.payload };
        case REMOVE_UNIT_FROM_UNITLIST:
            return { ...state, listOfUnits: state.listOfUnits.filter((unit) => unit.name !== action.payload) };
        case ADD_UNIT_TO_UNITLIST:
            return { ...state, listOfUnits: [...state.listOfUnits, action.payload] };
        case ADD_WARBAND_RATING:
            return { ...state, warbandRating: state.warbandRating + getUnitRating(action.payload) };
        case SUBTRACT_WARBAND_RATING:
            return { ...state, warbandRating: state.warbandRating - getUnitRating(action.payload) };
        case UPDATE_UNIT:
            const unitIndex = state.warbandRoster.findIndex((unit) => unit.name === action.payload.name);
            return { ...state, warbandRoster: [...state.warbandRoster.slice(0, unitIndex), action.payload, ...state.warbandRoster.slice(unitIndex + 1)] }
        default:
            return state;
    }
}