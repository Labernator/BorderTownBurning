import React from "react";
import { IAppState } from "../constants";
import { AppHeaderComponent } from "./UtilityComponents/AppHeaderComponent";
import { TreasuryNumberInputControl } from "./TreasuryNumberInputControl";
import { WyrdstonesComponent } from "./WyrdstonesComponent";

export const ExplorationComponent = ({ state, callback }: { state: IAppState; callback: any }) => (
    <div>
        <AppHeaderComponent title="Army Name: " value={state.armyName}></AppHeaderComponent>
        <AppHeaderComponent title="Army Treasury: " value={state.armyTreasury.toString()}></AppHeaderComponent>
        <TreasuryNumberInputControl></TreasuryNumberInputControl>
        <WyrdstonesComponent></WyrdstonesComponent>
        <button onClick={callback}>Close</button>
    </div>
);
