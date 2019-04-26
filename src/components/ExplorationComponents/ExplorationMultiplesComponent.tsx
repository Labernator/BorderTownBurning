import React, { useState } from "react";
import { ExplorationSteps } from "./ExplorationContainer";
import { HeroMultiplesEnum } from "../../constants";

export const ExplorationMultiplesComponent = ({ finishWorkflow }: { finishWorkflow: any }) => {
    const [isOverview, shownOverview] = useState(false);
    const ok = () => {
        // store.dispatch({ type: ADD_WYRDSTONES, payload: getWyrdstonesFromInput() });
        shownOverview(true);
        finishWorkflow(ExplorationSteps.SellWyrdstones);
    };

    const handleBtnClick = (input: string) => { window.alert("this lacks implementation"); };

    const multiplesList: HeroMultiplesEnum[] = HeroMultiplesEnum.getBasicProps();

    const renderDivs = multiplesList.map((multiple) =>
        (
            <div key={multiple.toString()} style={{ display: "grid" }}>
                <button
                    onClick={(e) => handleBtnClick(multiple.toString())}
                    className="heroInjuryButton">
                    {multiple.text}
                </button>
            </div>
        ));
    const content = (overviewMode: boolean) => {
        if (!overviewMode) {
            return (
                <div id="ExplorationChartComponent">
                    <div>If you rolled any multiples (doubles, triples, etc.), please select the highest multiple from the list below:</div>
                    {renderDivs}
                    <button style={{ clear: "both", float: "left" }} onClick={ok}>Ok</button>
                </div>
            );
        } else {
            return (
                <div id="ExplorationChartComponent">
                    <div>
                        This needs implementation.
                    </div>
                </div>
            );
        }
    };

    return (
        content(isOverview)
    );
};
