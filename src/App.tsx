import React from "react";
import { connect } from "react-redux";
import { UnitSummaryContainer } from "./components/UnitComponents/UnitSummaryContainer";
import { IAppState } from "./constants";
import "./App.css";
import { FileDialogue } from "./components/FileRepoComponents/FileOpenDialog";
import { HeaderContainer } from "./components/LayoutComponents/HeaderContainer";
import { PostGameSequence } from "./components/LayoutComponents/PostGameSequence";
import { SaveFile } from "./components/FileRepoComponents/SaveFile";

const App = (props: IAppState) => (
    <div className="App">
        <div id="modal-root"></div>
        <HeaderContainer state={props}></HeaderContainer>
        <div>
            <FileDialogue />
            <SaveFile />
        </div>
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
