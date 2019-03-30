import React from "react";
import { IUnitEquipment } from "../constants";
import { store } from "..";
import { UPDATE_UNIT, ADD_MONEY_TO_TREASURY } from "../actions";
import { getEquipmentByName } from "../utilities/utils";
export class Equipment extends React.Component<IUnitEquipment> {
    private readonly equipment: string[];
    constructor(props: IUnitEquipment) {
        super(props);
        this.equipment = props.unit.equipment;
    }
    public render() {
        const equipmentList = this.getEquipmentContainer();
        return (
            <div style={{ display: "inline-block" }}>
                <div id="EquipmentHeader" className="AppHeaderContainerDiv">Equipment</div>
                {equipmentList}
                <button onClick={() => this.showAvailableEquipment()} className="EnabledButton">buy additional equipment</button>
            </div>
        );
    }
    private showAvailableEquipment() {
        const domElement = document.getElementById("equipmentTable");
        if (domElement !== null) {
            domElement.style.display = "block";
        }
    }
    private removeItem(equipmentName: string) {
        const updateUnit = this.props.unit;
        const firstFoundIndex = updateUnit.equipment.findIndex((equip) => equip === equipmentName);
        if (firstFoundIndex !== -1) {
            const originalEquipment = getEquipmentByName(equipmentName);
            let cost = 0;
            if (originalEquipment !== undefined) {
                cost = originalEquipment.cost;
            }
            updateUnit.equipment.splice(firstFoundIndex, 1);
            store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
            store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: cost });
        }
    }
    private getEquipmentContainer() {
        return this.equipment.map((equi) => (
            <div key={equi} className="EquipmentDiv">
                <div style={{ fontWeight: "bold" }}>{equi}</div>
                <button onClick={() => this.removeItem(equi)} >X</button>
            </div>
        ));
    }
}
