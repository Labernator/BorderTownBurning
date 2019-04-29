import React from "react";
import { IArmyStash } from "../../constants";

export const ArmyStashContainer = ({ stash }: { stash: IArmyStash[] }) => {
    const content = stash.map((stashedItem) => <div key={`${stashedItem.name}Stash`}>{`${stashedItem.amount}x ${stashedItem.name}`}</div>);
    return <div>
        <div className="AppHeaderContainerDiv">Stash:</div>
        {content}
    </div>;
};
