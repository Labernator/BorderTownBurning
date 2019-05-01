import React, { useState } from "react";
import { IInputValueTypes, IProbabilityReward } from "../../constants";
import { InputControl } from "./InputControl";

export const PlusInputControl = ({ probabilityReward, callback }: { probabilityReward: IProbabilityReward; callback(inputValueType: IInputValueTypes): void }) => {
    const [rollValue, setRollValue] = useState(false);
    let element: JSX.Element;
    if (rollValue) {
        element = <div>
            <div>{`Roll a D6. On a roll of ${probabilityReward.probability}+, you gain ${probabilityReward.input.amount.toString()} ${probabilityReward.input.itemName}`}</div>
            <div>{`Please enter the roll of ${probabilityReward.input.amount.toString()} to receive that many ${probabilityReward.input.itemName}`}</div>
            <InputControl input={probabilityReward.input} callback={callback} />
        </div>;
    } else {
        element = <div>
            <div>{`Roll a D6. On a roll of ${probabilityReward.probability}+, you gain ${probabilityReward.input.amount.toString()} ${probabilityReward.input.itemName}`}</div>
            <button onClick={() => setRollValue(true)}>Got it!</button>
            <button onClick={() => setRollValue(false)}>The dice hate me!</button>
        </div>;
    }
    return (
        <div key={probabilityReward.input.itemName}>
            {element}
        </div>
    );
};
