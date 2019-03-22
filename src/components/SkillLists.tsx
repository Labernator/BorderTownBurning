import React from 'react';
import { IMeleeWeapon, IEquiList, IMissileWeapon, IArmour, IMiscallaneous } from '../constants';
import { filterMeleeWeapons, filterMissileWeapons, filterArmour, filterMiscallaneous } from '../utilities/utils';
export class SkillLists extends React.Component<IEquiList, {}> {
    private skillLists: string[];
    constructor(props: IEquiList) {
        super(props);
        this.skillLists = props.names;
    }
    createSkillListsTableRows() {
        return this.skillLists.map((skillList) => {
            return (
                <tr>
                    <td>{skillList}</td>
                </tr>
            )
        })
    }

    render() {
        const skillListTableRows = this.createSkillListsTableRows();
        return (
            <div >
                <table>
                    <tbody>
                        <tr>
                            <th>Skill Lists</th>
                        </tr>
                        {skillListTableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}