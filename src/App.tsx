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
    let ArmySizeLimit: number = 0;
    if (props.selectedArmy) {
        ArmySizeLimit = getArmySizeLimit(props.selectedArmy);
    }
    const moep = {
        listOfUnits: props.listOfUnits,
        warbandRoster: props.warbandRoster,
        selectedArmy: props.selectedArmy
    }
    return (
        <div className="App">
            <div className="AppHeaderContainer"><div className="AppHeaderContainerDiv">Army:</div><div className="AppHeaderContainerContent">{props.selectedArmy}</div></div>
            <div className="AppHeaderContainer"><div className="AppHeaderContainerDiv">Alignment:</div><div className="AppHeaderContainerContent">{props.selectedAlignment}</div></div>
            <div className="AppHeaderContainer"><div className="AppHeaderContainerDiv">Objective:</div><div className="AppHeaderContainerContent">{props.selectedObjective}</div></div>
            <div className="AppHeaderContainer"><div className="AppHeaderContainerDiv">Treasury:</div><div className="AppHeaderContainerContent">{props.armyTreasury}</div></div>
            <div className="AppHeaderContainer"><div className="AppHeaderContainerDiv">Rating:</div><div className="AppHeaderContainerContent">{props.warbandRating}</div></div>
            <div className="AppHeaderContainer"><div className="AppHeaderContainerDiv">Stashed equipment:</div><div className="AppHeaderContainerContent">{props.armyStash}</div></div>
            <div className="AppHeaderContainer"><div className="AppHeaderContainerDiv">Bodies:</div><div className="AppHeaderContainerContent">{props.warbandRoster.length} / {ArmySizeLimit}</div></div>
            <ArmyDropdown></ArmyDropdown>
            <AlignmentDropdown listOfAlignments={props.listOfAlignments}></AlignmentDropdown>
            <ObjectiveDropdown listOfObjectives={props.listOfObjectives}></ObjectiveDropdown>
            <UnitButtons {...moep}></UnitButtons>
            <UnitContainer warbandRoster={props.warbandRoster}></UnitContainer>
        </div>
    )
}

const mapStateToProps = (state: IAppState) => ({
    listOfAlignments: state.listOfAlignments,
    listOfObjectives: state.listOfObjectives,
    listOfUnits: state.listOfUnits,
    selectedArmy: state.selectedArmy,
    selectedAlignment: state.selectedAlignment,
    selectedObjective: state.selectedObjective,
    warbandRoster: state.warbandRoster,
    armyTreasury: state.armyTreasury,
    armyStash: state.armyStash,
    armyCampaignPoints: state.armyCampaignPoints,
    armyWyrdstoneShards: state.armyWyrdstoneShards,
    armyAchievements: state.armyAchievements,
    warbandRating: state.warbandRating
});

export const AppContainer = connect(mapStateToProps)(App);
