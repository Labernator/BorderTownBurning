import React, { useState } from "react";
import { store } from "..";
import { ADD_MONEY_TO_TREASURY } from "../actions";

export const TreasuryNumberInputControl = () => {
    const [numberValue, setNumberValue] = useState("");
    const onInput = (e: any) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setNumberValue(e.target.value);
        }
    };
    const submitValue = () => {
        store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: parseInt(numberValue, 10) });
        setNumberValue("");
    };
    return (
        <div>
            <div>{"Add additional money to treasury:"}</div>
            <input
                id={`${store.getState().armyName}AddFunds`}
                value={numberValue}
                onChange={onInput}
            />
            <button onClick={submitValue}>ok</button>
        </div>
    );
};
