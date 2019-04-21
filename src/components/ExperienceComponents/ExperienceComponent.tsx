import React from "react";
import { IUnit, PostSequence } from "../../constants";
import { AddExperienceButton } from "./AddExperienceButton";

export const ExperienceComponent = ({ warbandRoster, currentSequence }: { warbandRoster: IUnit[]; currentSequence: PostSequence }) => {
    const content = warbandRoster.map((unit) => (
        <div key={`${unit.name}AddExp`} id={`${unit.name}AddExp`} className="ExperienceUnitContainer">
            <div style={{ paddingLeft: 10, float: "left" }}>{unit.name}</div>
            <AddExperienceButton unit={unit}>+</AddExperienceButton>
        </div>
    ));

    return (
        <div id="ExperienceContainer" className="PostSequenceContainer">
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 2: Allocate Experience </div>
            {content}
        </div>
    );
};
