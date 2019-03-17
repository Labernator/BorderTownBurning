
import Select, { Option } from "rc-select";
import "rc-select/assets/index.css";
import React from "react";
import { connect } from "react-redux";
import { store } from "..";
import { SET_ALIGNMENT } from "../actions";
import { ISelectionState } from "../constants";
const AlDropdown = ({ listOfAlignments }: { listOfAlignments: string[] }) => {
    const dropDownList = listOfAlignments.map((entry) => <Option key={entry} value={entry}>{entry}</Option>);

    const handleChange = (selectedElement: string) => {
        store.dispatch({ type: SET_ALIGNMENT, payload: selectedElement })
    }

    return (
        <div>
            <Select onChange={(selectedElement) => handleChange(selectedElement as string)} style={{ width: 200 }}>
                {dropDownList}
            </Select>
        </div>
    );
}

function mapStateToProps(state: ISelectionState) { ({ listOfAlignments: state.listOfAlignments }); return {} };
export const AlignmentDropdown = connect(mapStateToProps)(AlDropdown);
