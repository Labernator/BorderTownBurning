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
import { HeaderContainer } from "./components/HeaderContainer";
import { PostGameSequence } from "./components/PostGameSequence";

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
            {/* <ToggleContent
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
            /> */}
            <FileDialogue />
            <HeaderContainer state={props}></HeaderContainer>
            <UnitContainer warbandRoster={props.warbandRoster}></UnitContainer>
            <PostGameSequence state={props}></PostGameSequence>
            {/* <SaveFile /> */}
            {/* <UnitButtons {...unitProps}></UnitButtons> */}
            {/* <ArmyListComponent warbandRoster={props.warbandRoster}></ArmyListComponent> */}
            {/* {<UnitContainer warbandRoster={props.warbandRoster}></UnitContainer>} */}
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
