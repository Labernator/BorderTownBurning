import React, { useState } from "react";
import { IAppState, PostSequence } from "../constants";
import { HenchmenInjuryComponent } from "./InjuryComponents/HenchmenInjuryComponent";
import { HeroInjuryComponent } from "./InjuryComponents/HeroInjuryComponent";
import { ExperienceContainer } from "./ExperienceComponents/ExperienceContainer";
import { ExplorationContainer } from "./ExplorationComponents/ExplorationContainer";

export const PostGameSequence = ({ state }: { state: IAppState }) => {
    const [postSequenceStep, setPostSequenceStep] = useState(PostSequence.HENCHMEN_INJURIES);
    const advanceThroughPostBattle = (currentSequence: PostSequence) => {
        setPostSequenceStep(currentSequence);
    };
    switch (postSequenceStep) {
        case PostSequence.HENCHMEN_INJURIES:
            return (
                <div className="PostSequenceContainer">
                    <HenchmenInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HenchmenInjuryComponent>
                </div>
            );
        case PostSequence.HERO_INJURIES:
            return (
                <div className="PostSequenceContainer">
                    <HenchmenInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HenchmenInjuryComponent>
                    <HeroInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HeroInjuryComponent>
                </div>
            );
        case PostSequence.EXPERIENCE:
            return (
                <div className="PostSequenceContainer">
                    <HenchmenInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HenchmenInjuryComponent>
                    <HeroInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HeroInjuryComponent>
                    <ExperienceContainer warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></ExperienceContainer>
                </div>
            );
        case PostSequence.EXPLORATION:
            return (
                <div className="PostSequenceContainer">
                    <HenchmenInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HenchmenInjuryComponent>
                    <HeroInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HeroInjuryComponent>
                    <ExperienceContainer warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></ExperienceContainer>
                    <ExplorationContainer></ExplorationContainer>
                </div>
            );
        default: return (<div className="PostSequenceContainer" />);
    }
};
