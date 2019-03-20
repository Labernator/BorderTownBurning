import React from 'react';
import { IMeleeWeapon, IEquiList, IMissileWeapon, IArmour } from '../constants';
import { filterMeleeWeapons, filterMissileWeapons, filterArmour } from '../utilities/utils';
export class EquipmentTable extends React.Component<IEquiList, {}> {
    private meleeEquipment: IMeleeWeapon[];
    private missileEquipment: IMissileWeapon[];
    private armourEquipment: IArmour[];
    constructor(props: IEquiList) {
        super(props);
        this.meleeEquipment = filterMeleeWeapons(props.names);
        this.missileEquipment = filterMissileWeapons(props.names);
        this.armourEquipment = filterArmour(props.names);
    }
    createMeleeTableRows() {
        return this.meleeEquipment.map((weapon) => {
            return (
                <tr>
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
                <tr>
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
                <tr>
                    <td>{armor.name}</td>
                    <td>{armor.cost}</td>
                    <td><button>Add</button></td>
                </tr>
            )
        })
    }


    render() {
        const meleeTableRows = this.createMeleeTableRows();
        const missileTableRows = this.createMissileTableRows();
        const armourRows = this.createArmorTableRows();
        return (
            <div >
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={3}>Melee Weapons</th>
                        </tr>
                        <tr>
                            <th>Weapon</th>
                            <th>Cost</th>
                        </tr>
                        {meleeTableRows}
                        <tr>
                            <th colSpan={3}>Missile Weapons</th>
                        </tr>
                        <tr>
                            <th>Weapon</th>
                            <th>Cost</th>
                        </tr>
                        {missileTableRows}
                        <tr>
                            <th colSpan={3}>Armour</th>
                        </tr>
                        <tr>
                            <th>Armour</th>
                            <th>Cost</th>
                        </tr>
                        {armourRows}
                    </tbody>
                </table>
            </div>
        );
    }
}