import React from "react";
import { ILabel } from "../constants";
export class UnitLabel extends React.Component<ILabel> {
    private readonly title: string;
    private readonly value: string;
    constructor(props: ILabel) {
        super(props);
        this.title = props.title;
        this.value = props.value;
    }
    public render() {
        return (
            <div id="Wrapper" style={{ float: "left", width: 200 }}>
                <div style={{ fontWeight: "bold" }}>{this.title}</div>
                <div>{this.value}</div>
            </div>
        );
    }
}
