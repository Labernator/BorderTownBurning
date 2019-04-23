import React from "react";
import { ISkill, IUnit } from "../../constants";
import { getSkills } from "../../utilities/utils";
import { UPDATE_UNIT } from "../../actions";
import { store } from "../..";

export const SkillsComponent = ({ unit, callbacks, advanceUpdate }: { unit: IUnit; callbacks: any[]; advanceUpdate: any }) => {
    let skillBtns;

    const advanceSkill = (skillName: string) => {
        const skills = unit.skills === undefined ? [] : unit.skills;
        store.dispatch({
            type: UPDATE_UNIT,
            payload: {
                ...unit,
                skills: [...skills, skillName],
            },
        });
        callbacks.forEach((callback) => callback());
        advanceUpdate(unit, skillName, "skill");
    };

    const skillElements = (skill: ISkill) => (
        <button key={`${skill.name}${unit.name}`}
            title={skill.text}
            onClick={() => advanceSkill(skill.name)}
            className="EnabledButton">
            {skill.name}
        </button>
    );
    const componentId = `${unit.name}Skills`;
    if (unit.skillLists !== undefined) {
        const skills = getSkills(unit);
        if (skills !== undefined) {
            skillBtns = skills.map(skillElements);
        }
    }
    return (
        <div id={componentId}>
            {skillBtns}
        </div>
    );
};
