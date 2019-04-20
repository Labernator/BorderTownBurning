import ReactDOM from "react-dom";
import React from "react";

export const InjuriesModal = ({ children, parent }: { children: any; parent: string }) => (
    ReactDOM.createPortal(
        <div className="InjuriesModal">
            {children}
        </div>,
        document.getElementById(parent) as HTMLElement,
    )
);
