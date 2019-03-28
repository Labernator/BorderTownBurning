import React from "react";
import { IUnitEquipment } from "../constants";
import { store } from "..";
import { UPDATE_UNIT, ADD_MONEY_TO_TREASURY } from "../actions";
export class Equipment extends React.Component<IUnitEquipment> {
    private readonly equipment: string[];
    constructor(props: IUnitEquipment) {
        super(props);
        this.equipment = props.unit.equipment;
    }

    public render() {
        const equiTableRows = this.createEquipmentTableRows();
        const equipmentList = this.getEquipmentContainer();
        return (
            <div >
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
            const itemValue = updateUnit.equipment[firstFoundIndex].
            updateUnit.equipment.splice(firstFoundIndex);
            store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
            store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: item.cost });
        }
    }
    private getEquipmentContainer() {
        return this.equipment.map((equi) => (
            <div key={equi}>
                <div>{equi}</div>
                <button onClick={() => this.removeItem(equi)} >X</button>
            </div>
        ));
    }
    private createEquipmentTableRows() {
        return this.equipment.map((equi) => (
            <tr key={equi}>
                <td>{equi}</td>
            </tr>
        ),
        );
    }
}
