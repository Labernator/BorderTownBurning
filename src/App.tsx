import React from "react";
import { connect } from "react-redux";
import { UnitContainer } from "./components/RosterUnitContainer";
import { IAppState } from "./constants";
import { getArmySizeLimit, getNumberOfWarbandMembers } from "./utilities/utils";
import "./App.css";
import { UnitButtons } from "./components/UnitButtons";
import { FileDialogue } from "./components/FileOpenDialog";
import { SaveFile } from "./components/SaveFile";
import { AppHeaderComponent } from "./components/AppHeaderComponent";

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

    const warbandMemberCount = `${getNumberOfWarbandMembers(props.warbandRoster)} / ${ArmySizeLimit}`;
    return (
        <div className="App">
            <AppHeaderComponent title="Army Name:" value={props.armyName}></AppHeaderComponent>
            <AppHeaderComponent title="Type:" value={props.armyName}></AppHeaderComponent>
            <AppHeaderComponent title="Rating:" value={props.warbandRating.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Alignment:" value={props.armyName}></AppHeaderComponent>
            <AppHeaderComponent title="Objective:" value={props.armyName}></AppHeaderComponent>
            <AppHeaderComponent title="Campaign Points:" value={props.campaignPoints.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Campaign Achievements:" value={props.campaignAchievements.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Army Name:" value={props.armyName}></AppHeaderComponent>
            <AppHeaderComponent title="Treasury:" value={props.armyTreasury.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Wyrdstone Shards:" value={props.wyrdstoneShards.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Stash:" value={props.armyStash.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Wyrdstone Shards:" value={props.wyrdstoneShards.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Member Count" value={warbandMemberCount}></AppHeaderComponent>
            <FileDialogue />
            <SaveFile/>
            <UnitButtons {...unitProps}></UnitButtons>
            <UnitContainer warbandRoster={props.warbandRoster}></UnitContainer>
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    appMode: state.appMode,
    campaignAchievements: state.campaignAchievements,
    armyAlignment: state.armyAlignment,
    campaignPoints: state.campaignPoints,
    armyName: state.armyName,
    armyObjective: state.armyObjective,
    armyStash: state.armyStash,
    armyTreasury: state.armyTreasury,
    armyType: state.armyType,
    wyrdstoneShards: state.wyrdstoneShards,
    listOfUnits: state.listOfUnits,
    warbandRating: state.warbandRating,
    warbandRoster: state.warbandRoster,
});

export const AppContainer = connect(mapStateToProps)(App);
