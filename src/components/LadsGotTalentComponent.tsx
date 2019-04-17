import React, { useState } from "react";
import { IAdvanceSkill } from "../constants";
import { getLadsSkillLists } from "../utilities/utils";
import { UPDATE_UNIT, REMOVE_UNIT_FROM_ROSTER, ADD_UNIT_TO_ROSTER } from "../actions";
import { store } from "..";

export const LadsGotTalentComponent = (props: IAdvanceSkill) => {
    const [ladsName, setLadsName] = useState("");
    const [ladSkills, setLadSkills] = useState<string[]>([]);
    const onInput = (e: any) => {
        setLadsName(e.target.value);
    };

    const onBtnClick = (e: any) => {
        setLadSkills([...ladSkills, e.target.textContent as string]);
    };

    const createSkillListBtns = () => {
        if (props.unit.skillLists === undefined) {
            if (ladSkills.length < 2) {
                return (
                    <div>
                        <div>Select two of the following SkillLists for your hero:</div>
                        {getLadsSkillLists().map((list) => {
                            if (!ladSkills.includes(list)) {
                                return (<button id={`Lad${list}SkillList`} key={`Lad${list}SkillList`} onClick={onBtnClick}>{list}</button>);
                            }
                        })}
                    </div>
                );
            } else if (ladSkills.length === 2) {
                return (
                    <div>
                        <div>You have selected skill lists {ladSkills} </div>
                    </div>
                );
            }
        }
    };

    const advanceLad = () => {
        if (props.unit.number === undefined || props.unit.number === 1) {
            store.dispatch({ type: REMOVE_UNIT_FROM_ROSTER, payload: props.unit });
            props.callbacks.forEach((callback) => callback());
        } else {
            const numbers = props.unit.number - 1;
            store.dispatch({ type: UPDATE_UNIT, payload: { ...props.unit, number: numbers } });
            props.callbacks[0]();
        }
        store.dispatch({ type: ADD_UNIT_TO_ROSTER, payload: { ...props.unit, number: undefined, isHero: true, name: ladsName, skillLists: ladSkills } });

    };

    const componentId = `${props.unit.name}Skills`;

    return (
        <div id={componentId}>
            <div>Give your newly appointed Hero a Name:</div>
            <input
                id={`${props.unit.name}Lad`}
                value={ladsName}
                onChange={onInput}
            />
            {createSkillListBtns()}
            <button onClick={advanceLad}>Ok</button>
        </div>
    );
};
