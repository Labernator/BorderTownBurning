import React, { useState } from "react";
import { IUnit, PostSequence, IUpdate } from "../../constants";
import { store } from "../..";
import { UPDATE_UNIT } from "../../actions";
import { isAdvancing, isUnitSlowWitted } from "../../utilities/utils";
import { ToggleContent } from "../UtilityComponents/ToggleComponent";
import { PostSequenceModal } from "../UtilityComponents/PostSequenceModal";
import { AdvanceComponent } from "./AdvanceComponent";

interface IExperience {
    unitName: string;
    experienceGained: number;
    characteristicAdvance?: string[];
    skillAdvance?: string[];
}

export const ExperienceContainer = ({ warbandRoster, callback }: { warbandRoster: IUnit[]; callback: any }) => {
    const [isOverviewMode, setOverviewMode] = useState(false);
    const [updatedUnits, addUpdatedUnit] = useState([] as IExperience[]);
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
        const name = unit.name !== undefined ? unit.name : "";
        const itemIndex = updatedUnits.findIndex((item) => item.unitName === name);
        if (itemIndex >= 0) {
            const alreadyExistingUnit = updatedUnits[itemIndex];
            alreadyExistingUnit.experienceGained += 1;
            addUpdatedUnit([...updatedUnits.slice(0, itemIndex), alreadyExistingUnit, ...updatedUnits.slice(itemIndex + 1)]);
        } else {
            addUpdatedUnit([...updatedUnits, { unitName: name, experienceGained: 1 }]);
        }

    };
    const updateCallback = (unit: IUnit, advance: string, type: string) => {
        // this should include the advances a unit has made and should be added to the update list
        if (type === "characteristic") {
            const itemIndex = updatedUnits.findIndex((item) => item.unitName === unit.name);
            if (itemIndex >= 0) {
                const alreadyExistingUnit = updatedUnits[itemIndex];
                if (alreadyExistingUnit.characteristicAdvance === undefined) {
                    alreadyExistingUnit.characteristicAdvance = [];
                }
                alreadyExistingUnit.characteristicAdvance.push(advance);
                addUpdatedUnit([...updatedUnits.slice(0, itemIndex), alreadyExistingUnit, ...updatedUnits.slice(itemIndex + 1)]);
            }
        }
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
                                <AdvanceComponent unit={unit} callback={hide} advanceUpdate={updateCallback}></AdvanceComponent>
                            </PostSequenceModal>
                        )}
                    />
                </div>
            </div>
        </div>
    ));

    const summaryText = updatedUnits.map((entry) => {
        const text = `${entry.unitName} gained ${entry.experienceGained} XP`;
        const addText = entry.characteristicAdvance !== undefined ? ` which resulted in +1 ${entry.characteristicAdvance}` : "";
        return (<div key={`${entry.unitName}expGained`}>{text}{addText}</div>);
    });
    const content = isOverviewMode ?
        <div>
            {summaryText}
        </div> :
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
