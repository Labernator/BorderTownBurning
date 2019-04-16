import React from "react";
import { IUnit } from "../constants";
import { store } from "..";

export const UnitNameComponent = ({ unit }: { unit: IUnit }) => {
    const setName = () => {
        // call dispatch and change the name of this unit
    };
    // on hover show a pencil icon which can be used to change the name
    const generateNameField = () => {
        let unitName = unit.name;
        if (unitName === undefined) {
            const unitTypeString = unit.type.replace(" ", "_");
            const unitNumber = store.getState().warbandRoster.filter((warbandUnit) => warbandUnit.type === unit.type).length;
            unitName = `${unitTypeString}${unitNumber}`;
        }
        return <div >{unitName}</div>;
    };
    return (
        <div id="Name" style={{ float: "left", paddingLeft: 5, paddingRight: 5 }}>
            <div style={{ fontWeight: "bold" }}>Name: </div>
            {generateNameField()}
        </div>
    );
};
