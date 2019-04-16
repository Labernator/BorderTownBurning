import React, { useState } from "react";
import { store } from "..";
import { getGoldFromWyrdstones } from "../utilities/utils";
import { SELL_WYRDSTONES, ADD_MONEY_TO_TREASURY } from "../actions";

export const WyrdstoneNumberInputControl = ({ title, id, actionType }: { title: string; id: string; actionType: any }) => {
    const [numberValue, setNumberValue] = useState("");
    const [errorText, setErrorText] = useState("");
    const onInput = (e: any) => {
        const re = /^[0-9\b]+$/;
        // tslint:disable-next-line:max-line-length
        if ((e.target.value === "" || re.test(e.target.value)) && (actionType !== SELL_WYRDSTONES || (actionType === SELL_WYRDSTONES && parseInt(e.target.value, 10) <= store.getState().wyrdstoneShards))) {
            setNumberValue(e.target.value);
            const btn = document.getElementById(`${id}SubmitButton`);
            if (btn !== null) {
                btn.removeAttribute("disabled");
                setErrorText("");
            }
        } else {
            const btn = document.getElementById(`${id}SubmitButton`);
            if (btn !== null) {
                btn.setAttribute("disabled", "true");
            }
            setErrorText("You don't have that many wyrdstones.");
        }
    };
    const submitValue = () => {
        store.dispatch({ type: actionType, payload: parseInt(numberValue, 10) });
        if (actionType === SELL_WYRDSTONES) {
            store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: getGoldFromWyrdstones(parseInt(numberValue, 10)) });
        }
        setNumberValue("");
    };
    return (
        <div>
            <div>{title}</div>
            <input
                id={id}
                value={numberValue}
                onChange={onInput}
            />
            <div>{errorText}</div>
            <button id={`${id}SubmitButton`} onClick={submitValue}>ok</button>
        </div>
    );
};
