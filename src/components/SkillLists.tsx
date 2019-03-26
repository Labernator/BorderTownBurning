import React from 'react';
import { IList } from '../constants';
export class SkillLists extends React.Component<IList, {}> {
    private skillLists: string[];
    constructor(props: IList) {
        super(props);
        this.skillLists = props.names;
    }
    createSkillListsTableRows() {
        return this.skillLists.map((skillList) => {
            return (
                <tr key={skillList}>
                    <td >{skillList}</td>
                </tr>
            )
        })
    }
    createSkillListsHeader() {
        return (
            <tr>
                <th>Skill Lists</th>
            </tr>
        )
    }

    render() {
        const skillListTableRows = this.createSkillListsTableRows();
        let skillListHeader;
        if (skillListTableRows.length) {
            skillListHeader = this.createSkillListsHeader();
        }
        return (
            <div >
                <table>
                    <tbody>
                        {skillListHeader}
                        {skillListTableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}