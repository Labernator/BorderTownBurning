import React from "react";
import { IList } from "../constants";

export const ListComponent = (props: IList) => {
    const createTableRows = () => (
        props.names !== undefined ? props.names.map((entry) => (
            <tr key={entry}>
                <td>{entry}</td>
            </tr>
        )) : []
    );
    if (props.names != undefined && props.names.length > 0) {
        return (
            <div >
                <table>
                    <tbody>
                        <tr>
                            <th>{props.title}</th>
                        </tr>
                        {createTableRows()}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return null;
    }
};
