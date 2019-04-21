import { store } from "../..";
import React from "react";
import { IExportState } from "../../constants";

export const SaveFile = () => {

    const onSaveClick = () => {
        const appState = store.getState();
        const exportState: IExportState = {
            armyType: appState.armyType,
            armyAlignment: appState.armyAlignment,
            armyObjective: appState.armyObjective,
            armyStash: appState.armyStash,
            armyTreasury: appState.armyTreasury,
            armyName: appState.armyName,
            wyrdstoneShards: appState.wyrdstoneShards,
            warbandRating: appState.warbandRating,
            campaignAchievements: appState.campaignAchievements,
            campaignPoints: appState.campaignPoints,
            warbandRoster: appState.warbandRoster,
        };
        saveData(exportState, "warband.json");
    };

    const saveData = (() => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        // a.style = "display: none";
        return (data: any, fileName: any) => {
            const json = JSON.stringify(data);
            const blob = new Blob([json], { type: "octet/stream" });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    })();

    return <button id="saveBtn" className="SaveDataButton" onClick={onSaveClick}>Save file</button>;
};
