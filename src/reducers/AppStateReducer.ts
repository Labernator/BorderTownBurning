import * as Actions from "../actions";
import { IAppState, initialState, IUnit } from "../constants";
import { getUnitRating } from "../utilities/utils";

export function stateReducer(state: IAppState = initialState, action: Actions.StateActions): IAppState {
    switch (action.type) {
        case Actions.SET_ARMY:
            return { ...state, armyType: action.payload };
        case Actions.SET_ARMYNAME:
            return { ...state, armyName: action.payload };
        case Actions.SET_ALIGNMENT:
            return { ...state, armyAlignment: action.payload };
        case Actions.SET_OBJECTIVE:
            return { ...state, armyObjective: action.payload };
        case Actions.RESTRICT_UNITS:
            return { ...state, listOfUnits: action.payload };
        case Actions.ADD_UNIT_TO_ROSTER:
            return { ...state, warbandRoster: [...state.warbandRoster, action.payload] };
        case Actions.REMOVE_UNIT_FROM_ROSTER:
            return { ...state, warbandRoster: state.warbandRoster.filter((unit) => unit.type !== action.payload.type) };
        case Actions.ADD_MONEY_TO_TREASURY:
            return { ...state, armyTreasury: state.armyTreasury + action.payload };
        case Actions.RESET_TREASURY:
            return { ...state, armyTreasury: 0 };
        case Actions.SUBTRACT_MONEY_FROM_TREASURY:
            return { ...state, armyTreasury: state.armyTreasury - action.payload };
        case Actions.SET_TREASURY:
            return { ...state, armyTreasury: action.payload };
        case Actions.REMOVE_KILLED_HENCHMAN:
            const payloadUnit = action.payload;
            if (payloadUnit.isHiredSword || payloadUnit.number === undefined || payloadUnit.number === 1) {
                return { ...state, warbandRoster: state.warbandRoster.filter((unit) => unit.name !== action.payload.name) };
            } else {
                const unitIdx = state.warbandRoster.findIndex((unit) => unit.name === action.payload.name);
                return {
                    ...state,
                    warbandRoster: [...state.warbandRoster.slice(0, unitIdx), { ...payloadUnit, number: payloadUnit.number - 1 }, ...state.warbandRoster.slice(unitIdx + 1)],
                };
            }
        case Actions.REMOVE_UNIT_FROM_UNITLIST:
            return { ...state, listOfUnits: state.listOfUnits.filter((unit) => unit.type !== action.payload) };
        case Actions.ADD_UNIT_TO_UNITLIST:
            return { ...state, listOfUnits: [...state.listOfUnits, action.payload] };
        case Actions.UPDATE_UNITLIST:
            return { ...state, listOfUnits: action.payload };
        case Actions.SET_WARBAND_RATING:
            return { ...state, warbandRating: action.payload };
        case Actions.SET_WYRDSTONES:
            return { ...state, wyrdstoneShards: action.payload };
        case Actions.ADD_WYRDSTONES:
            return { ...state, wyrdstoneShards: state.wyrdstoneShards + action.payload };
        case Actions.SELL_WYRDSTONES:
            return { ...state, wyrdstoneShards: state.wyrdstoneShards - action.payload };
        case Actions.SET_ACHIEVEMENTS:
            return { ...state, campaignAchievements: action.payload };
        case Actions.SET_CAMPAIGN_POINTS:
            return { ...state, campaignPoints: action.payload };
        case Actions.SET_VETERAN_EXPERIENCE:
            return { ...state, veteranExperience: action.payload };
        case Actions.ADD_CAMPAIGN_POINTS:
            return { ...state, campaignPoints: state.campaignPoints + action.payload };
        case Actions.ADD_WARBAND_RATING:
            return { ...state, warbandRating: state.warbandRating + getUnitRating(action.payload) };
        case Actions.SUBTRACT_WARBAND_RATING:
            return { ...state, warbandRating: state.warbandRating - getUnitRating(action.payload) };
        case Actions.UPDATE_UNIT:
            const unitIndex = state.warbandRoster.findIndex((unit) => unit.name === action.payload.name);
            return { ...state, warbandRoster: [...state.warbandRoster.slice(0, unitIndex), action.payload, ...state.warbandRoster.slice(unitIndex + 1)] };
        default:
            // tslint:disable-next-line: no-console
            console.log(state);
            return state;
    }
}
