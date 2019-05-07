import React, { useState, useEffect } from "react";
import { IUnit, IDispatch, ICharacteristics } from "../../constants";
import { getLadsSkillLists, printStringArray, getAdvanceOptions } from "../../utilities/utils";
import { UPDATE_UNIT, REMOVE_UNIT_FROM_ROSTER, ADD_UNIT_TO_ROSTER } from "../../actions";
import { store } from "../..";
import { ToggleContent } from "../UtilityComponents/ToggleComponent";
import { PostSequenceModal } from "../UtilityComponents/PostSequenceModal";
import { SkillsComponent } from "./SkillsComponent";

export const LadsGotTalentComponent = ({ unit, callbacks, propagateDispatch }: { unit: IUnit; callbacks: any[]; propagateDispatch(value: IDispatch[]): void }) => {
    const [dispatchActions, addDispatchAction] = useState([] as IDispatch[]);
    const [ladsName, setLadsName] = useState(unit.name === undefined ? "" : `${unit.name}_Hero`);
    const [ladSkillLists, setLadSkillLists] = useState<string[]>([]);
    const [ladSkills, setLadSkills] = useState<string[]>([]);
    const [ladCharacteristics, setLadCharacteristics] = useState({} as any as ICharacteristics);
    const [ladCreated, createLad] = useState(false);
    useEffect(() => {
        if (ladCharacteristics.hasOwnProperty("Movement") || ladSkills.length > 0) {
            advanceLad();
        }
    }, [ladCharacteristics, ladSkills]);
    const advanceCharacteristic = (characteristic: string) => {
        setLadCharacteristics({ ...unit.characteristics, [characteristic]: unit.characteristics[characteristic] + 1 });
    };

    const onInput = (e: any) => {
        setLadsName(e.target.value);
    };

    const skillButtonClick = (e: any) => {
        setLadSkillLists([...ladSkillLists, e.target.textContent as string]);
    };

    const getDispatchFromSkills = (values: IDispatch[]) => {
        values.forEach((value) => setLadSkills([value.payload.skills]));
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
                        unit={{ ...unit, number: undefined, isHero: true, name: ladsName, skillLists: ladSkillLists }}
                        callbacks={[hide, callbacks[0]]} propagateDispatch={getDispatchFromSkills} />
                </PostSequenceModal>
            )} />
    );

    const createSkillListBtns = () => {
        if (unit.skillLists === undefined) {
            if (ladSkillLists.length < 2) {
                return (
                    <div>
                        <div>Select two of the following SkillLists for your hero:</div>
                        {getLadsSkillLists().map((list) => {
                            if (!ladSkillLists.includes(list)) {
                                return (<button id={`Lad${list}SkillList`} key={`Lad${list}SkillList`} onClick={skillButtonClick}>{list}</button>);
                            }
                        })}
                    </div>
                );
            } else if (ladSkillLists.length === 2) {
                return (
                    <div>
                        <div>You have selected skill lists {printStringArray(ladSkillLists)} </div>
                    </div>
                );
            }
        } else if (ladSkillLists.length === 0) {
            setLadSkillLists(unit.skillLists);
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
        store.dispatch({
            type: ADD_UNIT_TO_ROSTER,
            payload: {
                ...unit,
                name: ladsName,
                skillLists: ladSkillLists,
                skills: ladSkills,
                characteristics: ladCharacteristics,
                isHero: true,
                number: undefined,
            },
        });
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
            {getAdvanceOptions({ ...unit, name: ladsName, skillLists: ladSkillLists, isHero: true, number: undefined }, advanceCharacteristic)}
        </div>;

    return (
        <div id={`${unit.name}Skills`}>
            {content}
        </div>
    );
};
