import React from "react";
import { IUnit } from "../constants";
import { store } from "..";
import { getNumberOfWarbandMembers, getArmySizeLimit } from "../utilities/utils";

export const UnitNumberLabelComponent = ({ unit }: { unit: IUnit }) => {
    const addHenchman = () => {
        // dispatch add Henchman (update unit, rating, treasury, etc.)
    };
    const checkAdditionalHenchman = (amount: number) => {
        // check if conditions are met, if not disable the button
        // check if enough treasure
        if (amount >= 5) {
            return <button title="The maximum number of henchman for this group is already reached." onClick={addHenchman} disabled>+</button>;
        } else if (getNumberOfWarbandMembers(store.getState().warbandRoster) >= getArmySizeLimit(store.getState().armyType)) {
            return <button title="You reached your warbands size limit. You cannot add more warband members." onClick={addHenchman} disabled>+</button>;
        } else if (store.getState().armyTreasury < unit.price) {
            return <button title="You don't have enough funds to buy another henchman into this group." onClick={addHenchman} disabled>+</button>;
        } else {
            return <button title="Add an additional henchman to this group." onClick={addHenchman}>+</button>;
        }
    };
    const getNumberContainer = () => {
        if (unit.number !== undefined) {
            return (
                <div>
                    <div>Number: {unit.number}</div>
                    {checkAdditionalHenchman(unit.number)}
                </div>
            );
        }
    };
    return (
        <div>{getNumberContainer()}</div>
    );
};
