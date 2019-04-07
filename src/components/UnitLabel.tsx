import React from "react";
import { ILabel } from "../constants";

export const UnitLabelComponent = (props: ILabel) => (
    <div id={props.title} style={{ float: "left", paddingLeft: 5, paddingRight: 5 }}>
        <div style={{ fontWeight: "bold" }}>{props.title}</div>
        <div>{props.value}</div>
    </div>
);
