import React from 'react';
import { IMeleeWeapon, IEquiList, IMissileWeapon, IArmour, IMiscallaneous } from '../constants';
import { filterMeleeWeapons, filterMissileWeapons, filterArmour, filterMiscallaneous } from '../utilities/utils';
export class EquipmentTable extends React.Component<IEquiList, {}> {
    private meleeEquipment: IMeleeWeapon[];
    private missileEquipment: IMissileWeapon[];
    private armourEquipment: IArmour[];
    private miscEquipment: IMiscallaneous[];
    constructor(props: IEquiList) {
        super(props);
        this.meleeEquipment = filterMeleeWeapons(props.names);
        this.missileEquipment = filterMissileWeapons(props.names);
        this.armourEquipment = filterArmour(props.names);
        this.miscEquipment = filterMiscallaneous(props.names);
    }
    createMeleeTableRows() {
        return this.meleeEquipment.map((weapon) => {
            return (
                <tr key={weapon.name}>
                    <td>{weapon.name}</td>
                    <td>{weapon.cost}</td>
                    <td><button>Add</button></td>
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
                    <td><button>Add</button></td>
                </tr>
            )
        })
    }
    createArmorTableRows() {
        return this.armourEquipment.map((armor) => {
            return (
                <tr key={armor.name}>
                    <td>{armor.name}</td>
                    <td>{armor.cost}</td>
                    <td><button>Add</button></td>
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
                    <td><button>Add</button></td>
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
            <div >
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