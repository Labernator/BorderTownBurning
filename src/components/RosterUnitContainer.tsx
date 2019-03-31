import React from "react";
import { connect } from "react-redux";
import "rc-select/assets/index.css";
import { store } from "..";
import * as Actions from "../actions";
import { IUnit, IAppState } from "../constants";
import { CharacteristicTable } from "./CharacteristicTable";
import { SkillLists } from "./SkillLists";
import { Skills } from "./Skills";
import { UnitEquipment } from "./UnitEquipment";
import { Equipment } from "./Equipment";
import { UnitLabel } from "./UnitLabel";

const RosterUnitContainer = ({ warbandRoster }: { warbandRoster: IUnit[] }) => {
    let counter = 0;
    const unitDivs = warbandRoster.map((unit) => {
        counter++;
        if (unit.type !== "") {
            const removeUnit = () => {
                store.dispatch({ type: Actions.REMOVE_UNIT_FROM_ROSTER, payload: unit });
                store.dispatch({ type: Actions.ADD_MONEY_TO_TREASURY, payload: unit.price });
                store.dispatch({ type: Actions.SUBTRACT_WARBAND_RATING, payload: unit });
                if (!Boolean(store.getState().listOfUnits.find((listitem) => listitem.type === unit.type))) {
                    store.dispatch({ type: Actions.ADD_UNIT_TO_UNITLIST, payload: unit });
                }
                return undefined;
            };
            const uniqueKey = `${unit.type}${counter}`;
            return (
                <div key={uniqueKey} style={{ border: "solid", display: "inline-block", position: "relative" }}>
                    <button style={{ position: "absolute", top: 0, right: 0 }} onClick={removeUnit} className="EnabledButton">
                        X
                    </button>
                    <UnitLabel title="Unit Type" value={unit.type}></UnitLabel>
                    <UnitLabel title="Unit Cost" value={unit.price.toString()}></UnitLabel>
                    <UnitLabel title="XP" value={unit.experience.toString()}></UnitLabel>
                    <Equipment unit={unit}></Equipment>
                    <UnitEquipment unit={unit}></UnitEquipment>
                    <SkillLists names={unit.skillLists}></SkillLists>
                    <Skills names={unit.skills}></Skills>
                    <CharacteristicTable characteristics={unit.characteristics} ></CharacteristicTable>
                </div>
            );
        }
    });
    return (
        <div>{unitDivs}</div>
    );
};
// tslint:disable-next-line:no-unused-expression
const mapStateToProps = (state: IAppState) => { ({ warbandRoster: state.warbandRoster }); return {}; };
export const UnitContainer = connect(mapStateToProps)(RosterUnitContainer);
