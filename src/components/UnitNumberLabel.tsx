import React from "react";
import { IUnitProps } from "../constants";
import { store } from "..";

export const UnitNumberLabelComponent = (props: IUnitProps) => {
    const addHenchman = () => {
        // dispatch add Henchman (update unit, rating, treasury, etc.)
    };
    const checkAdditionalHenchman = (amount: number) => {
        // check if conditions are met, if not disable the button
        // check if enough treasure
        if (amount < 5) {
            return <button title="The maximum number of henchman for this group is already reached." onClick={addHenchman} disabled>+</button>;
        } else if (store.getState().armyTreasury < props.unit.price) {
            return <button title="You don't have enough funds to buy another henchman into this group." onClick={addHenchman} disabled>+</button>;
        } else {
            return <button title="Add an additional henchman to this group." onClick={addHenchman}>+</button>;
        }
    };
    const getNumberContainer = () => {
        if (props.unit.number !== undefined) {
            return (
                <div>
                    <div>Number: {props.unit.number}</div>
                    {checkAdditionalHenchman(props.unit.number)}
                </div>
            );
        }
    };
    return (
        <div>{getNumberContainer()}</div>
    );
};
