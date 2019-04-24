import React, { useState } from "react";

export const ExplorationContainer = () => {
    const continueToNextStep = () => {/* todo */ };
    return (
        <div id="ExplorationContainer" className="PostSequenceComponent">
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 3: Exploration </div>
            <input></input>
            <div style={{ display: "grid", paddingTop: 10, clear: "both" }}>
                <button className={"ContinueButton"} style={{ display: "grid", clear: "both" }} onClick={continueToNextStep}>Continue</button>
            </div>
        </div>
    );
};
