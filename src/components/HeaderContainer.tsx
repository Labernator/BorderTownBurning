import React from "react";
import { IAppState } from "../constants";
import { getNumberOfWarbandMembers, getArmySizeLimit } from "../utilities/utils";
import { AppHeaderComponent } from "./AppHeaderComponent";

export const HeaderContainer = ({ state }: { state: IAppState }) => {
    const warbandMemberCount = `${getNumberOfWarbandMembers(state.warbandRoster)} / ${getArmySizeLimit(state.armyType)}`;
    if (state.armyName !== "") {
        return (
            <div className="row"><details>
                <summary className="AppHeaderContainerDiv">Click here to show/side Army Summary:</summary>
                <div className="column">
                    <AppHeaderComponent title="Army Name:" value={state.armyName}></AppHeaderComponent>
                    <AppHeaderComponent title="Type:" value={state.armyType}></AppHeaderComponent>
                    <AppHeaderComponent title="Alignment:" value={state.armyAlignment}></AppHeaderComponent>
                    <AppHeaderComponent title="Rating:" value={state.warbandRating.toString()}></AppHeaderComponent>
                    <AppHeaderComponent title="Member Count:" value={warbandMemberCount}></AppHeaderComponent>
                </div >
                <div className="column">
                    <AppHeaderComponent title="Objective:" value={state.armyObjective}></AppHeaderComponent>
                    <AppHeaderComponent title="Campaign Points:" value={state.campaignPoints.toString()}></AppHeaderComponent>
                    <AppHeaderComponent title="Campaign Achievements:" value={state.campaignAchievements.toString()}></AppHeaderComponent>
                </div>
                <div className="column">
                    <AppHeaderComponent title="Treasury:" value={state.armyTreasury.toString()}></AppHeaderComponent>
                    <AppHeaderComponent title="Wyrdstone Shards:" value={state.wyrdstoneShards.toString()}></AppHeaderComponent>
                    <AppHeaderComponent title="Stash:" value={state.armyStash.toString()}></AppHeaderComponent>
                </div>
            </details>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
};
