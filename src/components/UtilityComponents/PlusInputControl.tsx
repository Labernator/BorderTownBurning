import React, { useState } from "react";
import { IInputValueTypes, IProbabilityReward } from "../../constants";
import { InputControl } from "./InputControl";

enum ProbEnum {
    true,
    false,
    undefined,
}

export const PlusInputControl = ({ probabilityReward, callback }: { probabilityReward: IProbabilityReward; callback(inputValueType: IInputValueTypes): void }) => {
    const [rollValue, setRollValue] = useState(ProbEnum.undefined);
    let element: JSX.Element;
    if (rollValue === ProbEnum.true) {
        element = <div>
            <InputControl input={probabilityReward.input} callback={callback} />
        </div>;
    } else if (rollValue === ProbEnum.undefined) {
        element = <div>
            <div>{`Roll a D6. On a roll of ${probabilityReward.probability}+, you gain ${probabilityReward.input.amount.toString()} ${probabilityReward.input.itemName}`}</div>
            <button onClick={() => setRollValue(ProbEnum.true)}>Got it!</button>
            <button onClick={() => setRollValue(ProbEnum.false)}>The dice hate me!</button>
        </div>;
    } else {
        element = <div></div>;
    }
    return (
        <div key={probabilityReward.input.itemName}>
            {element}
        </div>
    );
};
