import React from "react";
import { IUnitProps, AppMode } from "../constants";
import { store } from "..";
import { UPDATE_UNIT, ADD_MONEY_TO_TREASURY } from "../actions";
import { getEquipmentByName } from "../utilities/utils";
export const EquipmentContainer = (props: IUnitProps) => {

    const toggleAvailableEquipment = () => {
        const equipmentTable = document.getElementById(`${props.unit.name}Equipment`);
        const equipmentButton = document.getElementById(BuyEquipmentButtonId);
        if (equipmentTable !== null) {
            if (equipmentTable.style.display === "none") {
                equipmentTable.style.display = "block";
                if (equipmentButton !== null) {
                    equipmentButton.innerHTML = "Close equipment panel";
                }
            } else {
                equipmentTable.style.display = "none";
                if (equipmentButton !== null) {
                    equipmentButton.innerHTML = "Buy additional equipment";
                }
            }
        }
    };
    const removeItem = (equipmentName: string) => {
        const updateUnit = props.unit;
        const firstFoundIndex = updateUnit.equipment.findIndex((equip) => equip === equipmentName);
        if (firstFoundIndex !== -1) {
            const originalEquipment = getEquipmentByName(equipmentName);
            let cost = 0;
            if (store.getState().appMode === AppMode.ExistingWarband && originalEquipment !== undefined) {
                cost = Math.ceil(originalEquipment.cost / 2);
                if (props.unit.number !== undefined) {
                    cost = cost * props.unit.number;
                }
            }
            updateUnit.equipment.splice(firstFoundIndex, 1);
            store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
            store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: cost });
        }
    };
    const getEquipmentContainer = () => (
        props.unit.equipment.map((equi, idx) => {
            const index = props.unit.equipment.findIndex((item) => item === equi);
            const itemKey = index === idx ? `${equi}_0` : `${equi}_1`;
            return (
                <div key={itemKey} className="EquipmentDiv">
                    <div style={{ fontWeight: "bold" }}>
                        {equi}
                    </div>
                    <button title="Sell Equipment" className="EquipmentButton" onClick={() => removeItem(equi)} >X</button>
                </div>
            );
        }));
    const BuyEquipmentButtonId = `${props.unit.name}BuyButton`;
    return (
        <div style={{ display: "inline-block" }}>
            <div id="EquipmentHeader" className="AppHeaderContainerDiv">Equipment</div>
            {getEquipmentContainer()}
            <div>
                <button
                    id={BuyEquipmentButtonId}
                    onClick={toggleAvailableEquipment}
                    style={{ clear: "both", float: "left", width: "100%" }}
                    className="BuyButton">
                    Buy additional equipment
                    </button>
            </div>
        </div>
    );
};
