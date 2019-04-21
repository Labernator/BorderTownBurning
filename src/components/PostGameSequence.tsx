import React, { useState } from "react";
import { IAppState, PostSequence } from "../constants";
import { HenchmenInjuryComponent } from "./InjuryComponents/HenchmenInjuryComponent";
import { HeroInjuryComponent } from "./InjuryComponents/HeroInjuryComponent";
import { ExperienceContainer } from "./ExperienceComponents/ExperienceContainer";
import { ExplorationContainer } from "./ExplorationComponents/ExplorationContainer";

export const PostGameSequence = ({ state }: { state: IAppState }) => {
    const [postSequenceStep, setPostSequenceStep] = useState(PostSequence.INJURIES);
    return (
        <div className="PostSequenceContainer">
            <HenchmenInjuryComponent warbandRoster={state.warbandRoster} currentSequence={postSequenceStep}></HenchmenInjuryComponent>
            <HeroInjuryComponent warbandRoster={state.warbandRoster} currentSequence={postSequenceStep}></HeroInjuryComponent>
            <ExperienceContainer warbandRoster={state.warbandRoster} currentSequence={postSequenceStep}></ExperienceContainer>
            <ExplorationContainer></ExplorationContainer>
            {/*<RaresComponent></RaresComponent>
            <HireAndBuyComponent></HireAndBuyComponent> */}
        </div>
    );
};
