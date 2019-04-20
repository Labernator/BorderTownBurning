import React from "react";
import { IUnit, PostSequence } from "../constants";

export const InjuryComponent = ({ warbandRoster, currentSequence }: { warbandRoster: IUnit[]; currentSequence: PostSequence }) => {

    const unitList = warbandRoster.map((unit) => {
        if (unit.isHero) {
            return (
                <div key={`${unit.name}Injury`} style={{ display: "flex" }}>
                    <input
                        name="isInjured"
                        type="checkbox"
                    // checked={this.state.isGoing}
                    // onChange={this.handleInputChange}
                    />
                    {`${unit.name} (${unit.type})`}
                </div>
            );
        }
    });
    const x: JSX.Element[] = [];
    warbandRoster.forEach((unit) => {
        if (!unit.isHero) {
            let numberOfHenchmen = 1;
            if (unit.number !== undefined) {
                numberOfHenchmen = unit.number;
            }
            for (let i = 0; i < numberOfHenchmen; i++) {
                x.push(
                    <div key={`${unit.name}Injury`} style={{ display: "flex" }}>
                        <input
                            name="isInjured"
                            type="checkbox"
                        // checked={this.state.isGoing}
                        // onChange={this.handleInputChange}
                        />
                        {`${unit.name} (${unit.type}) [Group Member #${i + 1}]`}
                    </div>,
                );
            }
        }
    });
    return (
        <div id="ArmyListContainer" style={{ display: "inline-table" }}>
            <div>Please select all warband members, that went out of action during the battle:</div>
            {unitList}
            {x}
            <button style={{ display: "flex" }}>Continue</button>
        </div>
    );
};
