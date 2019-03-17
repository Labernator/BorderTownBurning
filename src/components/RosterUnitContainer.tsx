import React from "react";
import { connect } from "react-redux";
import "rc-select/assets/index.css";
import { store } from "..";
import { REMOVE_UNIT_FROM_ROSTER, ADD_MONEY_TO_TREASURY, ADD_UNIT_TO_UNITLIST, SUBTRACT_WARBAND_RATING } from "../actions";
import { IUnit, ISelectionState } from "../constants";
import { getEquipment } from "../utilities/utils";
import { CharacteristicTable } from "./CharacteristicTable";

const RosterUnitContainer = ({ warbandRoster }: { warbandRoster: IUnit[] }) => {
    const unitDivs = warbandRoster.map((unit) => {
        if (unit.name !== "") {
            const handleClick = () => {
                store.dispatch({ type: REMOVE_UNIT_FROM_ROSTER, payload: unit });
                store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: unit.Price });
                store.dispatch({ type: SUBTRACT_WARBAND_RATING, payload: unit });
                if (!store.getState().listOfUnits.find(listitem => listitem.name === unit.name)) {
                    store.dispatch({ type: ADD_UNIT_TO_UNITLIST, payload: unit });
                }
                return undefined;
            };
            const availableEquipment = getEquipment(unit.allowedEquipment);
            const equipmentNames = availableEquipment.map(equipment => equipment.name)
            return (
                <div style={{ border: "solid" }}>
                    <button onClick={() => handleClick()} style={{ width: 250 }}>
                        Remove selected Unit from warband roster
                    </button>
                    <div>Unit Cost {unit.Price}</div>
                    <div>Unit Type {unit.name}</div>
                    <div>Exp {unit.experience}</div>
                    <div>Equipment {unit.equipment}</div>
                    <div>allowed Equipment {equipmentNames}</div>
                    <div>SkillLists {unit.SkillLists}</div>
                    <div>Skills {unit.Skills}</div>
                    <CharacteristicTable characteristics={unit.Characteristics} ></CharacteristicTable>
                </div>
            )
        }
    })
    return (
        <div>{unitDivs}</div>
    );
};
const mapStateToProps = (state: ISelectionState) => { ({ warbandRoster: state.warbandRoster }); return {} };
export const UnitContainer = connect(mapStateToProps)(RosterUnitContainer);
