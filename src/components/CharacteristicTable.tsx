import React from "react";
import { IUnit } from "../constants";
import { checkRacialMaximums } from "../utilities/utils";

export const CharacteristicsComponent = ({ unit }: { unit: IUnit }) => {
    const maxReachedArr = checkRacialMaximums(unit);
    const tableContent = maxReachedArr.map((item) => {
        const value = unit.characteristics[item.name];
        const trKey = `${unit.name}${item.name}`;
        const asterix = item.maxReached ?
            <td title="This value has already reached its maximum and cannot be advanced any further">{`${value}*`}</td> : <td>{value}</td>;
        return (
            <tr key={trKey}>
                <th>{item.name}</th>
                {asterix}
            </tr>
        );
    });
    return (
        <div >
            <table>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </div>
    );
};
