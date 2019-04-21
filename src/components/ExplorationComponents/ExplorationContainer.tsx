import React from "react";
import { ExplorationChartComponent } from "./ExplorationChartComponent";

export const ExplorationContainer = () => {
    const continueToNextStep = () => (/*TODO*/"");

    return (
        <div id="ExplorationContainer" className="PostSequenceComponent">
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 3: Exploration </div>
            <ExplorationChartComponent></ExplorationChartComponent>
            <div style={{ display: "grid", paddingTop: 10 }}>
                <button className={"ContinueButton"} style={{ display: "grid", clear: "both" }} onClick={continueToNextStep}>Continue</button>
            </div>
        </div>
    );
};
