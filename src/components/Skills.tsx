import React from "react";
import { IList } from "../constants";
export class Skills extends React.Component<IList, {}> {
    private skills: string[];
    constructor(props: IList) {
        super(props);
        this.skills = props.names;
    }
    public render() {
        const skillTableRows = this.createSkillsTableRows();
        let skillsHeader;
        if (skillTableRows.length > 0) {
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

    private createSkillsTableRows() {
        return this.skills.map((skill) => (
                <tr key={skill}>
                    <td>{skill}</td>
                </tr>
            ),
        );
    }
    private createSkillsHeader() {
        return (
            <tr>
                <th>Skills</th>
            </tr>
        );
    }
}
