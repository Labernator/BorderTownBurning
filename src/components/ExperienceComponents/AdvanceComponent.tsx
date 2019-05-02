import React from "react";
import { IUnit, IDispatch } from "../../constants";
import { getHeroCount, getAdvanceOptions } from "../../utilities/utils";
import { UPDATE_UNIT } from "../../actions";
import { store } from "../..";
import { ToggleContent } from "../UtilityComponents/ToggleComponent";
import { SkillsComponent } from "./SkillsComponent";
import { LadsGotTalentComponent } from "./LadsGotTalentComponent";
import { PostSequenceModal } from "../UtilityComponents/PostSequenceModal";

export const AdvanceComponent = ({ unit, callback, advanceUpdate }: { unit: IUnit; callback: any; advanceUpdate(arr: IDispatch[]): void }) => {
    const advanceCharacteristic = (characteristic: string) => {
        advanceUpdate([{
            type: UPDATE_UNIT,
            payload: {
                ...unit,
                characteristics: { ...unit.characteristics, [characteristic]: unit.characteristics[characteristic] + 1 },
            },
        }]);
        callback();
    };

    const getLadsComponent = (additionalCallback: any) => (
        <LadsGotTalentComponent unit={unit} callbacks={[additionalCallback, callback]} advanceUpdate={advanceUpdate}></LadsGotTalentComponent>
    );

    const getSkillsComponent = (additionalCallback: any) => (
        <SkillsComponent unit={unit} callbacks={[additionalCallback, callback]} propagateDispatch={advanceUpdate}></SkillsComponent>
    );

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

    const isBestial = () => unit.skills !== undefined ? unit.skills.includes("Bestial") : false;
    const ladsComponent = (getHeroCount() < 6 && !isBestial()) ? getToggleComponent("Lad's got Talent", getLadsComponent) : undefined;
    const renderComponent = unit.isHero || unit.isHiredSword ? getToggleComponent("Add New Skill", getSkillsComponent) : ladsComponent;

    return (
        <div>
            {renderComponent}
            {getAdvanceOptions(unit, advanceCharacteristic)}
        </div>
    );
};
