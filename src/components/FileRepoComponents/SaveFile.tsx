import { store } from "../..";
import React from "react";

export const SaveFile = () => {

    const onSaveClick = () => {
        saveData(store.getState(), "warband.json");
    };

    const saveData = (() => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        // a.style = "display: none";
        return (data: any, fileName: any) => {
            const json = JSON.stringify(data);
            const blob = new Blob([json], { type: "octet/stream" });
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    })();

    return <button id="saveBtn" className="SaveDataButton" onClick={onSaveClick}>Save file</button>;
};
