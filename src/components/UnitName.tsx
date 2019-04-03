import React from "react";
import { IUnitEquipment } from "../constants";
import { store } from "..";
export class UnitName extends React.Component<IUnitEquipment> {
    constructor(props: IUnitEquipment) {
        super(props);
    }
    public render() {
        let unitName = this.props.unit.name;
        if (unitName === undefined) {
            const unitTypeString = this.props.unit.type.replace(" ", "_");
            const unitNumber = store.getState().warbandRoster.filter((unit) => unit.type === this.props.unit.type).length;
            unitName = `${unitTypeString}${unitNumber}`;
        }
        return (
            <div id="Name" style={{ float: "left", width: 200 }}>
                <div style={{ fontWeight: "bold" }}>Name: </div>
                <input value={unitName}></input>
            </div>
        );
    }
}
