import React from "react";
import { IAppState, PostSequence } from "../../constants";
import { HenchmenInjuryComponent } from "../InjuryComponents/HenchmenInjuryComponent";
import { HeroInjuryComponent } from "../InjuryComponents/HeroInjuryComponent";
import { ExperienceContainer } from "../ExperienceComponents/ExperienceContainer";
import { ExplorationContainer } from "../ExplorationComponents/ExplorationContainer";
import { VeteransContainer } from "../RaresAndVeterans/VeteransContainer";
import { store } from "../..";
import { SET_CURRENT_STEP } from "../../actions";

export const PostGameSequence = ({ state }: { state: IAppState }) => {
    const advanceThroughPostBattle = (currentSequence: PostSequence) => {
        store.dispatch({ type: SET_CURRENT_STEP, payload: currentSequence });
    };
    switch (state.currentStep) {
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
                    <ExplorationContainer callback={advanceThroughPostBattle}></ExplorationContainer>
                </div>
            );
        case PostSequence.VETERANS:
            return (
                <div className="PostSequenceContainer">
                    <HenchmenInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HenchmenInjuryComponent>
                    <HeroInjuryComponent warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></HeroInjuryComponent>
                    <ExperienceContainer warbandRoster={state.warbandRoster} callback={advanceThroughPostBattle}></ExperienceContainer>
                    <ExplorationContainer callback={advanceThroughPostBattle}></ExplorationContainer>
                    <VeteransContainer callback={advanceThroughPostBattle}></VeteransContainer>
                </div>
            );
        default: return (<div className="PostSequenceContainer" />);
    }
};
