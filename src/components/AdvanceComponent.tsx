import React from "react";
import { IAdvance } from "../constants";
import { checkRacialMaximums, getSkills } from "../utilities/utils";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";
import { ToggleContent } from "./ToggleComponent";
import { Modal } from "./Modal";
import { SkillsComponent } from "./SkillsComponent";

export const AdvanceComponent = (props: IAdvance) => {
    const componentId = `${props.unit.name}Advance`;
    const maxReachedArr = checkRacialMaximums(props.unit);
    const advanceCharacteristic = (characteristic: string) => {
        const updateUnit = props.unit;
        updateUnit.characteristics[characteristic] = updateUnit.characteristics[characteristic] + 1;
        store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
        props.callback();
    };
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
            {buttonArray}
            <ToggleContent
                toggle={(show: any) =>
                    <button
                        id={componentId}
                        onClick={(show)}
                        className="EnabledButton">
                        Add New Skill
                    </button>}
                content={(hide: any) => (
                    <Modal>
                        <SkillsComponent unit={props.unit} callback={hide}></SkillsComponent>
                    </Modal>
                )}
            />
        </div>
    );
};
