import React, { useState } from "react";
import { IAdvanceSkill } from "../constants";
import { getLadsSkillLists } from "../utilities/utils";
import { UPDATE_UNIT, REMOVE_UNIT_FROM_ROSTER, ADD_UNIT_TO_ROSTER } from "../actions";
import { store } from "..";

export const LadsGotTalentComponent = (props: IAdvanceSkill) => {
    const [ladsName, setLadsName] = useState("");
    const updatedUnit = props.unit;
    const onInput = (e: any) => {
        setLadsName(e.target.value);
    };

    const onBtnClick = (e: any) => {
        if (updatedUnit.skillLists === undefined) {
            updatedUnit.skillLists = [];
        }
        updatedUnit.skillLists.push(e.target.textContent);
        const elem = document.getElementById(e.target.id);
        if (elem !== null && elem.parentNode !== null) {
            const parent = elem.parentNode;
            if (updatedUnit.skillLists.length !== 2) {
                parent.removeChild(elem);
            } else {
                while (parent.firstChild !== null) {
                    parent.removeChild(parent.firstChild);
                }
            }
        }
    };

    const createSkillListBtns = () => {
        if (props.unit.skillLists === undefined && (updatedUnit.skillLists === undefined || updatedUnit.skillLists.length < 2)) {
            return (
                <div>
                    <div>Select two of the following SkillLists for your hero:</div>
                    {getLadsSkillLists().map((list) => <button id={`Lad${list}SkillList`} key={`Lad${list}SkillList`} onClick={onBtnClick}>{list}</button>)}
                </div>
            );
        }
    };

    const advanceLad = () => {
        if (updatedUnit.number === undefined || updatedUnit.number === 1) {
            store.dispatch({ type: REMOVE_UNIT_FROM_ROSTER, payload: props.unit });
            props.callbacks.forEach((callback) => callback());
        } else {
            const numbers = updatedUnit.number - 1;
            store.dispatch({ type: UPDATE_UNIT, payload: { ...props.unit, number: numbers } });
            props.callbacks[0]();
        }
        if (props.unit.skillLists === undefined) {
            updatedUnit.skillLists = getLadsSkillLists();
        }
        updatedUnit.isHero = true;
        updatedUnit.name = ladsName;
        updatedUnit.number = undefined;
        store.dispatch({ type: ADD_UNIT_TO_ROSTER, payload: updatedUnit });

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
