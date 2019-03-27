import "rc-select/assets/index.css";
import React from "react";
import { connect } from "react-redux";
import { IUnit, IAppState } from "../constants";
import { store } from "..";
import { ADD_UNIT_TO_ROSTER, SUBTRACT_MONEY_FROM_TREASURY, ADD_WARBAND_RATING, REMOVE_UNIT_FROM_UNITLIST, UPDATE_UNITLIST } from "../actions";
import { getUnits } from "../utilities/utils";
interface IUnitButton {
    listOfUnits: IUnit[];
    warbandRoster: IUnit[];
    selectedArmy: string;
}

const UnitBtn = (props: IUnitButton) => {
    const getReplacableUnits = () => getUnits(props.selectedArmy).reduce((acc, unit) => {
        if (unit.replaces !== undefined) {
            acc = acc.concat(unit.replaces);
        }
        return acc;
    }, [] as string[]);

    const getReplacingUnits = () => getUnits(props.selectedArmy).reduce((acc, unit) => {
        if (unit.replaces !== undefined) {
            acc = acc.concat(unit);
        }
        return acc;
    }, [] as IUnit[]);
    const isReplacingUnit = (unit: IUnit): boolean => {
        const allReplacingUnits = getReplacingUnits();
        return Boolean(allReplacingUnits.find((replacingUnit) => replacingUnit.name === unit.name));
    };
    const isReplacableUnit = (unit: IUnit): boolean => {
        const allReplacableUnits = getReplacableUnits();
        return Boolean(allReplacableUnits.find((replacableUnit) => replacableUnit === unit.name));
    };
    const addUnitToRoster = (unit: IUnit) => {
        store.dispatch({ type: ADD_UNIT_TO_ROSTER, payload: unit });
        store.dispatch({ type: SUBTRACT_MONEY_FROM_TREASURY, payload: unit.Price });
        store.dispatch({ type: ADD_WARBAND_RATING, payload: unit });
        const unitsInRoster = props.warbandRoster.filter((rosterUnit) => rosterUnit.name === unit.name);
        if (unit.include[1] === 1 || unit.include[1] === unitsInRoster.length + 1) {
            store.dispatch({ type: REMOVE_UNIT_FROM_UNITLIST, payload: unit.name });
        } else {
            store.dispatch({ type: UPDATE_UNITLIST, payload: props.listOfUnits });
        }
        if (isReplacableUnit(unit) || isReplacingUnit(unit)) {
            // which units are also replacable?
            let sumOfReplacables = 0;
            let sumOfReplacablesInRoster = 0;
            let sumOfReplacersInRoster = 0;
            const replacables = getReplacableUnits();
            replacables.forEach((replacableItem) => {
                const replacableUnit = getUnits(props.selectedArmy).find((item) => item.name === replacableItem);
                if (replacableUnit !== undefined) {
                    sumOfReplacables += replacableUnit.include[1];
                }
                sumOfReplacablesInRoster += props.warbandRoster.filter((item) => item.name === replacableItem).length;
            });
            const replacers = getReplacingUnits();
            replacers.forEach((replacingItem) => {
                sumOfReplacersInRoster += props.warbandRoster.filter((item) => item.name === replacingItem.name).length;
            });
            // if the replacing unit is already in the roster, we need to remove the rest
            if (sumOfReplacablesInRoster + sumOfReplacersInRoster === sumOfReplacables - 1) {
                replacables.forEach((replacable) => store.dispatch({ type: REMOVE_UNIT_FROM_UNITLIST, payload: replacable }));
                replacers.forEach((replacer) => store.dispatch({ type: REMOVE_UNIT_FROM_UNITLIST, payload: replacer.name }));
            }
        }
        return undefined;
    };
    const dropDownList = props.listOfUnits.map((unit: IUnit) => {
        if (unit.Price > store.getState().armyTreasury) {
            const notEnoughFunds = "You don't have enough funds to buy this unit.";
            return <button disabled title={notEnoughFunds} key={unit.name} onClick={() => addUnitToRoster(unit)} className="DisabledButton">{unit.name} ({unit.Price})</button>;
        } else {
            return <button key={unit.name} onClick={() => addUnitToRoster(unit)} className="EnabledButton">{unit.name} ({unit.Price})</button>;
        }
    });
    return (
        <div>
            {dropDownList}
        </div>
    );
};
const mapStateToProps = (state: IAppState) => ({
        listOfUnits: state.listOfUnits,
        warbandRoster: state.warbandRoster,
});

// function mapStateToProps(state: IAppState) { ({ listOfUnits: state.listOfUnits }); return {} };
export const UnitButtons = connect(mapStateToProps)(UnitBtn);
