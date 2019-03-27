import React from "react";
import { IList } from "../constants";
export class Equipment extends React.Component<IList> {
    private equipment: string[];
    constructor(props: IList) {
        super(props);
        this.equipment = props.names;
    }

    public render() {
        const equiTableRows = this.createEquipmentTableRows();
        let equiHeader;
        if (equiTableRows.length > 0) {
            equiHeader = this.createEquipmentHeader();
        }
        return (
            <div >
                <table>
                    <tbody>
                        {equiHeader}
                        {equiTableRows}
                        <tr><td><button onClick={() => this.showEquipment()} style={{ width: 150 }}>buy extra equipment</button></td></tr>
                    </tbody>
                </table>
            </div>
        );
    }
    private showEquipment() {
        const domElement = document.getElementById("equipmentTable");
        if (domElement !== null) {
            domElement.style.display = "block";
        }
    }
    private createEquipmentTableRows() {
        return this.equipment.map((equi) => (
                <tr key={equi}>
                    <td>{equi}</td>
                </tr>
            ),
        );
    }
    private createEquipmentHeader() {
        return (
            <tr>
                <th>Equipment</th>
            </tr>
        );
    }
}
