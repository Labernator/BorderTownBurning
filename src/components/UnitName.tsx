import React from "react";
import { IUnitProps } from "../constants";
import { store } from "..";

export const UnitNameComponent = (props: IUnitProps) => {
    const setName = () => {
        // call dispatch and change the name of this unit
    };

    let unitName = props.unit.name;
    if (unitName === undefined) {
        const unitTypeString = props.unit.type.replace(" ", "_");
        const unitNumber = store.getState().warbandRoster.filter((unit) => unit.type === props.unit.type).length;
        unitName = `${unitTypeString}${unitNumber}`;
    }
    return (
        <div id="Name" style={{ float: "left", width: 200 }}>
            <div style={{ fontWeight: "bold" }}>Name: </div>
            <input onChange={() => setName} value={unitName}></input>
        </div>
    );
};
