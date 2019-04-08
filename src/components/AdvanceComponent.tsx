import React from "react";
import { IUnitProps } from "../constants";

export const AdvanceComponent = (props: IUnitProps) => {
    const unitId = `${props.unit.name}Advance`;
    return (
        <div id={unitId} style={{ display: "none"}}>
            <button>Add New Skill</button>
            <button>Add +1 Weaponskill</button>
            <button>Add +1 Ballistickill</button>
            <button>Add +1 Strength</button>
            <button>Add +1 Toughness</button>
            <button>Add +1 Wounds</button>
            <button>Add +1 Initiative</button>
            <button>Add +1 Attack</button>
            <button>Add +1 Leadership</button>
        </div>
    );
};
