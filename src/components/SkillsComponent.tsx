import React from "react";
import { IAdvanceSkill, ISkill, IAdvance } from "../constants";
import { getSkills } from "../utilities/utils";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";

export const SkillsComponent = (props: IAdvanceSkill) => {
    let skillBtns;

    const advanceSkill = (skillName: string) => {
        const updateUnit = props.unit;
        if (updateUnit.skills === undefined) {
            updateUnit.skills = [];
        }
        updateUnit.skills.push(skillName);
        store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
        props.callbacks.forEach((callback) => callback());
    };

    const skillElements = (skill: ISkill) => (
        <button key={`${skill.name}${props.unit.name}`}
        title={skill.text}
        onClick={() => advanceSkill(skill.name)}
        className="EnabledButton">
            {skill.name}
        </button>
    );
    const componentId = `${props.unit.name}Skills`;
    if (props.unit.skillLists !== undefined) {
        const skills = getSkills(props.unit);
        if (skills !== undefined) {
            skillBtns = skills.map((skill) => skillElements(skill));
        }
    }
    return (
        <div id={componentId}>
            {skillBtns}
        </div>
    );
};
