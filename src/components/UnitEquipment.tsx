import React from "react";
import { IMeleeWeapon, IMissileWeapon, IArmour, IMiscallaneous, IUnit } from "../constants";
import { filterMeleeWeapons, filterMissileWeapons, filterArmour, filterMiscallaneous, getEquipment } from "../utilities/utils";
import { store } from "..";
import { UPDATE_UNIT, SUBTRACT_MONEY_FROM_TREASURY } from "../actions";
let counter = 0;
export const UnitEquipment = ({ unit }: { unit: IUnit }) => {
    const availableEquipment = getEquipment(unit.allowedEquipment);
    const equipmentNames = availableEquipment.map((equipment) => equipment.type);
    const meleeEquipment = filterMeleeWeapons(equipmentNames);
    const missileEquipment = filterMissileWeapons(equipmentNames);
    const armourEquipment = filterArmour(equipmentNames);
    const miscEquipment = filterMiscallaneous(equipmentNames);

    const calculateItemCost = (item: IArmour | IMeleeWeapon | IMissileWeapon | IMiscallaneous) => (
        unit.number !== undefined ? item.cost * unit.number : item.cost
    );

    const addItemToUnit = (item: IArmour | IMeleeWeapon | IMissileWeapon | IMiscallaneous) => {
        const updateUnit = unit;
        updateUnit.equipment ? updateUnit.equipment.push(item.type) : undefined;
        store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
        store.dispatch({ type: SUBTRACT_MONEY_FROM_TREASURY, payload: calculateItemCost(item) });
    };
    const createBuyButton = (item: IArmour | IMeleeWeapon | IMissileWeapon | IMiscallaneous) => {
        let buyBtn;
        calculateItemCost(item) <= store.getState().armyTreasury ?
            buyBtn = <button onClick={() => addItemToUnit(item)} className="BuyButton">Buy</button> :
            buyBtn = <button onClick={() => addItemToUnit(item)} className="BuyButton" disabled style={{ background: "lightgray" }} title="Insufficient funds">Buy</button>;
        return (
            buyBtn
        );
    };

    const createMeleeTableRows = () => (
        meleeEquipment.map((weapon) => (
            <tr key={weapon.type}>
                <td>{weapon.type}</td>
                <td>{weapon.cost}</td>
                <td>
                    {createBuyButton(weapon)}
                </td>
            </tr>
        ))
    );
    const createMissileTableRows = () => (
        missileEquipment.map((weapon) => (
            <tr key={weapon.type}>
                <td>{weapon.type}</td>
                <td>{weapon.cost}</td>
                <td>
                    {createBuyButton(weapon)}
                </td>
            </tr>
        ))
    );
    const createArmorTableRows = () => (
        armourEquipment.map((armour) => (
            <tr key={armour.type}>
                <td>{armour.type}</td>
                <td>{armour.cost}</td>
                <td>
                    {createBuyButton(armour)}
                </td>
            </tr>
        ))
    );
    const createMiscTableRows = () => (
        miscEquipment.map((misc) => (
            <tr key={misc.type}>
                <td>{misc.type}</td>
                <td>{misc.cost}</td>
                <td>
                    {createBuyButton(misc)}
                </td>
            </tr>
        ))
    );
    const createTh = (input: string) => {
        counter++;
        return (
            <tr key={`${input}${counter}`}>
                <th>{input}</th>
                <th>Cost</th>
            </tr>
        );
    };

    const createTableHeader = (input: string) => (
        <tr key={input}>
            <th colSpan={3}>{input}</th>
        </tr>
    );

    const meleeTableRows = createMeleeTableRows();
    const missileTableRows = createMissileTableRows();
    let meleeHeader;
    let meleeTableHeader;
    let missileHeader;
    let missileTableHeader;
    let armourHeader;
    let armourTableHeader;
    let miscTableHeader;
    let miscHeader;

    if (meleeTableRows.length > 0) {
        meleeTableHeader = createTableHeader("Melee Weapons");
        meleeHeader = createTh("Weapon");
    }

    if (missileTableRows.length > 0) {
        missileTableHeader = createTableHeader("Missile Weapons");
        missileHeader = createTh("Weapon");
    }
    const armourRows = createArmorTableRows();
    if (armourRows.length > 0) {
        armourTableHeader = createTableHeader("Armours");
        armourHeader = createTh("Armour");
    }
    const miscRows = createMiscTableRows();
    if (miscRows.length > 0) {
        miscTableHeader = createTableHeader("Miscallaneous Equipment");
        miscHeader = createTh("Misc");
    }
    const divId = `${unit.name}Equipment`;
    return (
        <div id={divId} style={{ display: "inline-flex" }}>
            <table>
                <tbody>
                    {meleeTableHeader}
                    {meleeHeader}
                    {meleeTableRows}
                </tbody>
            </table>
            <table>
                <tbody>
                    {missileTableHeader}
                    {missileHeader}
                    {missileTableRows}
                </tbody>
            </table>
            <table>
                <tbody>
                    {armourTableHeader}
                    {armourHeader}
                    {armourRows}
                </tbody>
            </table>
            <table>
                <tbody>
                    {miscTableHeader}
                    {miscHeader}
                    {miscRows}
                </tbody>
            </table>
        </div>
    );
};
