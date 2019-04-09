import React from "react";
import { IUnitProps } from "../constants";
import { checkRacialMaximums, toggleComponentVisibility } from "../utilities/utils";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";

export const AdvanceComponent = (props: IUnitProps) => {
    const componentId = `${props.unit.name}Advance`;
    const maxReachedArr = checkRacialMaximums(props.unit);
    const advanceCharacteristic = (characteristic: string) => {

        toggleComponentVisibility(componentId);
        const updateUnit = props.unit;
        updateUnit.characteristics[characteristic] = updateUnit.characteristics[characteristic] + 1;
        store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });

        const xpBtn = document.getElementById(`${props.unit.name}XP`);
        if (xpBtn !== null) {
            xpBtn.removeAttribute("disabled");
            xpBtn.className = "EnabledButton";
        }
    };

    const buttonArray = maxReachedArr.map((item) => {
        if (item.name === "Movement") {
            return undefined;
        }
        const btnText = `Add +1 ${item.name}`;
        return item.maxReached ? undefined : <button onClick={() => advanceCharacteristic(item.name)}>{btnText}</button>;
    });
    return (
        <div id={componentId} style={{ display: "none"}}>
            <button>Add New Skill</button>
            {buttonArray}
        </div>
    );
};
