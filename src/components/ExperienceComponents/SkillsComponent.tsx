import React from "react";
import { ISkill, IUnit, IDispatch } from "../../constants";
import { getSkills } from "../../utilities/utils";
import { UPDATE_UNIT } from "../../actions";

export const SkillsComponent = ({ unit, callbacks, propagateDispatch }: { unit: IUnit; callbacks: any[]; propagateDispatch(value: IDispatch[]): void }) => {
    let skillBtns: JSX.Element[] = [];

    const advanceSkill = (skillName: string) => {
        const skills = unit.skills === undefined ? [] : unit.skills;
        callbacks.forEach((callback) => callback());
        propagateDispatch([{
            type: UPDATE_UNIT,
            payload: {
                ...unit,
                skills: [...skills, skillName],
            },
        }]);
    };

    const skillElements = (skill: ISkill) => (
        <button key={`${skill.name}${unit.name}`}
            title={skill.text}
            onClick={() => advanceSkill(skill.name)}
            className="EnabledButton">
            {skill.name}
        </button>
    );

    if (unit.skillLists !== undefined) {
        const skills = getSkills(unit);
        if (skills !== undefined) {
            skillBtns = skills.map(skillElements);
        }
    }
    return (
        <div key={`${unit.name}Skills`}>
            {skillBtns}
        </div>
    );
};
