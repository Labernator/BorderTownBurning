import React from "react";
import { IUnitProps } from "../constants";
import { store } from "..";
import { UPDATE_UNIT, ADD_MONEY_TO_TREASURY } from "../actions";
import { getEquipmentByName } from "../utilities/utils";
import { ToggleContent } from "./ToggleComponent";
import { Modal } from "./Modal";
import { UnitEquipment } from "./UnitEquipment";
import { AppHeaderComponent } from "./AppHeaderComponent";
export const EquipmentContainer = (props: IUnitProps) => {
    const removeItem = (equipmentName: string) => {
        const updateUnit = props.unit;
        const firstFoundIndex = updateUnit.equipment.findIndex((equip) => equip === equipmentName);
        if (firstFoundIndex !== -1) {
            const originalEquipment = getEquipmentByName(equipmentName);
            let cost = 0;
            if (originalEquipment !== undefined) {
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
    return (
        <div style={{ display: "inline-block" }}>
            <div id="EquipmentHeader" className="AppHeaderContainerDiv">Equipment</div>
            {getEquipmentContainer()}
            <div>
                <ToggleContent
                    toggle={(show: any) =>
                        <button
                            id={`${props.unit.name}BuyButton`}
                            onClick={show}
                            style={{ clear: "both", float: "left", width: "100%" }}
                            className="BuyButton">Buy additional equipment
                        </button>}
                    content={(hide: any) => (
                        <Modal>
                            <div id={`${props.unit.name}Header`} style={{ display: "inline-block", border: "solid", borderWidth: 1, padding: 5 }}>
                                <AppHeaderComponent title="Treasury:" value={store.getState().armyTreasury.toString()}></AppHeaderComponent>
                                <AppHeaderComponent title="Equipment:" value={props.unit.equipment.toString()}></AppHeaderComponent>
                            </div>
                            <UnitEquipment unit={props.unit}></UnitEquipment>
                            <button onClick={hide}>Close</button>
                        </Modal>
                    )}
                />
            </div>
        </div>
    );
};
