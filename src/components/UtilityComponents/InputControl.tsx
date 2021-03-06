import React, { useState } from "react";
import { IInputEvent, IExplorationReward, IExplorationRewardEnum, IInputValueTypes } from "../../constants";
import { ADD_MONEY_TO_TREASURY, ADD_ITEMS_TO_STASH } from "../../actions";

export const InputControl = ({ input, callback }: { input: IExplorationReward; callback(inputValueType: IInputValueTypes): void }) => {
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
            callback(getInputPropagation(e.target.value));
        }
    };

    if (typeof input.amount === "number") {
        element = (<div key={`${input.itemName}Amount`}>{`You gain +${input.amount} ${input.itemName}`}</div>);
    } else {
        if (input.amount.condition === undefined) {
            element = (
                <div key={`${input.itemName}Amount`}>
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
                <div key={`${input.itemName}Amount`}>
                    <div>{`Roll ${input.amount.conditionText}. On a roll of ${input.amount.condition}, you gain ${input.itemName}`}</div>
                </div>
            );
        }

    }
    return (
        <div key={input.itemName}>
            {element}
        </div>
    );
};
