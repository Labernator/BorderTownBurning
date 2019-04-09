import "rc-select/assets/index.css";
import React from "react";
import { connect } from "react-redux";
import { IUnit, IAppState } from "../constants";
import { store } from "..";
import * as Actions from "../actions";
import { getUnits, getArmySizeLimit } from "../utilities/utils";
interface IUnitButton {
    listOfUnits: IUnit[];
    warbandRoster: IUnit[];
    armyType: string;
}
const limitExceeded = "You don't have enough funds to buy this unit.";
const notEnoughFunds = "You reached your warbands size limit. You cannot add more warband members.";
const UnitBtn = (props: IUnitButton) => {
    const getReplacableUnits = () => getUnits(props.armyType).reduce((acc, unit) => {
        if (unit.replaces !== undefined) {
            acc = acc.concat(unit.replaces);
        }
        return acc;
    }, [] as string[]);

    const getReplacingUnits = () => getUnits(props.armyType).reduce((acc, unit) => {
        if (unit.replaces !== undefined) {
            acc = acc.concat(unit);
        }
        return acc;
    }, [] as IUnit[]);
    const isReplacingUnit = (unit: IUnit): boolean => {
        const allReplacingUnits = getReplacingUnits();
        return Boolean(allReplacingUnits.find((replacingUnit) => replacingUnit.type === unit.type));
    };
    const isReplacableUnit = (unit: IUnit): boolean => {
        const allReplacableUnits = getReplacableUnits();
        return Boolean(allReplacableUnits.find((replacableUnit) => replacableUnit === unit.type));
    };
    const addUnitToRoster = (unit: IUnit) => {
        store.dispatch({ type: Actions.ADD_UNIT_TO_ROSTER, payload: unit });
        store.dispatch({ type: Actions.SUBTRACT_MONEY_FROM_TREASURY, payload: unit.price });
        store.dispatch({ type: Actions.ADD_WARBAND_RATING, payload: unit });
        const unitsInRoster = props.warbandRoster.filter((rosterUnit) => rosterUnit.type === unit.type);
        if (unit.include[1] === 1 || unit.include[1] === unitsInRoster.length + 1) {
            store.dispatch({ type: Actions.REMOVE_UNIT_FROM_UNITLIST, payload: unit.type });
        } else {
            store.dispatch({ type: Actions.UPDATE_UNITLIST, payload: props.listOfUnits });
        }
        if (isReplacableUnit(unit) || isReplacingUnit(unit)) {
            // which units are also replacable?
            let sumOfReplacables = 0;
            let sumOfReplacablesInRoster = 0;
            let sumOfReplacersInRoster = 0;
            const replacables = getReplacableUnits();
            replacables.forEach((replacableItem) => {
                const replacableUnit = getUnits(props.armyType).find((item) => item.type === replacableItem);
                if (replacableUnit !== undefined) {
                    sumOfReplacables += replacableUnit.include[1];
                }
                sumOfReplacablesInRoster += props.warbandRoster.filter((item) => item.type === replacableItem).length;
            });
            const replacers = getReplacingUnits();
            replacers.forEach((replacingItem) => {
                sumOfReplacersInRoster += props.warbandRoster.filter((item) => item.type === replacingItem.type).length;
            });
            // if the replacing unit is already in the roster, we need to remove the rest
            if (sumOfReplacablesInRoster + sumOfReplacersInRoster === sumOfReplacables - 1) {
                replacables.forEach((replacable) => store.dispatch({ type: Actions.REMOVE_UNIT_FROM_UNITLIST, payload: replacable }));
                replacers.forEach((replacer) => store.dispatch({ type: Actions.REMOVE_UNIT_FROM_UNITLIST, payload: replacer.type }));
            }
        }
        return undefined;
    };
    const unitBtns = props.listOfUnits.map((unit: IUnit) => {
        if (unit.price > store.getState().armyTreasury) {
            return <button
                key={unit.type}
                title={limitExceeded}
                onClick={() => addUnitToRoster(unit)}
                className="DisabledButton"
                disabled>
                {unit.type} ({unit.price})
            </button>;
        } else if (props.warbandRoster.length >= getArmySizeLimit(props.armyType)) {
            return <button
                key={unit.type}
                title={notEnoughFunds}
                onClick={() => addUnitToRoster(unit)}
                className="DisabledButton"
                disabled>
                {unit.type} ({unit.price})
            </button>;
        } else {
            return <button
                key={unit.type}
                onClick={() => addUnitToRoster(unit)}
                className="EnabledButton">
                {unit.type} ({unit.price})
            </button>;
        }
    });
    return (
        <div>
            {unitBtns}
        </div>
    );
};
const mapStateToProps = (state: IAppState) => ({
    listOfUnits: state.listOfUnits,
    warbandRoster: state.warbandRoster,
});

export const UnitButtons = connect(mapStateToProps)(UnitBtn);
