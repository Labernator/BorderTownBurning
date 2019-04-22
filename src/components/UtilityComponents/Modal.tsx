import ReactDOM from "react-dom";
import React from "react";

export const Modal = ({ children }: {children: any}) => (
  ReactDOM.createPortal(
      <div className="modal">
        {children}
      </div>,
      document.getElementById("modal-root") as HTMLElement)
);
