import React, { useState } from "react";
import { IUnit, PostSequence, IUpdate } from "../../constants";
import { store } from "../..";
import { UPDATE_UNIT } from "../../actions";
import { isAdvancing, isUnitSlowWitted } from "../../utilities/utils";
import { ToggleContent } from "../UtilityComponents/ToggleComponent";
import { PostSequenceModal } from "../UtilityComponents/PostSequenceModal";
import { AdvanceComponent } from "./AdvanceComponent";

export const ExperienceContainer = ({ warbandRoster, callback }: { warbandRoster: IUnit[]; callback: any }) => {
    const [isOverviewMode, setOverviewMode] = useState(false);
    const [updatedUnits, addUpdatedUnit] = useState([] as IUpdate[]);
    const continueToNextStep = () => {
        callback(PostSequence.EXPLORATION);
        setOverviewMode(true);
    };
    const addExperience = (unit: IUnit, showAdvance: any) => {
        const xp = unit.experience + 1;
        store.dispatch({ type: UPDATE_UNIT, payload: { ...unit, experience: xp } });
        if (isAdvancing(unit.isHero, xp, isUnitSlowWitted(unit.skills))) {
            showAdvance();
        }
        const update: IUpdate = {
            updatingUnit: unit,
            types: [UPDATE_UNIT],
            payload: [{
                ...unit,
                experience: xp,
            }],
            injuryString: "Unit got xp",
        };
        addUpdatedUnit([...updatedUnits, update]);
    };
    const updateCallback = (unit: IUnit) => {
        console.log(unit);
    };
    const unitList = warbandRoster.map((unit) => (
        <div key={`${unit.name}AddExp`} id={`${unit.name}AddExp`} className="ExperienceUnitContainer">
            <div style={{ paddingLeft: 10, float: "left" }}>{unit.name}</div>
            <div style={{ float: "right" }}>
                <div style={{ fontWeight: "bold", float: "left" }}>{unit.experience} XP</div>
                <div style={{ paddingLeft: 10, float: "right" }}>
                    <ToggleContent
                        toggle={(show: any) => <button onClick={() => addExperience(unit, show)}>+</button>}
                        content={(hide: any) => (
                            <PostSequenceModal parent={`${unit.name}AddExp`}>
                                <AdvanceComponent unit={unit} callback={hide}></AdvanceComponent>
                            </PostSequenceModal>
                        )}
                    />
                </div>
            </div>
        </div>
    ));
    const content = isOverviewMode ?
        <div>This is a summary</div> :
        <div>
            {unitList}
            <div style={{ display: "grid", paddingTop: 10 }}>
                <button className={"ContinueButton"} style={{ display: "grid" }} onClick={continueToNextStep}>Continue</button>
            </div>
        </div>;
    return (
        <div id="ExperienceContainer" className="PostSequenceComponent">
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 2: Allocate Experience </div>
            {content}
        </div>
    );
};
