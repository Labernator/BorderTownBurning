import React from "react";
import { connect } from "react-redux";
import { UnitContainer } from "./components/RosterUnitContainer";
import { IAppState } from "./constants";
import { getArmySizeLimit } from "./utilities/utils";
import "./App.css";
import { UnitButtons } from "./components/UnitButtons";
import { FileDialogue } from "./components/FileOpenDialog";
import { SaveFile } from "./components/SaveFile";

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

    const getNumberOfWarbandMembers = () => {
        let unitCount = 0;
        props.warbandRoster.map((unit) => {
            if (unit.isHero || unit.number === undefined) {
                unitCount++;
            } else {
                unitCount += unit.number;
            }
        });
        return unitCount;
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
                <div className="AppHeaderContainerContent">{getNumberOfWarbandMembers()} / {ArmySizeLimit}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Wyrdstone Shards:</div>
                <div className="AppHeaderContainerContent">{props.wyrdstoneShards}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Campaign Points:</div>
                <div className="AppHeaderContainerContent">{props.campaignPoints}</div>
            </div>
            <div className="AppHeaderContainer">
                <div className="AppHeaderContainerDiv">Campaign Achievements:</div>
                <div className="AppHeaderContainerContent">{props.campaignAchievements}</div>
            </div>
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
