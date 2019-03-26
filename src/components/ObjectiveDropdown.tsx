import Select, { Option } from "rc-select";
import React from "react";
import { connect } from "react-redux";
import "rc-select/assets/index.css";
import { store } from "..";
import { IAppState } from "../constants";
import { SET_OBJECTIVE } from "../actions";

const ODropdown = ({ listOfObjectives }: { listOfObjectives: string[] }) => {
    const dropDownList = listOfObjectives.map((entry) => <Option key={entry} value={entry}>{entry}</Option>);

    const handleChange = (selectedElement: string) => {
        store.dispatch({ type: SET_OBJECTIVE, payload: selectedElement })
    };

    return (
        <div>
            <Select onChange={(selectedElement) => handleChange(selectedElement as string)} style={{ width: 200 }}>
                {dropDownList}
            </Select>
        </div>
    );
};
function mapStateToProps(state: IAppState) { ({ listOfObjectives: state.listOfObjectives }); return {} };
export const ObjectiveDropdown = connect(mapStateToProps)(ODropdown);
