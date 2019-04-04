import React from "react";
import { IUnitProps } from "../constants";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";
import { checkLevelUp } from "../utilities/utils";

export const ExperienceComponent = (props: IUnitProps) => {
    const addExperience = () => {
        const xp = props.unit.experience + 1;
        props.unit.experience = xp;
        store.dispatch({ type: UPDATE_UNIT, payload: { ...props.unit, experience: xp } });
        // tslint:disable-next-line: no-console
        console.log(store.getState());
        // tslint:disable-next-line: no-console
        console.log(props.unit);
        checkLevelUp(props.unit);
    };
    return (
        <div id="xp" style={{ float: "left", width: 200 }}>
            <div style={{ fontWeight: "bold" }}>XP</div>
            <div>{props.unit.experience}</div>
            <button onClick={() => addExperience}>+</button>
        </div>
    );
};