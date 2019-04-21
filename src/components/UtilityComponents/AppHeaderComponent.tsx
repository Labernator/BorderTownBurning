import React from "react";
import { ILabel } from "../../constants";

export const AppHeaderComponent = (props: ILabel) => (
    <div>
        <div className="AppHeaderContainerDiv">{props.title}</div>
        <div className="AppHeaderContainerContent">{props.value}</div>
    </div>
);
