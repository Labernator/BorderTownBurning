import React from "react";
import { store } from "..";
import { AppHeaderComponent } from "./UtilityComponents/AppHeaderComponent";
import { ADD_WYRDSTONES, SELL_WYRDSTONES } from "../actions";
import { WyrdstoneNumberInputControl } from "./WyrdstoneNumberInputControl";

export const WyrdstonesComponent = () => (
    <div>
        <AppHeaderComponent title="Army Wyrdstones: " value={store.getState().wyrdstoneShards.toString()}></AppHeaderComponent>
        <WyrdstoneNumberInputControl
            title={"Add additional wyrdstones to treasury:"}
            id={`${store.getState().armyName}AddWyrdstones`}
            actionType={ADD_WYRDSTONES}>
        </WyrdstoneNumberInputControl>
        <WyrdstoneNumberInputControl
            title={"Sell wyrdstones:"}
            id={`${store.getState().armyName}SellWyrdstones`}
            actionType={SELL_WYRDSTONES}>
        </WyrdstoneNumberInputControl>
    </div>
);
