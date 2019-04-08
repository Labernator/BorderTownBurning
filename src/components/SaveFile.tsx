import { store } from "..";
import React, { useEffect } from "react";
import { Http2ServerResponse } from "http2";
import { send } from "q";

export const SaveFile = () => {

    const onSaveClick = (event: any) => { 
         saveData( store.getState(), "warband.json");
      };

      var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        // a.style = "display: none";
        return function (data : any, fileName : any) {
            var json = JSON.stringify(data),
                blob = new Blob([json], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    return <div>
                <button id="saveBtn" className="EnabledButton" onClick={onSaveClick}>Save file</button>
            </div>;
};