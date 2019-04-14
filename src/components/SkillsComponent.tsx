import React from "react";
import { IAdvance } from "../constants";
import { getSkillButtons } from "../utilities/utils";

export const SkillsComponent = (props: IAdvance) => {
    const componentId = `${props.unit.name}Skills`;
    const skillBtns = getSkillButtons(props.unit.skillLists);
    return (
        <div id={componentId}>
            {skillBtns}
        </div>
    );
};