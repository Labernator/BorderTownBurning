import React from "react";

export const EditComponent = ({ tooltip }: { tooltip: string }) => (
    <img src="https://image.flaticon.com/icons/svg/61/61456.svg" style={{ height: 10, paddingLeft: 5 }} title={tooltip}></img>
);
