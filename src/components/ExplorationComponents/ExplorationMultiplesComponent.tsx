import React, { useState, Component } from "react";
import { getWyrdstonesFromExplorationRoll } from "../../utilities/utils";
import { store } from "../..";
import { ADD_WYRDSTONES } from "../../actions/StateActions";
import { ExplorationSteps } from "./ExplorationContainer";

export const ExplorationMultiplesComponent = ({ finishWorkflow }: { finishWorkflow: any }) => {
    const [explorationValue, setExplorationValue] = useState("");
    const [explorationError, setExplorationError] = useState("");
    const [isOverview, shownOverview] = useState(false);
    const ok = () => {
        // store.dispatch({ type: ADD_WYRDSTONES, payload: getWyrdstonesFromInput() });
        shownOverview(true);
        finishWorkflow(ExplorationSteps.ExplorationMultiples);
    };
    const content = (overviewMode: boolean) => {
        if (!overviewMode) {
            return (
                <div id="ExplorationChartComponent">
                    <div>If you rolled any multiples (doubles, triples, etc.), please select the highest multiple from the list below:</div>
                    <button style={{ clear: "both", float: "left" }} onClick={ok}>Ok</button>
                </div>
            );
        } else {
            return (
                <div id="ExplorationChartComponent">
                    <div>
                        This needs implementation.
                    </div>
                </div>
            );
        }
    };

    return (
        content(isOverview)
    );
};
