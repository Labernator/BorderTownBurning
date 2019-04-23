import React from "react";
import { IUnit } from "../../constants";
import { checkRacialMaximums, getHeroCount } from "../../utilities/utils";
import { UPDATE_UNIT } from "../../actions";
import { store } from "../..";
import { ToggleContent } from "../UtilityComponents/ToggleComponent";
import { SkillsComponent } from "./SkillsComponent";
import { LadsGotTalentComponent } from "./LadsGotTalentComponent";
import { PostSequenceModal } from "../UtilityComponents/PostSequenceModal";

export const AdvanceComponent = ({ unit, callback, advanceUpdate }: { unit: IUnit; callback: any; advanceUpdate: any }) => {
    const advanceCharacteristic = (characteristic: string) => {
        store.dispatch({
            type: UPDATE_UNIT,
            payload: {
                ...unit,
                characteristics: { ...unit.characteristics, [characteristic]: unit.characteristics[characteristic] + 1 },
            },
        });
        advanceUpdate(unit, characteristic, "characteristic");
        callback();
    };
    const advanceOptions = checkRacialMaximums(unit).map((item) => {
        if (item.name === "Movement" || (!unit.isHero && (item.name === "Toughness" || item.name === "Wounds"))) {
            return undefined;
        }
        return item.maxReached ? undefined :
            <button
                className="EnabledButton"
                key={`${unit.name}${item.name}`}
                onClick={() => advanceCharacteristic(item.name)}>
                {`Add +1 ${item.name}`}
            </button>;
    });
    const getToggleComponent = (buttonText: string, component: any) => (
        <ToggleContent
            toggle={(show: any) => (
                <button
                    id={`${unit.name}Advance`}
                    onClick={(show)}
                    className="EnabledButton">
                    {buttonText}
                </button>)}
            content={(hide: any) => (
                <PostSequenceModal parent={`${unit.name}AddExp`}>
                    {component(hide)}
                </PostSequenceModal>
            )} />
    );

    const getLadsComponent = (additionalCallback: any) => (
        <LadsGotTalentComponent unit={unit} callbacks={[additionalCallback, callback]} advanceUpdate={advanceUpdate}></LadsGotTalentComponent>
    );
    const getSkillsComponent = (additionalCallback: any) => (
        <SkillsComponent unit={unit} callbacks={[additionalCallback, callback]} advanceUpdate={advanceUpdate}></SkillsComponent>
    );

    const ladsComponent = getHeroCount() < 6 ? getToggleComponent("Lad's got Talent", getLadsComponent) : undefined;
    const renderComponent = unit.isHero || unit.isHiredSword ? getToggleComponent("Add New Skill", getSkillsComponent) : ladsComponent;

    return (
        <div>
            {renderComponent}
            {advanceOptions}
        </div>
    );
};
