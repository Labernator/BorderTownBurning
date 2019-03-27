import React from "react";
import { IMeleeWeapon, IMissileWeapon, IArmour, IMiscallaneous, IUnitEquipment } from "../constants";
import { filterMeleeWeapons, filterMissileWeapons, filterArmour, filterMiscallaneous, getEquipment } from "../utilities/utils";
import { store } from "..";
import { UPDATE_UNIT, SUBTRACT_MONEY_FROM_TREASURY } from "../actions";
export class UnitEquipment extends React.Component<IUnitEquipment> {
    private meleeEquipment: IMeleeWeapon[];
    private missileEquipment: IMissileWeapon[];
    private armourEquipment: IArmour[];
    private miscEquipment: IMiscallaneous[];
    constructor(props: IUnitEquipment) {
        super(props);
        const availableEquipment = getEquipment(props.unit.allowedEquipment);
        const equipmentNames = availableEquipment.map((equipment) => equipment.name);
        this.meleeEquipment = filterMeleeWeapons(equipmentNames);
        this.missileEquipment = filterMissileWeapons(equipmentNames);
        this.armourEquipment = filterArmour(equipmentNames);
        this.miscEquipment = filterMiscallaneous(equipmentNames);
    }

    addItemToUnit(item: IArmour | IMeleeWeapon | IMissileWeapon | IMiscallaneous) {
        const updateUnit = this.props.unit;
        updateUnit.equipment.push(item.name);
        store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
        store.dispatch({ type: SUBTRACT_MONEY_FROM_TREASURY, payload: item.cost });
    }
    createMeleeTableRows() {
        return this.meleeEquipment.map((weapon) => {
            return (
                <tr key={weapon.name}>
                    <td>{weapon.name}</td>
                    <td>{weapon.cost}</td>
                    <td>
                        <button onClick={() => this.addItemToUnit(weapon)}>Add</button>
                    </td>
                </tr>
            )
        })
    }
    createMissileTableRows() {
        return this.missileEquipment.map((weapon) => {
            return (
                <tr key={weapon.name}>
                    <td>{weapon.name}</td>
                    <td>{weapon.cost}</td>
                    <td>
                        <button onClick={() => this.addItemToUnit(weapon)}>Add</button>
                    </td>
                </tr>
            )
        })
    }
    createArmorTableRows() {
        return this.armourEquipment.map((armour) => {
            return (
                <tr key={armour.name}>
                    <td>{armour.name}</td>
                    <td>{armour.cost}</td>
                    <td>
                        <button onClick={() => this.addItemToUnit(armour)}>Add</button>
                    </td>
                </tr>
            )
        })
    }
    createMiscTableRows() {
        return this.miscEquipment.map((misc) => {
            return (
                <tr key={misc.name}>
                    <td>{misc.name}</td>
                    <td>{misc.cost}</td>
                    <td>
                        <button onClick={() => this.addItemToUnit(misc)}>Add</button>
                    </td>
                </tr>
            )
        })
    }
    createTh(input: string) {
        return (
            <tr key={input}>
                <th>{input}</th>
                <th>Cost</th>
            </tr>
        )
    }
    createTableHeader(input: string) {
        return (
            <tr key={input}>
                <th colSpan={3}>{input}</th>
            </tr>
        )
    }

    render() {
        const meleeTableRows = this.createMeleeTableRows();
        let meleeHeader, meleeTableHeader, missileHeader, missileTableHeader, armourHeader, armourTableHeader, miscTableHeader, miscHeader;
        if (meleeTableRows.length) {
            meleeTableHeader = this.createTableHeader("Melee Weapons");
            meleeHeader = this.createTh("Weapon");
        }
        const missileTableRows = this.createMissileTableRows();
        if (missileTableRows.length) {
            missileTableHeader = this.createTableHeader("Missile Weapons");
            missileHeader = this.createTh("Weapon");
        }
        const armourRows = this.createArmorTableRows();
        if (armourRows.length) {
            armourTableHeader = this.createTableHeader("Armours");
            armourHeader = this.createTh("Armour");
        }
        const miscRows = this.createMiscTableRows();
        if (miscRows.length) {
            miscTableHeader = this.createTableHeader("Miscallaneous Equipment");
            miscHeader = this.createTh("Misc");
        }
        return (
            <div id="equipmentTable" style={{ display: "none", border: "solid" }}>
                <table>
                    <tbody>
                        {meleeTableHeader}
                        {meleeHeader}
                        {meleeTableRows}
                        {missileTableHeader}
                        {missileHeader}
                        {missileTableRows}
                        {armourTableHeader}
                        {armourHeader}
                        {armourRows}
                        {miscTableHeader}
                        {miscHeader}
                        {miscRows}
                    </tbody>
                </table>
            </div>
        );
    }
}