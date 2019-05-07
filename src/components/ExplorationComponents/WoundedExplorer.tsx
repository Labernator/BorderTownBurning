import React, { useState } from "react";
import { DiceEnum, IExplorationRewardEnum, IInputValueTypes, IAppState } from "../../constants";
import { ADD_MONEY_TO_TREASURY, UPDATE_UNIT } from "../../actions";
import { store } from "../..";
import { InputControl } from "../UtilityComponents/InputControl";

export const WoundedExplorer = ({ inputCallback }: { inputCallback(value: string): void }) => {
    const [inputValue, setInputValue] = useState({} as any as IInputValueTypes);
    const [overviewText, setOverviewText] = useState("");
    const continueButtonOnClick = () => {
        if (inputValue.dispatch !== undefined) {
            if (inputValue.dispatch.type === "ADD_MONEY_TO_TREASURY") {
                store.dispatch({
                    type: ADD_MONEY_TO_TREASURY,
                    payload: inputValue.dispatch.payload,
                });
            }
            if (inputValue.dispatch.type === "UPDATE_UNIT") {
                store.dispatch({
                    type: UPDATE_UNIT,
                    payload: inputValue.dispatch.payload,
                });
            }
            inputCallback(overviewText);
        }
    };
    let content: JSX.Element = <div>{overviewText}</div>;
    if (!inputValue.hasOwnProperty("dispatch")) {
        if (store.getState().armyType === "Beastmen") {
            const leader = store.getState().warbandRoster.find((unit) => unit.skills !== undefined && unit.skills.includes("Leader"));
            if (leader !== undefined) {
                setInputValue({
                    itemName: "experience",
                    dispatch: {
                        type: UPDATE_UNIT,
                        payload: {
                            ...leader,
                            experience: leader.experience + 1,
                        },
                    },
                });
                setOverviewText("Your leader gains +1 Experience");
            }
        } else if ((store.getState().armyType === "Pit Fighter" || store.getState().armyType === "Sisters of Sigmar")) {
            content = <div>You may add a new henchman to your warband, provided you can pay his equipment:</div>;
        } else {
            setOverviewText("Your leader gains +1 Experience");
            content = <InputControl
                input={
                    {
                        itemText: "",
                        itemName: "GoldCoins",
                        amount: DiceEnum["2D6"],
                        type: IExplorationRewardEnum.GoldCoins,
                    }
                }
                callback={setInputValue}
            ></InputControl>;
        }
    }

    return (
        <div>
            {content}
            <button onClick={continueButtonOnClick}>Continue</button>
        </div>
    );
};
