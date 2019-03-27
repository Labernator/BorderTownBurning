import React from "react";
import { connect } from "react-redux";
import { AlignmentDropdown } from "./components/AlignmentDropdown";
import { ArmyDropdown } from "./components/ArmyDropdown";
import { ObjectiveDropdown } from "./components/ObjectiveDropdown";
import { UnitContainer } from "./components/RosterUnitContainer";
import { IAppState } from "./constants";
import { getArmySizeLimit } from "./utilities/utils";
import "./App.css";
import { UnitButtons } from "./components/UnitButtons";
function App(props: IAppState) {
    let ArmySizeLimit = 0;
    if (Boolean(props.selectedArmy)) {
        ArmySizeLimit = getArmySizeLimit(props.selectedArmy);
    }
    const unitProps = {
        listOfUnits: props.listOfUnits,
        selectedArmy: props.selectedArmy,
        warbandRoster: props.warbandRoster,
    };
    return (
        <div className="App">
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Army:</div>
                <div className="AppHeaderContainerContent">{props.selectedArmy}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Alignment:</div>
                <div className="AppHeaderContainerContent">{props.selectedAlignment}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Objective:</div>
                <div className="AppHeaderContainerContent">{props.selectedObjective}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Treasury:</div>
                <div className="AppHeaderContainerContent">{props.armyTreasury}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Rating:</div>
                <div className="AppHeaderContainerContent">{props.warbandRating}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Stashed equipment:</div>
                <div className="AppHeaderContainerContent">{props.armyStash}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Bodies:</div>
                <div className="AppHeaderContainerContent">{props.warbandRoster.length} / {ArmySizeLimit}</div>
            </div>
            <ArmyDropdown></ArmyDropdown>
            <AlignmentDropdown listOfAlignments={props.listOfAlignments}></AlignmentDropdown>
            <ObjectiveDropdown listOfObjectives={props.listOfObjectives}></ObjectiveDropdown>
            <UnitButtons {...unitProps}></UnitButtons>
            <UnitContainer warbandRoster={props.warbandRoster}></UnitContainer>
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    armyAchievements: state.armyAchievements,
    armyCampaignPoints: state.armyCampaignPoints,
    armyStash: state.armyStash,
    armyTreasury: state.armyTreasury,
    armyWyrdstoneShards: state.armyWyrdstoneShards,
    listOfAlignments: state.listOfAlignments,
    listOfObjectives: state.listOfObjectives,
    listOfUnits: state.listOfUnits,
    selectedAlignment: state.selectedAlignment,
    selectedArmy: state.selectedArmy,
    selectedObjective: state.selectedObjective,
    warbandRating: state.warbandRating,
    warbandRoster: state.warbandRoster,
});

export const AppContainer = connect(mapStateToProps)(App);
