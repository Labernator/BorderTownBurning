import React, { useState } from "react";
import { getWyrdstonesFromExplorationRoll } from "../../utilities/utils";
import { store } from "../..";
import { ADD_WYRDSTONES } from "../../actions/StateActions";

export const ExplorationChartComponent = () => {
    const [explorationValue, setExplorationValue] = useState("");
    const [explorationError, setExplorationError] = useState("");
    const [isOverview, shownOverview] = useState(false);
    const ok = () => {
        store.dispatch({ type: ADD_WYRDSTONES, payload: getWyrdstonesFromInput() });
        shownOverview(true);
    };
    const getWyrdstonesFromInput = () => getWyrdstonesFromExplorationRoll(parseInt(explorationValue, 10));
    const onInput = (e: any) => {
        const re = /^[0-9\b]+$/;
        // tslint:disable-next-line:max-line-length
        if ((e.target.value === "" || re.test(e.target.value) && parseInt(e.target.value, 10) <= 60)) {
            setExplorationValue(e.target.value);
            setExplorationError("");
        } else {
            setExplorationError("The value you are trying to enter is invalid. Please enter a value between 0 and 60");
        }
    };
    const content = (overviewMode: boolean) => {
        if (!overviewMode) {
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
                            style={{ paddingLeft: 10, float: "right" }}>
                            {` This results in ${getWyrdstonesFromInput()} additional Wyrdstones for your warband.`}
                        </div>
                        <div style={{ fontSize: 8, paddingBottom: 8, clear: "both" }}>{explorationError}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="ExplorationChartComponent">
                    <div
                        style={{ paddingLeft: 10, float: "right" }}>
                        {` Your exploration roll was ${explorationValue} which resulted in ${getWyrdstonesFromInput()} wyrdstones for your warband.`}
                    </div>
                </div>
            );
        }
    };

    return (
        content(isOverview)
    );
};
