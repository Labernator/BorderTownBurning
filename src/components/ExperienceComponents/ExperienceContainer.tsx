import React, { useState } from "react";
import { IUnit, PostSequence } from "../../constants";
import { AddExperienceButton } from "./AddExperienceButton";

export const ExperienceContainer = ({ warbandRoster, callback }: { warbandRoster: IUnit[]; callback: any }) => {
    const [isOverviewMode, setOverviewMode] = useState(false);
    const continueToNextStep = () => {
        callback(PostSequence.EXPLORATION);
        setOverviewMode(true);
    };
    const updateCallback = (unit: IUnit) => {
        console.log(unit);
    };
    const unitList = warbandRoster.map((unit) => (
        <div key={`${unit.name}AddExp`} id={`${unit.name}AddExp`} className="ExperienceUnitContainer">
            <div style={{ paddingLeft: 10, float: "left" }}>{unit.name}</div>
            <AddExperienceButton unit={unit}>+</AddExperienceButton>
        </div>
    ));
    const content = isOverviewMode ?
        <div>This is a summary</div> :
        <div>
            {unitList}
            <div style={{ display: "grid", paddingTop: 10 }}>
                <button className={"ContinueButton"} style={{ display: "grid" }} onClick={continueToNextStep}>Continue</button>
            </div>
        </div>;
    return (
        <div id="ExperienceContainer" className="PostSequenceComponent">
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 2: Allocate Experience </div>
            {content}
        </div>
    );
};
