import React, { useState } from "react";
import { HeroInjuriesEnum } from "../../constants";

export const CapturedDialog = ({ id, btnClick }: { id: string; btnClick: any }) => {
    const [inputValue, setInputValue] = useState("");
    const onInput = (e: any) => {
        const re = /^[0-9\b]+$/;
        // tslint:disable-next-line:max-line-length
        if (e.target.value === "" || re.test(e.target.value)) {
            setInputValue(e.target.value);
        }
    };
    return (
        <div key={id}>
            <div>Please enter the amount you had to pay to free your hero:</div>
            <input
                id={id}
                value={inputValue}
                onChange={onInput}></input>
            <button onClick={(e) => btnClick(e, HeroInjuriesEnum.CAPTURED_INPUT.toString(), inputValue)}>ok</button>
        </div>
    );
};
