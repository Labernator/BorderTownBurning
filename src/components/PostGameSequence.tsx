import React, { useState } from "react";
import { IAppState, PostSequence } from "../constants";
import { HenchmenInjuryComponent } from "./InjuryComponents/HenchmenInjuryComponent";
import { HeroInjuryComponent } from "./InjuryComponents/HeroInjuryComponent";
import { ExperienceComponent } from "./ExperienceComponents/ExperienceComponent";

export const PostGameSequence = ({ state }: { state: IAppState }) => {
    const [postSequenceStep, setPostSequenceStep] = useState(PostSequence.INJURIES);
    return (
        <div className="PostSequenceContainer">
            <HenchmenInjuryComponent warbandRoster={state.warbandRoster} currentSequence={postSequenceStep}></HenchmenInjuryComponent>
            <HeroInjuryComponent warbandRoster={state.warbandRoster} currentSequence={postSequenceStep}></HeroInjuryComponent>
            <ExperienceComponent warbandRoster={state.warbandRoster} currentSequence={postSequenceStep}></ExperienceComponent>
            {/*<ExplorationComponent></ExplorationComponent>
            <RaresComponent></RaresComponent>
            <HireAndBuyComponent></HireAndBuyComponent> */}
        </div>
    );
};
