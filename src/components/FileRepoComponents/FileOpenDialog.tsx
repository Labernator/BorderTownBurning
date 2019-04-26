import React, { useEffect } from "react";
import * as Actions from "../../actions";
import { store } from "../..";
import { getUnits } from "../../utilities/utils";

export const FileDialogue = () => {

  let fileSelector: HTMLInputElement | undefined;
  const buildFileSelector = () => {
    const fileSelectorer = document.createElement("input");
    fileSelectorer.setAttribute("id", "file");
    fileSelectorer.setAttribute("type", "file");
    fileSelectorer.setAttribute("accept", ".json");
    fileSelectorer.addEventListener("change", onChange);
    return fileSelectorer;
  };
  useEffect(() => {
    fileSelector = buildFileSelector();
  });
  const onChange = (event: any) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  const onReaderLoad = (event: any) => {
    // tslint:disable-next-line: no-console
    console.log(event.target.result);
    const obj = JSON.parse(event.target.result);
    materializeState(obj);
  };

  const handleFileSelect = (e: any) => {
    e.preventDefault();
    if (fileSelector !== undefined) {
      fileSelector.click();
    }
  };
  const materializeState = (jsonObject: any) => {
    store.dispatch({ type: Actions.RESET_APP, payload: 0 });
    // fire actions that adjust the state to reflect the json data
    store.dispatch({ type: Actions.SET_ARMY, payload: jsonObject.type });
    store.dispatch({ type: Actions.SET_ALIGNMENT, payload: jsonObject.alignment });
    store.dispatch({ type: Actions.SET_ARMYNAME, payload: jsonObject.name });
    store.dispatch({ type: Actions.SET_TREASURY, payload: jsonObject.treasury });
    store.dispatch({ type: Actions.SET_WARBAND_RATING, payload: parseInt(jsonObject.rating, 10) });
    store.dispatch({ type: Actions.SET_OBJECTIVE, payload: jsonObject.objective });
    store.dispatch({ type: Actions.RESTRICT_UNITS, payload: getUnits(jsonObject.type) });
    store.dispatch({ type: Actions.SET_WYRDSTONES, payload: jsonObject.wyrdstoneShards });
    store.dispatch({ type: Actions.SET_ACHIEVEMENTS, payload: jsonObject.campaignAchievements });
    store.dispatch({ type: Actions.SET_CAMPAIGN_POINTS, payload: jsonObject.campaignPoints });
    jsonObject.roster.forEach((element: any) => store.dispatch({ type: Actions.ADD_UNIT_TO_ROSTER, payload: element }));
    // tslint:disable-next-line: no-console
    console.log(store.getState());
  };
  return <button id="fileBtn" className="OpenDataButton" onClick={handleFileSelect}>Select Army List</button>;
};
