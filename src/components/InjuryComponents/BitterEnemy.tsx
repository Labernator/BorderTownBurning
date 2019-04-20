import React, { useState } from "react";
import { HeroInjuriesEnum } from "../../constants";

export const BitterEnemyDialog = ({ id, btnClick }: { id: string; btnClick: any }) => {
    const [inputValue, setInputValue] = useState("");
    const onInput = (e: any) => {
        setInputValue(e.target.value);
    };
    return (
        <div key={id}>
            <div>Please enter the name of the enemy/warband/warband type that has put this hero out of action:</div>
            <input
                id={id}
                value={inputValue}
                onChange={onInput}></input>
            <button onClick={(e) => btnClick(e, HeroInjuriesEnum.BITTER_ENEMY_INPUT.toString(), inputValue)}>ok</button>
        </div>
    );
};
