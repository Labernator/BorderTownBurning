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
import { FileDialogue } from "./components/FileOpenDialog";
function App(props: IAppState) {
    let ArmySizeLimit = 0;
    if (Boolean(props.armyType)) {
        ArmySizeLimit = getArmySizeLimit(props.armyType);
    }
    const unitProps = {
        armyType: props.armyType,
        listOfUnits: props.listOfUnits,
        warbandRoster: props.warbandRoster,
    };
    return (
        <div className="App">
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Army Name:</div>
                <div className="AppHeaderContainerContent">{props.armyName}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Army type:</div>
                <div className="AppHeaderContainerContent">{props.armyType}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Alignment:</div>
                <div className="AppHeaderContainerContent">{props.armyAlignment}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Objective:</div>
                <div className="AppHeaderContainerContent">{props.armyObjective}</div>
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
            <FileDialogue />
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
    armyAlignment: state.armyAlignment,
    armyCampaignPoints: state.armyCampaignPoints,
    armyName: state.armyName,
    armyObjective: state.armyObjective,
    armyStash: state.armyStash,
    armyTreasury: state.armyTreasury,
    armyType: state.armyType,
    armyWyrdstoneShards: state.armyWyrdstoneShards,
    listOfAlignments: state.listOfAlignments,
    listOfObjectives: state.listOfObjectives,
    listOfUnits: state.listOfUnits,
    warbandRating: state.warbandRating,
    warbandRoster: state.warbandRoster,
});

export const AppContainer = connect(mapStateToProps)(App);
