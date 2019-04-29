import React, { useState } from "react";
import { IInputEvent, IExplorationReward, IExplorationRewardEnum, IInputValueTypes } from "../../constants";
import { ADD_MONEY_TO_TREASURY, ADD_ITEMS_TO_STASH } from "../../actions";
import { store } from "../..";

export const WoundedExplorer = ({ inputCallback }: { inputCallback(value: string): void }) => {
    const [inputValue, setInputValue] = useState([] as IInputValueTypes[]);
    const continueButtonOnClick = () => {
        // get leader and dispatch +1 EXP (mit allem was dazugehört [advances etc.])

        // add henchman to warband

        // gain money
    };
    const getcontent = (): JSX.Element => {
        if (store.getState().armyName === "Beastmen") {
            return <div>Your leader gains +1 Experience</div>;
        } else if (store.getState().armyName === "Pit Fighter" || store.getState().armyName === "Sisters of Sigmar") {
            return <div>You may add a new henchman to your warband, provided you can pay his equipment:</div>;
        } else {
            return <input value={"2D6"}></input>;
        }
    };

    return (
        <div>
            {getcontent()}
            <button onClick={continueButtonOnClick}>Continue</button>
        </div>
    );
};
