import React from "react";
import { IUnit } from "../../constants";
import { checkRacialMaximums } from "../../utilities/utils";

export const Characteristics = ({ unit }: { unit: IUnit }) => {
    const maxReachedArr = checkRacialMaximums(unit);
    const headerLine = <tr key={"characteristicsHeader"} style={{ fontWeight: "bold" }}>
        <td style={{ width: 20 }}>M</td>
        <td style={{ width: 20 }}>WS</td>
        <td style={{ width: 20 }}>BS</td>
        <td style={{ width: 20 }}>S</td>
        <td style={{ width: 20 }}>T</td>
        <td style={{ width: 20 }}>W</td>
        <td style={{ width: 20 }}>I</td>
        <td style={{ width: 20 }}>A</td>
        <td style={{ width: 20 }}>LD</td>
    </tr>;
    const tableContent = maxReachedArr.map((item) => {
        const value = unit.characteristics[item.name];
        return (
            item.maxReached ?
                <td key={`${unit.name}${item.name}WithTooltip`} title="This value has already reached its maximum and cannot be advanced any further">
                    {`${value}*`}
                </td> :
                <td key={`${unit.name}${item.name}`}>{value}</td>
        );
    });
    return (
        <div >
            <table>
                <caption style={{ textAlign: "left", fontWeight: "bold" }}>Characteristics</caption>
                <tbody>
                    {headerLine}
                    <tr key={"characteristicsData"}>
                        {tableContent}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
