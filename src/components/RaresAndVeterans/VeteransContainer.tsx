import React, { useState } from "react";
import { store } from "../..";
import { SET_VETERAN_EXPERIENCE } from "../../actions";
import { PostSequence } from "../../constants";

export const VeteransContainer = ({ callback }: { callback: any }) => {
    const [veteransValue, setVeteransValue] = useState(0);
    const [veteransError, setVeteransError] = useState("");
    const [isOverview, shownOverview] = useState(false);
    const continueToNextStep = () => {
        store.dispatch({ type: SET_VETERAN_EXPERIENCE, payload: veteransValue });
        shownOverview(true);
        callback(PostSequence.VETERANS);
    };
    const onInput = (e: any) => {
        const re = /^[0-9\b]+$/;
        // tslint:disable-next-line:max-line-length
        if ((e.target.value === "" || re.test(e.target.value) && parseInt(e.target.value, 10) <= 12)) {
            setVeteransValue(parseInt(e.target.value, 10));
            setVeteransError("");
        } else {
            setVeteransError("Please enter a value between 1 and 12.");
        }
    };
    const content = !isOverview ? (
        <div>
            <div>Roll 2D6 to see how much experience your new recruits may have:</div>
            <input
                style={{ float: "left" }}
                id={"ExplorationRoll"}
                value={veteransValue}
                onChange={onInput}
            ></input>
            <div style={{ paddingLeft: 10, float: "left" }}>
                <button className={"ContinueButton"} style={{ clear: "both" }} onClick={continueToNextStep}>Ok</button>
            </div>
            <div style={{ clear: "both" }}>{veteransError}</div>
        </div>
    ) : <div>You have {veteransValue} experience available for hiring new recruits.</div>;
    return (
        <div id="ExplorationContainer" className="PostSequenceComponent">
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 4: Available Veterans</div>
            {content}
        </div>
    );
};
