import React from "react";
import { IUnit, IUnitEquipment } from "../constants";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";
import { checkLevelUp } from "../utilities/utils";

export class Experience extends React.Component<IUnitEquipment> {
    constructor(props: IUnitEquipment) {
        super(props);
    }
    public addExperience = () => {
        const xp = this.props.unit.experience + 1;
        this.props.unit.experience = xp;
        store.dispatch({ type: UPDATE_UNIT, payload: { ...this.props.unit, experience: xp } });
        // tslint:disable-next-line: no-console
        console.log(store.getState());
        // tslint:disable-next-line: no-console
        console.log(this.props.unit);
        checkLevelUp(this.props.unit);
    }

    public render() {
        return (
            <div id="xp" style={{ float: "left", width: 200 }}>
                <div style={{ fontWeight: "bold" }}>XP</div>
                <div>{this.props.unit.experience}</div>
                <button onClick={() => this.addExperience()}>+</button>
            </div>
        );
    }
}
