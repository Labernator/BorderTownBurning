import React from "react";
import { connect } from "react-redux";
import { AlignmentDropdown } from "./components/AlignmentDropdown";
import { ArmyDropdown } from "./components/ArmyDropdown";
import { ObjectiveDropdown } from "./components/ObjectiveDropdown";
import { UnitContainer } from "./components/RosterUnitContainer";
import { ISelectionState } from "./constants";
import { getArmySizeLimit } from "./utilities/utils";
import "./App.css";
import { UnitButtons } from "./components/UnitButtons";
function App(props: ISelectionState) {
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
            <div style={{ display: "inline-flex" }}><div style={{ fontWeight: "bold", fontSize: 16 }}>Army:</div><div style={{ marginLeft: 8, marginRight: 8, fontWeight: "normal", fontSize: 16 }}>{props.selectedArmy}</div></div>
            <div style={{ display: "inline-flex" }}><div style={{ fontWeight: "bold", fontSize: 16 }}>Alignment:</div><div style={{ marginLeft: 8, marginRight: 8, fontWeight: "normal", fontSize: 16 }}>{props.selectedAlignment}</div></div>
            <div style={{ display: "inline-flex" }}><div style={{ fontWeight: "bold", fontSize: 16 }}>Objective:</div><div style={{ marginLeft: 8, marginRight: 8, fontWeight: "normal", fontSize: 16 }}>{props.selectedObjective}</div></div>
            <div style={{ display: "inline-flex" }}><div style={{ fontWeight: "bold", fontSize: 16 }}>Treasury:</div><div style={{ marginLeft: 8, marginRight: 8, fontWeight: "normal", fontSize: 16 }}>{props.armyTreasury}</div></div>
            <div style={{ display: "inline-flex" }}><div style={{ fontWeight: "bold", fontSize: 16 }}>Rating:</div><div style={{ marginLeft: 8, marginRight: 8, fontWeight: "normal", fontSize: 16 }}>{props.warbandRating}</div></div>
            <div style={{ display: "inline-flex" }}><div style={{ fontWeight: "bold", fontSize: 16 }}>Stashed equipment:</div><div style={{ marginLeft: 8, marginRight: 8, fontWeight: "normal", fontSize: 16 }}>{props.armyStash}</div></div>
            <div style={{ display: "inline-flex" }}><div style={{ fontWeight: "bold", fontSize: 16 }}>Bodies:</div><div style={{ marginLeft: 8, marginRight: 8, fontWeight: "normal", fontSize: 16 }}>{props.warbandRoster.length} / {ArmySizeLimit}</div></div>
            <ArmyDropdown></ArmyDropdown>
            <AlignmentDropdown listOfAlignments={props.listOfAlignments}></AlignmentDropdown>
            <ObjectiveDropdown listOfObjectives={props.listOfObjectives}></ObjectiveDropdown>
            <UnitButtons {...moep}></UnitButtons>
            <UnitContainer warbandRoster={props.warbandRoster}></UnitContainer>
        </div>
    )
}

const mapStateToProps = (state: ISelectionState) => ({
    listOfAlignments: state.listOfAlignments,
    listOfObjectives: state.listOfObjectives,
    listOfUnits: state.listOfUnits,
    selectedArmy: state.selectedArmy,
    selectedAlignment: state.selectedAlignment,
    selectedObjective: state.selectedObjective,
    warbandRoster: state.warbandRoster,
    armyTreasury: state.armyTreasury,
    armyStash: state.armyStash,
    selectedUnit: state.selectedUnit,
    armyCampaignPoints: state.armyCampaignPoints,
    armyWyrdstoneShards: state.armyWyrdstoneShards,
    armyAchievements: state.armyAchievements,
    warbandRating: state.warbandRating
});

export const AppContainer = connect(mapStateToProps)(App);
