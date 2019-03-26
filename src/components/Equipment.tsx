import React from 'react';
import { IList } from '../constants';
export class Equipment extends React.Component<IList, {}> {
    private equipment: string[];
    constructor(props: IList) {
        super(props);
        this.equipment = props.names;
    }
    showEquipment() {
        const domElement = document.getElementById("equipmentTable");
        if (domElement) {
            domElement.style.display = "block";
        }
    }
    createEquipmentTableRows() {
        return this.equipment.map((equi) => {
            return (
                <tr key={equi}>
                    <td>{equi}</td>
                </tr>
            )
        })
    }
    createEquipmentHeader() {
        return (
            <tr>
                <th>Equipment</th>
            </tr>
        )
    }
    render() {
        const equiTableRows = this.createEquipmentTableRows();
        let equiHeader;
        if (equiTableRows.length) {
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
}