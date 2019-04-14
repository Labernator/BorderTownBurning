import React from "react";
import { IAdvance } from "../constants";
import { checkRacialMaximums, getSkills } from "../utilities/utils";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";

export const AdvanceComponent = (props: IAdvance) => {
    const componentId = `${props.unit.name}Advance`;
    const maxReachedArr = checkRacialMaximums(props.unit);
    const advanceCharacteristic = (characteristic: string) => {
        const updateUnit = props.unit;
        updateUnit.characteristics[characteristic] = updateUnit.characteristics[characteristic] + 1;
        store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
        props.callback();
    };
    const advanceSkill = () => {
        if (props.unit.skillLists !== undefined) {
            const skills = getSkills(props.unit.skillLists);
            skills.forEach((skill) => skillElements(skill.name));
        }
    };
    const skillElements = (name: string) => (<button>{name}</button>);

    const buttonArray = maxReachedArr.map((item) => {
        if (item.name === "Movement") {
            return undefined;
        }
        const btnText = `Add +1 ${item.name}`;
        const btnKey = `${props.unit.name}${item.name}`;
        return item.maxReached ? undefined : <button key={btnKey} onClick={() => advanceCharacteristic(item.name)}>{btnText}</button>;
    });
    return (
        <div id={componentId}>
            <button onClick={advanceSkill}>Add New Skill</button>
            {buttonArray}
        </div>
    );
};
