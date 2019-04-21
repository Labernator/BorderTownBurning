import React from "react";
import { IUnit } from "../../constants";
import { EditComponent } from "../UtilityComponents/EditImage";

export const UnitHeaderComponent = ({ unit }: { unit: IUnit }) => {
    const unitNumberString = unit.number !== undefined ? `${unit.number}x ` : "";

    const editName = () => {
        window.alert("Todo - bring up nameDialog");
    };

    return (
        <div id={`${unit.name}_HeaderContainer`} style={{ width: "100%", fontWeight: "bolder" }}>

            <div style={{ float: "left" }}>{`${unit.name} (${unitNumberString}${unit.type})`}</div>
            <div style={{ float: "left" }} onClick={editName}>
                <EditComponent tooltip={"Click here to change the name"} />
            </div>
            <div style={{ float: "right" }}>{`[${unit.experience} XP]`}</div>
        </div>
    );
};
