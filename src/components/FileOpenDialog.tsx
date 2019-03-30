import React from "react";
import * as Actions from "../actions";
import { store } from "..";
import { getUnits } from "../utilities/utils";

export class FileDialogue extends React.Component {

  public fileSelector: HTMLInputElement | undefined;
  public buildFileSelector = () => {
    const fileSelectorer = document.createElement("input");
    fileSelectorer.setAttribute("id", "file");
    fileSelectorer.setAttribute("type", "file");
    fileSelectorer.setAttribute("accept", ".json");
    fileSelectorer.addEventListener("change", this.onChange);
    return fileSelectorer;
  }
  public componentDidMount() {
    this.fileSelector = this.buildFileSelector();
  }
  public onChange = (event: any) => {
    const reader = new FileReader();
    reader.onload = this.onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  public onReaderLoad = (event: any) => {
    // tslint:disable-next-line: no-console
    console.log(event.target.result);
    const obj = JSON.parse(event.target.result);
    this.materializeState(obj);
  }

  public handleFileSelect = (e: any) => {
    e.preventDefault();
    if (this.fileSelector !== undefined) {
      this.fileSelector.click();
    }
  }
  public render() {
    return <button id="fileBtn" className="EnabledButton" onClick={this.handleFileSelect}>Select files</button>;
  }

  public materializeState = (jsonObject: any) => {
    // fire actions that adjust the state to reflect the json data
    store.dispatch({ type: Actions.SET_ARMY, payload: jsonObject.type });
    store.dispatch({ type: Actions.SET_ALIGNMENT, payload: jsonObject.alignment });
    store.dispatch({ type: Actions.SET_ARMYNAME, payload: jsonObject.name });
    store.dispatch({ type: Actions.SET_TREASURY, payload: jsonObject.treasury });
    store.dispatch({ type: Actions.SET_WARBAND_RATING, payload: parseInt(jsonObject.rating, 10) });
    store.dispatch({ type: Actions.SET_OBJECTIVE, payload: jsonObject.objective });
    store.dispatch({ type: Actions.RESTRICT_UNITS, payload: getUnits(jsonObject.type) });
    jsonObject.roster.forEach((element: any) => store.dispatch({ type: Actions.ADD_UNIT_TO_ROSTER, payload: element }));
  }
}
