import ReactDOM from "react-dom";
import React from "react";

export const PostSequenceModal = ({ children, parent }: { children: any; parent: string }) => (
    ReactDOM.createPortal(
        <div className="PostSequenceModal">
            {children}
        </div>,
        document.getElementById(parent) as HTMLElement,
    )
);
