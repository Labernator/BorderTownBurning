import Select, { Option } from "rc-select";
import React from "react";
import { connect } from "react-redux";
import "rc-select/assets/index.css";
import { store } from "..";
import { RESTRICT_ALIGNMENTS, RESTRICT_OBJECTIVES, SET_ALIGNMENT, SET_ARMY, SET_OBJECTIVE, RESTRICT_UNITS, ADD_MONEY_TO_TREASURY, RESET_TREASURY } from "../actions";
import { getArmyList, getRestrictedAlignmentList, getRestrictedObjectiveList, getUnits, getArmyTreasury } from "../utilities/utils";

const ArDropdown = () => {
    const armyList = getArmyList();
    const dropDownList = armyList.map((armyName) => <Option key={armyName} value={armyName}>{armyName}</Option>);

    const handleChange = (selectedElement: string) => {
        store.dispatch({ type: SET_ARMY, payload: selectedElement });
        store.dispatch({ type: SET_ALIGNMENT, payload: "" });
        store.dispatch({ type: SET_OBJECTIVE, payload: "" });
        store.dispatch({ type: RESET_TREASURY, payload: 0 });
        store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: getArmyTreasury(selectedElement) });
        store.dispatch({ type: RESTRICT_ALIGNMENTS, payload: getRestrictedAlignmentList(selectedElement) });
        store.dispatch({ type: RESTRICT_OBJECTIVES, payload: getRestrictedObjectiveList(selectedElement) });
        store.dispatch({ type: RESTRICT_UNITS, payload: getUnits(selectedElement) });
        // tslint:disable-next-line:no-console
        console.log(store.getState());
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
