import React, { useState } from "react";
import { IUnit, PostSequence } from "../../constants";
import { store } from "../..";
import { REMOVE_KILLED_HENCHMAN } from "../../actions";
import { isToughUnit } from "../../utilities/utils";

export const HenchmenInjuryComponent = ({ warbandRoster, callback }: { warbandRoster: IUnit[]; callback: any }) => {
    const [selectedUnits, addSelectedUnit] = useState([] as IUnit[]);
    const [isOverviewMode, setOverviewMode] = useState(false);
    // React.MouseEvent<HTMLButtonElement>
    const toggleButton = (event: any) => {
        const selectedUnit = warbandRoster.find((unit) => unit.name === event.target.id);
        if (selectedUnit !== undefined) {
            if (event.target.className === "EnabledInjuryButton") {
                event.target.className = "SelectedInjuryButton";
                addSelectedUnit([...selectedUnits, selectedUnit]);
            } else {
                event.target.className = "EnabledInjuryButton";
                const idx = selectedUnits.findIndex((unit) => unit.name === event.target.id);
                const newSelectedUnits = [...selectedUnits.slice(0, idx), ...selectedUnits.slice(idx + 1)];
                addSelectedUnit(newSelectedUnits);
            }
        }
    };
    const finishHenchmenInjuries = () => {
        selectedUnits.forEach((unit) => {
            store.dispatch({ type: REMOVE_KILLED_HENCHMAN, payload: unit });
        });
        setOverviewMode(true);
        callback(PostSequence.HERO_INJURIES);
    };
    const henchmenList = warbandRoster.reduce((accumulator, unit) => {
        if ((!unit.isHero && !isToughUnit(unit)) || (unit.isHero && unit.isHiredSword)) {
            let numberOfHenchmen = 1;
            if (unit.number !== undefined) {
                numberOfHenchmen = unit.number;
            }
            let member = "";
            for (let i = 0; i < numberOfHenchmen; i++) {
                if (!unit.isHiredSword) {
                    member = ` [Group Member #${i + 1}]`;
                }
                accumulator.push(
                    <div key={`${unit.name}${i}Injury`} style={{ display: "grid" }}>
                        <button id={unit.name} className={"EnabledInjuryButton"} onClick={toggleButton}>{`${unit.name} (${unit.type})${member}`}</button>
                    </div>,
                );
            }
            return accumulator;
        }
        return accumulator;
    }, [] as JSX.Element[]);
    const units = selectedUnits.map((unit) => {
        if (unit.number !== undefined && unit.number !== selectedUnits.filter((henchmenGroup) => henchmenGroup.name === unit.name).length) {
            return (
                <div key={`${unit.name}`}>{`${unit.name} lost a member.`}</div>
            );
        } else {
            return (
                <div key={`${unit.name}`}>{`${unit.name} was disbanded.`}</div>
            );
        }
    });
    const overview = units.length === 0 ? <div>No Henchmen or Hired Swords have been injured.</div> : units;
    const returnElement = isOverviewMode ?
        <div>
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 1a: Henchmen & Hired Swords Injuries </div>
            {overview}
        </div>
        :
        <div>
            <div style={{ fontWeight: "bold", fontSize: 20 }}>PostSequence Step 1a: Henchmen & Hired Swords Injuries </div>
            <div>Please select all henchmen and hired swords,</div>
            <div>that went out of action during the battle and did not recover:</div>
            {henchmenList}
            <div style={{ display: "grid", paddingTop: 10 }}>
                <button className={"ContinueButton"} style={{ display: "grid" }} onClick={finishHenchmenInjuries}>Continue</button>
                <div>*Note: all selected members will be removed from your Roster</div>
            </div>
        </div>
        ;

    return (
        <div id="HenchmenInjuryContainer" className="PostSequenceComponent">
            {returnElement}
        </div>
    );
};
