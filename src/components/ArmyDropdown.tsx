import Select, { Option } from "rc-select";
import React from "react";
import { connect } from "react-redux";
import "rc-select/assets/index.css";
import { store } from "..";
import * as Actions from "../actions";
import { getArmyList, getRestrictedAlignmentList, getRestrictedObjectiveList, getUnits, getArmyTreasury } from "../utilities/utils";

const ArDropdown = () => {
    const armyList = getArmyList();
    const dropDownList = armyList.map((armyName) => <Option key={armyName} value={armyName}>{armyName}</Option>);

    const handleChange = (selectedElement: string) => {
        store.dispatch({ type: Actions.SET_ARMY, payload: selectedElement });
        store.dispatch({ type: Actions.SET_ALIGNMENT, payload: "" });
        store.dispatch({ type: Actions.SET_OBJECTIVE, payload: "" });
        store.dispatch({ type: Actions.RESET_TREASURY, payload: 0 });
        store.dispatch({ type: Actions.ADD_MONEY_TO_TREASURY, payload: getArmyTreasury(selectedElement) });
        store.dispatch({ type: Actions.RESTRICT_ALIGNMENTS, payload: getRestrictedAlignmentList(selectedElement) });
        store.dispatch({ type: Actions.RESTRICT_OBJECTIVES, payload: getRestrictedObjectiveList(selectedElement) });
        store.dispatch({ type: Actions.RESTRICT_UNITS, payload: getUnits(selectedElement) });
    };

    return (
        <div>
            <Select onChange={(selectedElement) => handleChange(selectedElement as string)} style={{ width: 200 }}>
                {dropDownList}
            </Select>
        </div>
    );
};

export const ArmyDropdown = connect()(ArDropdown);
