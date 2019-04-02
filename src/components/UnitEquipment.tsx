import React from "react";
import { IMeleeWeapon, IMissileWeapon, IArmour, IMiscallaneous, IUnitEquipment } from "../constants";
import { filterMeleeWeapons, filterMissileWeapons, filterArmour, filterMiscallaneous, getEquipment } from "../utilities/utils";
import { store } from "..";
import { UPDATE_UNIT, SUBTRACT_MONEY_FROM_TREASURY } from "../actions";
let counter = 0;
export class UnitEquipment extends React.Component<IUnitEquipment> {
    private readonly meleeEquipment: IMeleeWeapon[];
    private readonly missileEquipment: IMissileWeapon[];
    private readonly armourEquipment: IArmour[];
    private readonly miscEquipment: IMiscallaneous[];
    constructor(props: IUnitEquipment) {
        super(props);
        const availableEquipment = getEquipment(props.unit.allowedEquipment);
        const equipmentNames = availableEquipment.map((equipment) => equipment.type);
        this.meleeEquipment = filterMeleeWeapons(equipmentNames);
        this.missileEquipment = filterMissileWeapons(equipmentNames);
        this.armourEquipment = filterArmour(equipmentNames);
        this.miscEquipment = filterMiscallaneous(equipmentNames);
    }

    public render() {
        const meleeTableRows = this.createMeleeTableRows();
        let meleeHeader;
        let meleeTableHeader;
        let missileHeader;
        let missileTableHeader;
        let armourHeader;
        let armourTableHeader;
        let miscTableHeader;
        let miscHeader;
        if (meleeTableRows.length > 0) {
            meleeTableHeader = this.createTableHeader("Melee Weapons");
            meleeHeader = this.createTh("Weapon");
        }
        const missileTableRows = this.createMissileTableRows();
        if (missileTableRows.length > 0) {
            missileTableHeader = this.createTableHeader("Missile Weapons");
            missileHeader = this.createTh("Weapon");
        }
        const armourRows = this.createArmorTableRows();
        if (armourRows.length > 0) {
            armourTableHeader = this.createTableHeader("Armours");
            armourHeader = this.createTh("Armour");
        }
        const miscRows = this.createMiscTableRows();
        if (miscRows.length > 0) {
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

    private addItemToUnit(item: IArmour | IMeleeWeapon | IMissileWeapon | IMiscallaneous) {
        const updateUnit = this.props.unit;
        updateUnit.equipment.push(item.type);
        store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
        store.dispatch({ type: SUBTRACT_MONEY_FROM_TREASURY, payload: item.cost });
    }
    private createBuyButton(item: IArmour | IMeleeWeapon | IMissileWeapon | IMiscallaneous) {
        let buyBtn;
        if (item.cost <= store.getState().armyTreasury) {
            buyBtn = <button onClick={() => this.addItemToUnit(item)} className="BuyButton">Buy</button>;
        } else {
            buyBtn = <button onClick={() => this.addItemToUnit(item)} className="BuyButton" disabled style={{ background: "lightgray" }} title="Insufficient funds">Buy</button>;
        }
        return (
            buyBtn
        );
    }
    private createMeleeTableRows() {
        return this.meleeEquipment.map((weapon) => (
            <tr key={weapon.type}>
                <td>{weapon.type}</td>
                <td>{weapon.cost}</td>
                <td>
                    {this.createBuyButton(weapon)}
                </td>
            </tr>
        ));
    }
    private createMissileTableRows() {
        return this.missileEquipment.map((weapon) => (
            <tr key={weapon.type}>
                <td>{weapon.type}</td>
                <td>{weapon.cost}</td>
                <td>
                    {this.createBuyButton(weapon)}
                </td>
            </tr>
        ));
    }
    private createArmorTableRows() {
        return this.armourEquipment.map((armour) => (
            <tr key={armour.type}>
                <td>{armour.type}</td>
                <td>{armour.cost}</td>
                <td>
                    {this.createBuyButton(armour)}
                </td>
            </tr>
        ));
    }
    private createMiscTableRows() {
        return this.miscEquipment.map((misc) => (
            <tr key={misc.type}>
                <td>{misc.type}</td>
                <td>{misc.cost}</td>
                <td>
                    {this.createBuyButton(misc)}
                </td>
            </tr>
        ));
    }
    private createTh(input: string) {
        counter++;
        return (
            <tr key={`${input}${counter}`}>
                <th>{input}</th>
                <th>Cost</th>
            </tr>
        );
    }
    private createTableHeader(input: string) {
        return (
            <tr key={input}>
                <th colSpan={3}>{input}</th>
            </tr>
        );
    }
}
