import React from "react";
import { IUnit } from "../../constants";
import { UPDATE_UNIT } from "../../actions";
import { store } from "../..";
import { isAdvancing } from "../../utilities/utils";
import { AdvanceComponent } from "./AdvanceComponent";
import { ToggleContent } from "../UtilityComponents/ToggleComponent";
import { PostSequenceModal } from "../UtilityComponents/PostSequenceModal";

export const AddExperienceButton = ({ unit }: { unit: IUnit }) => {
    const addExperience = (callback: any) => {
        const xp = unit.experience + 1;
        unit.experience = xp;
        store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, experience: xp } });
        if (isAdvancing(unit)) {
            callback();
        }
    };
    return (
        <div style={{ float: "right" }}>
            <div style={{ fontWeight: "bold", float: "left" }}>{unit.experience} XP</div>
            <div style={{ float: "right", paddingLeft: 10 }}>
                <ToggleContent
                    toggle={(show: any) =>
                        <button
                            id={`${unit.name}XP`}
                            onClick={() => addExperience(show)}
                            className="EnabledButton">+
                    </button>}
                    content={(hide: any) => (
                        <PostSequenceModal parent={`${unit.name}AddExp`}>
                            <AdvanceComponent unit={unit} callback={hide}></AdvanceComponent>
                        </PostSequenceModal>
                    )}
                />
            </div>
        </div>
    );
};
