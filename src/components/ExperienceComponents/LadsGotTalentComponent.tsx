import React, { useState } from "react";
import { IUnit } from "../../constants";
import { getLadsSkillLists, printStringArray } from "../../utilities/utils";
import { UPDATE_UNIT, REMOVE_UNIT_FROM_ROSTER, ADD_UNIT_TO_ROSTER } from "../../actions";
import { store } from "../..";

export const LadsGotTalentComponent = ({ unit, callbacks }: { unit: IUnit; callbacks: any[] }) => {
    const [ladsName, setLadsName] = useState("");
    const [ladSkills, setLadSkills] = useState<string[]>([]);
    const onInput = (e: any) => {
        setLadsName(e.target.value);
    };

    const onBtnClick = (e: any) => {
        setLadSkills([...ladSkills, e.target.textContent as string]);
    };

    const createSkillListBtns = () => {
        if (unit.skillLists === undefined) {
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
                        <div>You have selected skill lists {printStringArray(ladSkills)} </div>
                    </div>
                );
            }
        }
    };

    const advanceLad = () => {
        if (unit.number === undefined || unit.number === 1) {
            store.dispatch({ type: REMOVE_UNIT_FROM_ROSTER, payload: unit });
            callbacks.forEach((callback) => callback());
        } else {
            const numbers = unit.number - 1;
            store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, number: numbers } });
            callbacks[0]();
        }
        store.dispatch({ type: ADD_UNIT_TO_ROSTER, payload: { ...unit, number: undefined, isHero: true, name: ladsName, skillLists: ladSkills } });

    };

    return (
        <div id={`${unit.name}Skills`}>
            <div>Give your newly appointed Hero a Name:</div>
            <input
                id={`${unit.name}Lad`}
                value={ladsName}
                onChange={onInput}
            />
            {createSkillListBtns()}
            <button onClick={advanceLad}>Ok</button>
        </div>
    );
};
