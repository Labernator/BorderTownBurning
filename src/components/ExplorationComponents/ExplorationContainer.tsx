import React, { useState } from "react";
import { ExplorationChartComponent } from "./ExplorationChartComponent";
import { ExplorationMultiplesComponent } from "./ExplorationMultiplesComponent";
import { ExplorationWyrdstoneComponent } from "./ExplorationWyrdstoneComponent";
import { PostSequence } from "../../constants";

export enum ExplorationSteps {
    ExplorationChart,
    ExplorationMultiples,
    SellWyrdstones,
    allDone,
}

export const ExplorationContainer = ({ callback }: { callback: any }) => {
    const [currentStep, setCurrentStep] = useState(ExplorationSteps.ExplorationChart);
    const continueToNextSupStep = (nextStep: ExplorationSteps) => {
        setCurrentStep(nextStep);
    };
    const continueToNextStep = () => {
        callback(PostSequence.VETERANS);
    };

    const getSubComponents = () => {
        switch (currentStep) {
            case ExplorationSteps.ExplorationChart:
                return <div><ExplorationChartComponent finishWorkflow={continueToNextSupStep} /></div>;
            case ExplorationSteps.ExplorationMultiples:
                return (
                    <div>
                        <ExplorationChartComponent finishWorkflow={continueToNextSupStep} />
                        <ExplorationMultiplesComponent finishWorkflow={continueToNextSupStep} />
                    </div>);
            case ExplorationSteps.SellWyrdstones:
                return (
                    <div>
                        <ExplorationChartComponent finishWorkflow={continueToNextSupStep} />
                        <ExplorationMultiplesComponent finishWorkflow={continueToNextSupStep} />
                        <ExplorationWyrdstoneComponent finishWorkflow={continueToNextStep} />
                    </div>);
            default:
                return <div></div>;
        }
    };
    return (
        <div id="ExplorationContainer" className="PostSequenceComponent">
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 3: Exploration </div>
            {getSubComponents()}
            {/* <div style={{ display: "grid", paddingTop: 10, clear: "both" }}>
                <button className={"ContinueButton"} style={{ display: "grid", clear: "both" }} onClick={continueToNextStep}>Continue</button>
            </div> */}
        </div>
    );
};
