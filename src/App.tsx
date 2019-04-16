import React from "react";
import { connect } from "react-redux";
import { UnitContainer } from "./components/RosterUnitContainer";
import { ExplorationComponent } from "./components/ExplorationComponent";
import { IAppState } from "./constants";
import { getArmySizeLimit, getNumberOfWarbandMembers } from "./utilities/utils";
import "./App.css";
import { UnitButtons } from "./components/UnitButtons";
import { FileDialogue } from "./components/FileOpenDialog";
import { SaveFile } from "./components/SaveFile";
import { AppHeaderComponent } from "./components/AppHeaderComponent";
import { Modal } from "./components/Modal";
import { ToggleContent } from "./components/ToggleComponent";

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
            <div id="modal-root"></div>
            <ToggleContent
                toggle={(show: any) =>
                    <button
                        id={`${props.armyName}Exploration`}
                        onClick={(show)}
                        className="EnabledButton">Open Exploration Dialog
                    </button>}
                content={(hide: any) => (
                    <Modal>
                        <ExplorationComponent state={props} callback={hide}></ExplorationComponent>
                    </Modal>
                )}
            />
            <AppHeaderComponent title="Army Name:" value={props.armyName}></AppHeaderComponent>
            <AppHeaderComponent title="Type:" value={props.armyType}></AppHeaderComponent>
            <AppHeaderComponent title="Rating:" value={props.warbandRating.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Alignment:" value={props.armyAlignment}></AppHeaderComponent>
            <AppHeaderComponent title="Objective:" value={props.armyObjective}></AppHeaderComponent>
            <AppHeaderComponent title="Campaign Points:" value={props.campaignPoints.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Campaign Achievements:" value={props.campaignAchievements.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Treasury:" value={props.armyTreasury.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Stash:" value={props.armyStash.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Wyrdstone Shards:" value={props.wyrdstoneShards.toString()}></AppHeaderComponent>
            <AppHeaderComponent title="Member Count" value={warbandMemberCount}></AppHeaderComponent>
            <FileDialogue />
            <SaveFile />
            <UnitButtons {...unitProps}></UnitButtons>
            <UnitContainer warbandRoster={props.warbandRoster}></UnitContainer>
        </div>
    );
}

const mapStateToProps = (state: IAppState) => ({
    armyAlignment: state.armyAlignment,
    armyName: state.armyName,
    armyObjective: state.armyObjective,
    armyStash: state.armyStash,
    armyTreasury: state.armyTreasury,
    armyType: state.armyType,
    campaignAchievements: state.campaignAchievements,
    campaignPoints: state.campaignPoints,
    listOfUnits: state.listOfUnits,
    warbandRating: state.warbandRating,
    warbandRoster: state.warbandRoster,
    wyrdstoneShards: state.wyrdstoneShards,
});

export const AppContainer = connect(mapStateToProps)(App);
