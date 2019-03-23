import React from 'react';
import { IEquiList } from '../constants';
export class Skills extends React.Component<IEquiList, {}> {
    private skills: string[];
    constructor(props: IEquiList) {
        super(props);
        this.skills = props.names;
    }
    createSkillsTableRows() {
        return this.skills.map((skill) => {
            return (
                <tr>
                    <td>{skill}</td>
                </tr>
            )
        })
    }
    createSkillsHeader() {
        return (
            <tr>
                <th>Skills</th>
            </tr>
        )
    }
    render() {
        const skillTableRows = this.createSkillsTableRows();
        let skillsHeader;
        if (skillTableRows.length) {
            skillsHeader = this.createSkillsHeader();
        }
        return (
            <div >
                <table>
                    <tbody>
                        {skillsHeader}
                        {skillTableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}