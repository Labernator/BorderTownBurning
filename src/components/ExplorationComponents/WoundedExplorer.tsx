import React, { useState } from "react";
import { IInputEvent } from "../../constants";
import { ADD_MONEY_TO_TREASURY, UPDATE_UNIT,  } from "../../actions";
import { store } from "../..";

export const WoundedExplorer = ({ inputCallback }: { inputCallback(value: string): void }) => {
    const [inputValue, setInputValue] = useState("");
    const [explorationType, setExplorationType] = useState("");
    const continueButtonOnClick = () => {
        // get leader and dispatch +1 XP (TODO: Advances)
        if (explorationType === "xp") {
            const leader = store.getState().warbandRoster.find((unit) => unit.skills !== undefined && unit.skills.includes("Leader"));
            if (leader !== undefined) {
                store.dispatch({type: UPDATE_UNIT, payload: { ...leader, experience:  leader.experience + 1 } });
            }
            inputCallback("Leader +1 XP.");
        }
        // add henchman to warband
        if (explorationType === "henchman") {
            // render henchman dialog
        }
        // gain money
        if (explorationType === "gold") {
            store.dispatch({type: ADD_MONEY_TO_TREASURY, payload: parseInt(inputValue, 10)});
            inputCallback("Gained gold.");
        }
    };
    const onInput = (e: IInputEvent) => {
        const re = /^[0-9\b]+$/;
        // tslint:disable-next-line:max-line-length
        if (e.target.value === "" || (re.test(e.target.value))) {
            setInputValue(e.target.value);
        }
    };
    const getcontent = (): JSX.Element => {
        if (store.getState().armyName === "Beastmen") {
            setExplorationType("xp");
            return <div>Your leader gains +1 Experience</div>;
        } else if (store.getState().armyName === "Pit Fighter" || store.getState().armyName === "Sisters of Sigmar") {
            setExplorationType("henchman");
            return <div>You may add a new henchman to your warband, provided you can pay his equipment:</div>;
        } else {
            setExplorationType("gold");
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
