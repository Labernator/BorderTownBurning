import React from "react";
import { IList } from "../constants";
export class SkillLists extends React.Component<IList> {
    private readonly skillLists: string[];
    constructor(props: IList) {
        super(props);
        this.skillLists = props.names;
    }

    public render() {
        const skillListTableRows = this.createSkillListsTableRows();
        let skillListHeader;
        if (skillListTableRows.length > 0) {
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
    private createSkillListsTableRows() {
        return this.skillLists.map((skillList) => (
            <tr key={skillList}>
                <td >{skillList}</td>
            </tr>
        ));
    }
    private createSkillListsHeader() {
        return (
            <tr>
                <th>Skill Lists</th>
            </tr>
        );
    }
}
