import React from "react";
import { printStringArray } from "../../utilities/utils";
import { IUnit } from "../../constants";
import { EditComponent } from "../UtilityComponents/EditImage";

export const UnitEquipmentComponent = ({ unit }: { unit: IUnit }) => {
    const editEquipment = () => {
        window.alert("Todo - bring up equipmentDialog");
    };
    const unitEquipment = unit.equipment !== undefined ? unit.equipment : [];
    return (
        <div id={`${unit.name}_EquipmentContainer`} style={{ clear: "both" }}>
            <div>
                <div style={{ fontWeight: "bold", float: "left" }}>Equipment</div>
                <div onClick={editEquipment}>
                    <EditComponent tooltip={"Click here to change the equipment"} />
                </div>
            </div>
            <div style={{ clear: "both" }}>{printStringArray(unitEquipment)}</div>
        </div>
    );
};
