import React from "react";
import { IUnitProps } from "../constants";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";
import { checkLevelUp } from "../utilities/utils";
import { AdvanceComponent } from "./AdvanceComponent";

export const ExperienceComponent = (props: IUnitProps) => {
    const componentId = `${props.unit.name}XP`;

    const addExperience = () => {
        const xp = props.unit.experience + 1;
        props.unit.experience = xp;
        store.dispatch({ type: UPDATE_UNIT, payload: { ...props.unit, experience: xp } });
        checkLevelUp(props.unit);
    };
    return (

        <div  style={{ float: "left", width: 200 }}>
            <div style={{ fontWeight: "bold" }}>XP</div>
            <div>{props.unit.experience}</div>
            <button id={componentId} className="EnabledButton" onClick={addExperience}>+</button>
            <AdvanceComponent unit={props.unit} ></AdvanceComponent>
        </div>
    );
};
