import React from "react";
import { printStringArray } from "../utilities/utils";
export const ListComponent = ({ title, names }: { title: string; names: string[] | undefined }) => {
    if (names != undefined && names.length > 0) {
        return (
            <div >
                <div style={{ fontWeight: "bold" }}>{title}</div>
                <div>{printStringArray(names)}</div>
            </div>
        );
    } else {
        return null;
    }
};
