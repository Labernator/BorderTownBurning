import React, { useState } from "react";
import { getWyrdstonesFromExplorationRoll } from "../../utilities/utils";

export const ExplorationChartComponent = () => {
    const [explorationValue, setExplorationValue] = useState("");
    const [explorationError, setExplorationError] = useState("");
    const ok = () => (/*TODO*/"");
    const onInput = (e: any) => {
        const re = /^[0-9\b]+$/;
        // tslint:disable-next-line:max-line-length
        if ((e.target.value === "" || re.test(e.target.value) && parseInt(e.target.value, 10) < 99)) {
            setExplorationValue(e.target.value);
            setExplorationError("");
        } else {
            setExplorationError("The value you are trying to enter is invalid. Please enter a value between 0 and 99");
        }
    };
    return (
        <div id="ExplorationChartComponent">
            <div>Roll a dice for every hero that survived the battle (roll an additional dice if you won) and enter the value in the input field below:</div>
            <div style={{ paddingTop: 10 }}>
                <input
                    style={{ float: "left" }}
                    id={"ExplorationRoll"}
                    value={explorationValue}
                    onChange={onInput}
                />
                <button style={{ float: "left" }} onClick={ok}>Ok</button>
                <div
                    style={{ float: "left", clear: "both" }}>
                    {` This results in ${getWyrdstonesFromExplorationRoll(parseInt(explorationValue, 10))} additional Wyrdstones for your warband.`}
                </div>
            </div>
            <div style={{ fontSize: 8, paddingBottom: 8 }}>{explorationError}</div>
        </div>
    );
};
