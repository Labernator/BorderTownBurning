import React from "react";
import { IUnitProps } from "../constants";
import { checkRacialMaximums } from "../utilities/utils";

export const CharacteristicsComponent = (props: IUnitProps) => {
    const maxReachedArr = checkRacialMaximums(props.unit);
    const tableContent = maxReachedArr.map((item) => {
        const value = props.unit.characteristics[item.name];
        const asterix = item.maxReached ?
            <td title="This value has already reached its maximum and cannot be advanced any further">{`${value}*`}</td> : <td>{value}</td>;
        return (
            <tr>
                <th>{item.name}</th>
                {asterix}
            </tr>
        );
    },
    );
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
