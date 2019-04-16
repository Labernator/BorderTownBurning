import React from "react";
import { IUnit } from "../constants";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";
import { isAdvancing } from "../utilities/utils";
import { AdvanceComponent } from "./AdvanceComponent";
import { ToggleContent } from "./ToggleComponent";
import { Modal } from "./Modal";

export const ExperienceComponent = ({ unit }: { unit: IUnit }) => {
    const addExperience = (callback: any) => {
        const xp = unit.experience + 1;
        unit.experience = xp;
        store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, experience: xp } });
        if (isAdvancing(unit)) {
            callback();
        }
    };
    return (
        <div style={{ float: "left", width: 200 }}>
            <div style={{ fontWeight: "bold" }}>XP</div>
            <div>{unit.experience}</div>
            <ToggleContent
                toggle={(show: any) =>
                    <button
                        id={`${unit.name}XP`}
                        onClick={() => addExperience(show)}
                        className="EnabledButton">+
                    </button>}
                content={(hide: any) => (
                    <Modal>
                        <AdvanceComponent unit={unit} callback={hide}></AdvanceComponent>
                    </Modal>
                )}
            />
        </div>
    );
};
