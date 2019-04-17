import React from "react";
import { IAdvance } from "../constants";
import { checkRacialMaximums, getHeroCount } from "../utilities/utils";
import { UPDATE_UNIT } from "../actions";
import { store } from "..";
import { ToggleContent } from "./ToggleComponent";
import { Modal } from "./Modal";
import { SkillsComponent } from "./SkillsComponent";
import { LadsGotTalentComponent } from "./LadsGotTalentComponent";

export const AdvanceComponent = (props: IAdvance) => {
    const componentId = `${props.unit.name}Advance`;
    const maxReachedArr = checkRacialMaximums(props.unit);
    const advanceCharacteristic = (characteristic: string) => {
        const updateUnit = props.unit;
        updateUnit.characteristics[characteristic] = updateUnit.characteristics[characteristic] + 1;
        store.dispatch({ type: UPDATE_UNIT, payload: updateUnit });
        props.callback();
    };
    const buttonArray = maxReachedArr.map((item) => {
        if (item.name === "Movement") {
            return undefined;
        }
        if (!props.unit.isHero && (item.name === "Toughness" || item.name === "Wounds")) {
            return undefined;
        }
        const btnText = `Add +1 ${item.name}`;
        const btnKey = `${props.unit.name}${item.name}`;
        return item.maxReached ? undefined : <button className="EnabledButton" key={btnKey} onClick={() => advanceCharacteristic(item.name)}>{btnText}</button>;
    });
    const ladsComponent = getHeroCount() < 6 ?
        <ToggleContent
            toggle={(show: any) => (
                <button
                    id={componentId}
                    onClick={(show)}
                    className="EnabledButton">
                    Lad's got Talent
                </button>)}
            content={(hide: any) => (
                <Modal>
                    {<LadsGotTalentComponent unit={props.unit} callbacks={[hide, props.callback]}></LadsGotTalentComponent>}
                </Modal>
            )} /> : undefined;
    const skillComp = props.unit.isHero || props.unit.isHiredSword ? <ToggleContent
        toggle={(show: any) => (
            <button
                id={componentId}
                onClick={(show)}
                className="EnabledButton">
                Add New Skill
        </button>)}
        content={(hide: any) => (
            <Modal>
                <SkillsComponent unit={props.unit} callbacks={[hide, props.callback]}></SkillsComponent>
            </Modal>
        )} /> : ladsComponent;
    return (
        <div id={componentId}>
            {skillComp}
            {buttonArray}
        </div>
    );
};
