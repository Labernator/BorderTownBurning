import React from "react";
import { connect } from "react-redux";
import { UnitSummaryContainer } from "./components/UnitComponents/UnitSummaryContainer";
import { IAppState } from "./constants";
import "./App.css";
import { FileDialogue } from "./components/FileRepoComponents/FileOpenDialog";
import { HeaderContainer } from "./components/HeaderContainer";
import { PostGameSequence } from "./components/PostGameSequence";
import { SaveFile } from "./components/FileRepoComponents/SaveFile";

const App = (props: IAppState) => (
    <div className="App">
        <div id="modal-root"></div>
        <div>
            <FileDialogue />
            <SaveFile />
        </div>
        <HeaderContainer state={props}></HeaderContainer>
        <UnitSummaryContainer warbandRoster={props.warbandRoster}></UnitSummaryContainer>
        <PostGameSequence state={props}></PostGameSequence>
        {/* <UnitButtons {...unitProps}></UnitButtons> */}
    </div>
);

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
