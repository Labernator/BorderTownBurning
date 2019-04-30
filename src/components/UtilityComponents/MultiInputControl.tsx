import React, { useState } from "react";
import { IExplorationReward, IInputValueTypes } from "../../constants";
import { ADD_MONEY_TO_TREASURY, ADD_ITEMS_TO_STASH } from "../../actions";
import { store } from "../..";
import { InputControl } from "./InputControl";

export const MultiInputControl = ({ inputs, inputCallback }: { inputs: IExplorationReward[]; inputCallback(value: string): void }) => {
    const [inputValues, setInputValues] = useState([] as IInputValueTypes[]);
    const continueButtonOnClick = () => {
        inputValues.forEach((input) => {
            if (input.dispatch.type === "ADD_ITEMS_TO_STASH") {
                store.dispatch({
                    type: ADD_ITEMS_TO_STASH,
                    payload: input.dispatch.payload,
                });
            } else if (input.dispatch.type === "ADD_MONEY_TO_TREASURY") {
                store.dispatch({
                    type: ADD_MONEY_TO_TREASURY,
                    payload: input.dispatch.payload,
                });
            }
            inputCallback("continueButtonPressed");
        });
        inputs.forEach((nonVariableInput) => {
            if (typeof nonVariableInput.amount === "number") {
                store.dispatch({
                    type: ADD_ITEMS_TO_STASH,
                    payload: {
                        name: nonVariableInput.itemName,
                        amount: nonVariableInput.amount,
                    },
                });
            }
        });
    };
    const handleCallback = (inputValueType: IInputValueTypes) => setInputValues([...inputValues, inputValueType]);
    const content = inputs.map((input) => <InputControl input={input} callback={handleCallback}></InputControl>);

    return (
        <div>
            {content}
            <button onClick={continueButtonOnClick}>Continue</button>
        </div>
    );
};
