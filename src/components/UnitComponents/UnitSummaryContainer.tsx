import React from "react";
import "rc-select/assets/index.css";
import { IUnit } from "../../constants";
import { ListComponent } from "../UtilityComponents/ListComponent";
import { Characteristics } from "./Characteristics";
import { UnitHeaderComponent } from "./UnitHeaderComponent";
import { UnitEquipmentComponent } from "./UnitEquipmentComponent";

export const UnitSummaryContainer = ({ warbandRoster }: { warbandRoster: IUnit[] }) => {
    let counter = 0;
    const unitDivs = warbandRoster.map((unit) => {
        counter++;
        if (unit.type !== "") {
            const uniqueKey = `${unit.type}${counter}`;
            return (
                <div key={uniqueKey} style={{ border: "solid" }}>
                    <UnitHeaderComponent unit={unit}></UnitHeaderComponent>
                    <UnitEquipmentComponent unit={unit}></UnitEquipmentComponent>
                    <ListComponent title="Skill Lists" names={unit.skillLists}></ListComponent>
                    <ListComponent title={"Skills"} names={unit.skills} ></ListComponent>
                    <Characteristics unit={unit} ></Characteristics>
                </div>
            );
        }
    });
    return (
        <details className="UnitSummaryContainer">
            <summary className="AppHeaderContainerDiv">Click here to show/side Roster View:</summary>
            {unitDivs}
        </details>
    );
};
