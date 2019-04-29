import React from "react";
import { IAppState } from "../../constants";
import { getNumberOfWarbandMembers, getArmySizeLimit, getWarbandRating } from "../../utilities/utils";
import { AppHeaderComponent } from "../UtilityComponents/AppHeaderComponent";
import { ArmyStashContainer } from "./ArmyStashContainer";

export const HeaderContainer = ({ state }: { state: IAppState }) => {
    const warbandMemberCount = `${getNumberOfWarbandMembers(state.warbandRoster)} / ${getArmySizeLimit(state.armyType)}`;
    if (state.armyName !== "") {
        return (
            <div className="row"><details>
                <summary className="AppHeaderContainerDiv">Click here to show/side Army Summary:</summary>
                <div className="column">
                    <AppHeaderComponent title="Army Name:" value={state.armyName} />
                    <AppHeaderComponent title="Type:" value={state.armyType} />
                    <AppHeaderComponent title="Alignment:" value={state.armyAlignment} />
                    <AppHeaderComponent title="Rating:" value={getWarbandRating(state.warbandRoster).toString()} />
                    <AppHeaderComponent title="Member Count:" value={warbandMemberCount} />
                </div >
                <div className="column">
                    <AppHeaderComponent title="Objective:" value={state.armyObjective} />
                    <AppHeaderComponent title="Campaign Points:" value={state.campaignPoints.toString()} />
                    <AppHeaderComponent title="Campaign Achievements:" value={state.campaignAchievements.toString()} />
                    <AppHeaderComponent title="Veterans Experience available:" value={state.veteranExperience.toString()} />
                </div>
                <div className="column">
                    <AppHeaderComponent title="Treasury:" value={state.armyTreasury.toString()} />
                    <AppHeaderComponent title="Wyrdstone Shards:" value={state.wyrdstoneShards.toString()} />
                    <ArmyStashContainer stash={state.armyStash} />
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
