import React from "react";
import { IUnitProps } from "../constants";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";
import { isAdvancing } from "../utilities/utils";
import { AdvanceComponent } from "./AdvanceComponent";
import { ToggleContent } from "./ToggleComponent";
import { Modal } from "./Modal";

export const ExperienceComponent = (props: IUnitProps) => {
    const componentId = `${props.unit.name}XP`;
    const addExperience = (callback: any) => {
        const xp = props.unit.experience + 1;
        props.unit.experience = xp;
        store.dispatch({ type: UPDATE_UNIT, payload: { ...props.unit, experience: xp } });
        if (isAdvancing(props.unit)) {
            callback();
        }
    };
    return (
        <div  style={{ float: "left", width: 200 }}>
            <div style={{ fontWeight: "bold" }}>XP</div>
            <div>{props.unit.experience}</div>
            <ToggleContent
                toggle={(show: any) =>
                    <button
                        id={componentId}
                        onClick={() => addExperience(show)}
                        className="EnabledButton">+
                    </button>}
                content={(hide: any) => (
                    <Modal>
                        <AdvanceComponent unit={props.unit} callback={hide}></AdvanceComponent>
                    </Modal>
                )}
            />
        </div>
    );
};
