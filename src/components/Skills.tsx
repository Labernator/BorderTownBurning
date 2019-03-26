import React from 'react';
import { IList } from '../constants';
export class Skills extends React.Component<IList, {}> {
    private skills: string[];
    constructor(props: IList) {
        super(props);
        this.skills = props.names;
    }
    createSkillsTableRows() {
        return this.skills.map((skill) => {
            return (
                <tr key={skill}>
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