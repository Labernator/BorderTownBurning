import React, { useState } from "react";
import { HeroInjuriesEnum } from "../../constants";

export const DeepWoundDialog = ({ id, btnClick }: { id: string; btnClick: any }) => {
    const [inputValue, setInputValue] = useState("");
    const onInput = (e: any) => {
        const re = /^[1-3\b]+$/;
        // tslint:disable-next-line:max-line-length
        if (e.target.value === "" || (re.test(e.target.value) && e.target.value.length === 1)) {
            setInputValue(e.target.value);
        }
    };
    return (
        <div key={id}>
            <div>Please enter how many turns the warrior is going to miss (1-3):</div>
            <input
                id={id}
                value={inputValue}
                onChange={onInput}></input>
            <button onClick={(e) => btnClick(e, HeroInjuriesEnum.DEEP_WOUND_INPUT.toString(), inputValue)}>ok</button>
        </div>
    );
};
