import React from 'react';
import { ILabel } from '../constants';
export class UnitLabel extends React.Component<ILabel, {}> {
    private title: string;
    private value: string;
    constructor(props: ILabel) {
        super(props);
        this.title = props.title;
        this.value = props.value;
    }
    render() {
        return (
            <div id="Wrapper" style={{ float: "left", width: 200 }}>
                <div style={{ fontWeight: "bold" }}>{this.title}</div>
                <div>{this.value}</div>
            </div>
        );
    }
}