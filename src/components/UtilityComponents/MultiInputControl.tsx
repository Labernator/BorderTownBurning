import React, { useState } from "react";
import { IInputEvent, IExplorationReward, IExplorationRewardEnum, IInputValueTypes } from "../../constants";
import { ADD_MONEY_TO_TREASURY, ADD_ITEMS_TO_STASH } from "../../actions";
import { store } from "../..";

export const MultiInputControl = ({ inputs, inputCallback }: { inputs: IExplorationReward[]; inputCallback(value: string): void }) => {
    const [inputValues, setInputValues] = useState([] as IInputValueTypes[]);
    const continueButtonOnClick = () => {
        inputValues.forEach((input) => {
            console.log(store.getState());
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
            console.log(store.getState());
            inputCallback("continueButtonPressed");
        });
    };
    const content = inputs.map((input) => {
        const [inputValue, setInputValue] = useState("");
        let element: JSX.Element;
        const getInputPropagation = (value: string): IInputValueTypes => {
            if (input.type === IExplorationRewardEnum.GoldCoins) {
                return {
                    itemName: input.itemName,
                    dispatch: {
                        type: ADD_MONEY_TO_TREASURY,
                        payload: typeof input.amount === "number" ? input.amount : parseInt(value, 10),
                    },
                };
            } else {
                return {
                    itemName: input.itemName,
                    dispatch: {
                        type: ADD_ITEMS_TO_STASH,
                        payload: { name: input.itemName, amount: typeof input.amount === "number" ? input.amount : parseInt(value, 10) },
                    },
                };
            }
        };
        const onInput = (e: IInputEvent) => {
            const re = /^[0-9\b]+$/;
            // tslint:disable-next-line:max-line-length
            if (e.target.value === "" || (re.test(e.target.value))) {
                setInputValue(e.target.value);
                // inputCallback(e.target.value);
                setInputValues([...inputValues, getInputPropagation(e.target.value)]);
            }
        };

        if (typeof input.amount === "number") {
            element = <div id={`${input.itemName}Amount`}>{`You gain +${input.amount} ${input.itemName}`}</div>;
        } else {
            if (!input.amount.condition) {
                element = (
                    <div id={`${input.itemName}Amount`}>
                        <div>{`You gain +${input.amount.toString()} ${input.itemName}`}</div>
                        <div>{`Please enter the value for ${input.amount.toString()} here:`}</div>
                        <input
                            id={`${input.itemName}Input`}
                            value={inputValue}
                            onChange={onInput}>
                        </input>
                    </div>
                );
            } else {
                element = (
                    <div id={`${input.itemName}Amount`}>
                        <div>{`Roll ${input.amount.conditionText}. On a roll of ${input.amount.condition}, you gain ${input.itemName}`}</div>
                    </div>
                );
            }

        }
        return (
            <div id={input.itemName}>
                {element}
            </div>
        );
    });

    return (
        <div>
            {content}
            <button onClick={continueButtonOnClick}>Continue</button>
        </div>
    );
};
