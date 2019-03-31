import React from "react";
import { IUnitEquipment, AppMode } from "../constants";
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
                <div>
                    <button
                        id="BuyEquipmentButton"
                        onClick={() => this.toggleAvailableEquipment()}
                        style={{ clear: "both", float: "left", width: "100%" }}
                        className="BuyButton">
                        Buy additional equipment
                    </button>
                </div>
            </div>
        );
    }
    private toggleAvailableEquipment() {
        const equipmenTable = document.getElementById("equipmentTable");
        const equipmentButton = document.getElementById("BuyEquipmentButton");
        if (equipmenTable !== null) {
            if (equipmenTable.style.display === "none") {
                equipmenTable.style.display = "block";
                if (equipmentButton !== null) {
                    equipmentButton.innerHTML = "Close equipment panel";
                }
            } else {
                equipmenTable.style.display = "none";
                if (equipmentButton !== null) {
                    equipmentButton.innerHTML = "Buy additional equipment";
                }
            }
        }
    }
    private removeItem(equipmentName: string) {
        const updateUnit = this.props.unit;
        const firstFoundIndex = updateUnit.equipment.findIndex((equip) => equip === equipmentName);
        if (firstFoundIndex !== -1) {
            const originalEquipment = getEquipmentByName(equipmentName);
            let cost = 0;
            if (store.getState().appMode === AppMode.ExistingWarband && originalEquipment !== undefined) {
                cost = Math.ceil(originalEquipment.cost / 2);
            }
            updateUnit.equipment.splice(firstFoundIndex, 1);
            store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
            store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: cost });
        }
    }
    private getEquipmentContainer() {
        return this.equipment.map((equi) => (
            <div key={equi} className="EquipmentDiv">
                <div style={{ fontWeight: "bold" }}>
                    {equi}

                </div>
                <button title="Sell Equipment" className="EquipmentButton" onClick={() => this.removeItem(equi)} >X</button>
            </div>
        ));
    }
}
