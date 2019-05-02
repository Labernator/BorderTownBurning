import React, { useState } from "react";
import { IUnit, IDispatch } from "../../constants";
import { getLadsSkillLists, printStringArray, getAdvanceOptions } from "../../utilities/utils";
import { UPDATE_UNIT, REMOVE_UNIT_FROM_ROSTER, ADD_UNIT_TO_ROSTER } from "../../actions";
import { store } from "../..";
import { ToggleContent } from "../UtilityComponents/ToggleComponent";
import { PostSequenceModal } from "../UtilityComponents/PostSequenceModal";
import { SkillsComponent } from "./SkillsComponent";

export const LadsGotTalentComponent = ({ unit, callbacks, advanceUpdate }: { unit: IUnit; callbacks: any[]; advanceUpdate: any }) => {
    const [dispatchActions, addDispatchAction] = useState([] as IDispatch[]);
    const [ladsName, setLadsName] = useState(unit.name === undefined ? "" : `${unit.name}_Hero`);
    const [ladSkills, setLadSkills] = useState<string[]>([]);
    const [ladCreated, createLad] = useState(false);
    const advanceCharacteristic = (characteristic: string) => {
        store.dispatch({
            type: UPDATE_UNIT,
            payload: {
                ...unit,
                characteristics: { ...unit.characteristics, [characteristic]: unit.characteristics[characteristic] + 1 },
            },
        });
        advanceUpdate(unit, characteristic, "characteristic");
    };

    const onInput = (e: any) => {
        setLadsName(e.target.value);
    };

    const skillButtonClick = (e: any) => {
        setLadSkills([...ladSkills, e.target.textContent as string]);
    };

    const getDispatchFromSkills = (values: IDispatch[]) => {
        values.forEach((value) => addDispatchAction([...dispatchActions, { type: value.type, payload: value.payload }]));
        advanceLad();
    };

    const getToggleComponent = () => (
        <ToggleContent
            toggle={(show: any) => (
                <button
                    id={`${unit.name}Advance`}
                    onClick={(show)}
                    className="EnabledButton">
                    {"Add New Skill"}
                </button>)}
            content={(hide: any) => (
                <PostSequenceModal parent={`${unit.name}AddExp`}>
                    <SkillsComponent
                        unit={{ ...unit, number: undefined, isHero: true, name: ladsName, skillLists: ladSkills }}
                        callbacks={[hide, callbacks[0]]} propagateDispatch={getDispatchFromSkills} />
                </PostSequenceModal>
            )} />
    );

    const createSkillListBtns = () => {
        if (unit.skillLists === undefined) {
            if (ladSkills.length < 2) {
                return (
                    <div>
                        <div>Select two of the following SkillLists for your hero:</div>
                        {getLadsSkillLists().map((list) => {
                            if (!ladSkills.includes(list)) {
                                return (<button id={`Lad${list}SkillList`} key={`Lad${list}SkillList`} onClick={skillButtonClick}>{list}</button>);
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
        } else if (ladSkills.length === 0) {
            setLadSkills(unit.skillLists);
        }
    };

    const generateLad = () => {
        if (unit.number === undefined || unit.number === 1) {
            addDispatchAction([...dispatchActions, { type: REMOVE_UNIT_FROM_ROSTER, payload: unit }]);
        } else {
            const numbers = unit.number - 1;
            addDispatchAction([...dispatchActions, { type: UPDATE_UNIT, payload: { ...unit, number: numbers } }]);
        }
        createLad(true);
    };
    const advanceLad = () => {
        if (unit.number === undefined || unit.number === 1) {
            callbacks.forEach((callback) => callback());
        } else {
            callbacks[0]();
        }
        store.dispatch({ type: ADD_UNIT_TO_ROSTER, payload: { ...unit, name: ladsName, skillLists: ladSkills, isHero: true, number: undefined } });
        dispatchActions.forEach((action) => {
            if (action.type === "REMOVE_UNIT_FROM_ROSTER") {
                store.dispatch({
                    type: action.type,
                    payload: action.payload,
                });
            } else if (action.type === "UPDATE_UNIT") {
                store.dispatch({
                    type: action.type,
                    payload: action.payload,
                });
            }
        });
    };

    const content = !ladCreated ?
        <div>
            <div>Give your newly appointed Hero a Name:</div>
            <input
                id={`${unit.name}Lad`}
                value={ladsName}
                onChange={onInput}
            />
            {createSkillListBtns()}
            <button onClick={generateLad}>Ok</button>
        </div> :
        <div>
            <div>{`Roll on the Hero advance table for ${ladsName} and select the result from the list below:`}</div>
            {getToggleComponent()}
            {getAdvanceOptions({ ...unit, name: ladsName, skillLists: ladSkills, isHero: true, number: undefined }, advanceCharacteristic)}
        </div>;

    return (
        <div id={`${unit.name}Skills`}>
            {content}
        </div>
    );
};
