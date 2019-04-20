import React, { useState } from "react";
import { IUnit, PostSequence } from "../constants";
import { ToggleContent } from "./ToggleComponent";
import { InjuriesModal } from "./InjuriesModal";
import { HeroInjuriesDialog } from "./HeroInjuriesDialog";
import { isToughUnit } from "../utilities/utils";

export const HeroInjuryComponent = ({ warbandRoster, currentSequence }: { warbandRoster: IUnit[]; currentSequence: PostSequence }) => {
    // tslint:disable-next-line:no-object-literal-type-assertion
    const [selectedUnit, setSelectedUnit] = useState({} as IUnit);
    const [updatedUnits, addUpdatedUnit] = useState([] as IUnit[]);
    const [isOverviewMode, setOverviewMode] = useState(false);
    const toggleButton = (event: any, callback: any) => {
        event.target.className = "SelectedInjuryButton";
        const clickedUnit = warbandRoster.find((unit) => unit.name === event.target.id);
        if (clickedUnit !== undefined) {
            setSelectedUnit(clickedUnit);
        }
        callback();
    };
    const updateSelectedUnit = (unit: IUnit) => {
        addUpdatedUnit([...updatedUnits, unit]);
    };
    const finishHenchmenInjuries = () => {
        setOverviewMode(true);
    };

    const updatedUnitList = updatedUnits.map((unit) => {
        const injuryString = unit.injuries !== undefined ? unit.injuries.join(", ") : "no injury";
        return (<div key={`${unit.name}`}>{`${unit.name} (${unit.type}) has sustained injuries: ${injuryString}`}</div>);
    });
    const heroList = warbandRoster.map((unit) => {
        if (Boolean(updatedUnits.find((updated) => updated.name === unit.name))) {
            return;
        }
        if ((unit.isHero && !unit.isHiredSword) || (!unit.isHero && isToughUnit(unit))) {
            return (
                <div id={`${unit.name}Injury`} key={`${unit.name}Injury`} style={{ display: "grid" }}>
                    <ToggleContent
                        toggle={(show: any) =>
                            <button
                                id={unit.name}
                                className={"EnabledInjuryButton"}
                                onClick={(e) => { toggleButton(e, show); }}>
                                {`${unit.name} (${unit.type})`}
                            </button>}
                        content={(hide: any) => (
                            <InjuriesModal parent={`${unit.name}Injury`}>
                                <HeroInjuriesDialog unit={selectedUnit} callback={hide} update={updateSelectedUnit}></HeroInjuriesDialog>
                            </InjuriesModal>
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
            <button className={"ContinueButton"} style={{ display: "grid" }} onClick={finishHenchmenInjuries}>Continue</button>
            <div>*Note: dead heros are removed from your Roster</div>
        </div>
    </div> : <div></div>;
    const overview = updatedUnitList.length === 0 ? <div>No Heros have been injured.</div> : updatedUnitList;
    return (
        <div id="InjuryContainer" style={{ display: "inline-table", fontSize: 14 }}>
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 1b: Hero Injuries </div>
            {overview}
            {heroStuff}
        </div>
    );
};
