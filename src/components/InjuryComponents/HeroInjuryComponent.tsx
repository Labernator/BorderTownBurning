import React, { useState } from "react";
import { IUnit, PostSequence, IUpdate } from "../../constants";
import { PostSequenceModal } from "../UtilityComponents/PostSequenceModal";
import { HeroInjuriesDialog } from "./HeroInjuriesDialog";
import { isToughUnit } from "../../utilities/utils";
import { store } from "../..";
import { ToggleContents } from "../UtilityComponents/ToggleComponents";

export const HeroInjuryComponent = ({ warbandRoster, callback }: { warbandRoster: IUnit[]; callback: any }) => {
    // tslint:disable-next-line:no-object-literal-type-assertion
    const [selectedUnit, setSelectedUnit] = useState({} as IUnit);
    const [updatedUnits, addUpdatedUnit] = useState([] as IUpdate[]);
    const [isOverviewMode, setOverviewMode] = useState(false);
    const toggleButton = (event: any, toggleCallback: any) => {
        const clickedUnit = warbandRoster.find((unit) => unit.name === event.target.id);
        if (clickedUnit !== undefined) {
            if (event.target.className === "EnabledInjuryButton") {
                event.target.className = "SelectedInjuryButton";
                setSelectedUnit(clickedUnit);
            } else {
                event.target.className = "EnabledInjuryButton";
                setSelectedUnit({} as any as IUnit);
            }
            toggleCallback();
        }
    };
    const updateSelectedUnit = (update: IUpdate) => {
        addUpdatedUnit([...updatedUnits, update]);
    };
    const finishHeroInjuries = () => {
        setOverviewMode(true);
        updatedUnits.forEach((updatedUnit) => {
            for (let i = 0; i < updatedUnit.types.length; i++) {
                store.dispatch({
                    type: updatedUnit.types[i],
                    payload: updatedUnit.payload[i],
                });
            }
        });
        callback(PostSequence.EXPERIENCE);
    };

    const updatedUnitList = updatedUnits.map((update) => (
        <div key={`${update.updatingUnit.name}`}>
            {update.injuryString}
        </div>));
    const heroList = warbandRoster.map((unit) => {
        if (Boolean(updatedUnits.find((updated) => updated.updatingUnit.name === unit.name))) {
            return;
        }
        if ((unit.isHero && !unit.isHiredSword) || (!unit.isHero && isToughUnit(unit))) {
            return (
                <div id={`${unit.name}Injury`} key={`${unit.name}Injury`} style={{ display: "grid" }}>
                    <ToggleContents
                        toggle={(toggling: any) =>
                            <button
                                id={unit.name}
                                className={"EnabledInjuryButton"}
                                onClick={(e) => { toggleButton(e, toggling); }}>
                                {`${unit.name} (${unit.type})`}
                            </button>}
                        content={(hide: any) => (
                            <PostSequenceModal parent={`${unit.name}Injury`}>
                                <HeroInjuriesDialog unit={selectedUnit} callback={hide} update={updateSelectedUnit}></HeroInjuriesDialog>
                            </PostSequenceModal>
                        )}
                    />
                </div>
            );
        }
    });
    const heroStuff = !isOverviewMode ? <div>
        <div>Please select all heros, that went out of action during the battle</div>
        <div>and choose which injuries they sustained:</div>
        {heroList}
        <div style={{ display: "grid", paddingTop: 10 }}>
            <button className={"ContinueButton"} style={{ display: "grid" }} onClick={finishHeroInjuries}>Continue</button>
            <div>*Note: dead heros are removed from your Roster</div>
        </div>
    </div> : updatedUnitList.length === 0 ? <div>No Heros have been injured.</div> : updatedUnitList;
    return (
        <div id="HeroInjuryContainer" className="PostSequenceComponent">
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 1b: Hero Injuries </div>
            {heroStuff}
        </div>
    );
};
