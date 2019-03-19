import React from 'react';
import { IMeleeWeapon, IEquiList } from '../constants';
import { filterMeleeWeapons } from '../utilities/utils';
export class EquipmentTable extends React.Component<IEquiList, {}> {
    private meleeEquipment: IMeleeWeapon[];
    constructor(props: IEquiList) {
        super(props);
        this.meleeEquipment = filterMeleeWeapons(props.names);
    }
    createTableRows() {
        let renderer;

        this.meleeEquipment.forEach((weapon) => {
            renderer.push(
                <tr>
                    <td>{weapon.name}</td>
                    <td>{weapon.cost}</td>
                </tr>
            )
        })
        return (
            renderer
        );
    }

    render() {
        const tableRows = this.createTableRows();
        return (
            <div >
                <table>
                    <tbody>
                        <tr>
                            <th>Weapon</th>
                            <th>Cost</th>
                        </tr>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}