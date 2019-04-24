import React, { useState } from "react";
import { getGoldFromWyrdstones } from "../../utilities/utils";
import { store } from "../..";
import { ADD_MONEY_TO_TREASURY, SELL_WYRDSTONES } from "../../actions/StateActions";

export const ExplorationWyrdstoneComponent = ({ finishWorkflow }: { finishWorkflow: any }) => {
    const [wyrdstoneValue, setWyrdstoneValue] = useState("0");
    const [wyrdstoneError, setWyrdstoneError] = useState("");
    const [isOverview, shownOverview] = useState(false);
    const ok = () => {
        store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: getGoldFromWyrdstones(parseInt(wyrdstoneValue, 10)) });
        store.dispatch({ type: SELL_WYRDSTONES, payload: parseInt(wyrdstoneValue, 10) });
        shownOverview(true);
        finishWorkflow();
    };
    const onInput = (e: any) => {
        const re = /^[0-9\b]+$/;
        // tslint:disable-next-line:max-line-length
        if ((e.target.value === "" || re.test(e.target.value) && parseInt(e.target.value, 10) <= store.getState().wyrdstoneShards)) {
            setWyrdstoneValue(e.target.value);
            setWyrdstoneError("");
        } else {
            setWyrdstoneError(`Please enter a value between 0 and ${store.getState().wyrdstoneShards}. You cannot sell more wyrdstone than you have.`);
        }
    };
    const rightSideText = wyrdstoneError !== "" ? wyrdstoneError : ` This will grant you ${getGoldFromWyrdstones(parseInt(wyrdstoneValue, 10))} gold coins.`;
    const content = (overviewMode: boolean) => {
        if (!overviewMode) {
            return (
                <div id="ExplorationChartComponent">
                    <div>How many wyrdstones do you want to sell?</div>
                    <div style={{ paddingTop: 10 }}>
                        <input
                            style={{ float: "left" }}
                            id={"ExplorationRoll"}
                            value={wyrdstoneValue}
                            onChange={onInput}
                        />
                        <button style={{ float: "left" }} onClick={ok}>Ok</button>
                        <div
                            style={{ paddingLeft: 10, float: "right" }}>
                            {rightSideText}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="ExplorationChartComponent">
                    <div
                        style={{ paddingLeft: 10, float: "right" }}>
                        {` You sold ${wyrdstoneValue} Wyrdstones and got ${getGoldFromWyrdstones(parseInt(wyrdstoneValue, 10))} gold coins for your treasury.`}
                    </div>
                </div>
            );
        }
    };

    return (
        content(isOverview)
    );
};
