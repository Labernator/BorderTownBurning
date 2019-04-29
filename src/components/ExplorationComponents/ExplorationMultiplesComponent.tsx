import React, { useState } from "react";
import { ExplorationSteps } from "./ExplorationContainer";
import { HeroMultiplesEnum, DiceEnum, IExplorationRewardEnum } from "../../constants";
import { MultiInputControl } from "../UtilityComponents/MultiInputControl";
import { store } from "../..";

export const ExplorationMultiplesComponent = ({ finishWorkflow }: { finishWorkflow: any }) => {
    const [isOverview, shownOverview] = useState(false);
    const [elementList, setElementList] = useState(HeroMultiplesEnum.getBasicProps());
    const ok = () => {
        shownOverview(true);
        finishWorkflow(ExplorationSteps.SellWyrdstones);
    };
    const [additionalRender, setAdditionalRender] = useState(<button className="heroInjuryButton" onClick={ok}>Not even a double 1 :(</button>);

    const handleMoney = (value: string) => {
        // store.dispatch({ type: ADD_MONEY_TO_TREASURY, payload: parseInt(value, 10) });
        ok();
    };
    const handleRazedVillage = (value: string) => {
        handleMoney(value);
    };

    const handleBtnClick = (multiple: HeroMultiplesEnum) => {

        switch (multiple) {
            case HeroMultiplesEnum.WATERING_HOLE:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "GoldCoins",
                                amount: DiceEnum["D6"],
                                type: IExplorationRewardEnum.GoldCoins,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.WATERING_HOLE.toString()));
                break;
            case HeroMultiplesEnum.RAZED_VILLAGE:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "GoldCoins",
                                amount: DiceEnum["2D6"],
                                type: IExplorationRewardEnum.GoldCoins,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.RAZED_VILLAGE.toString()));
                break;
            case HeroMultiplesEnum.MORTALLY_WOUNDED_WARRIOR:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "GoldCoins",
                                amount: DiceEnum["2D6"],
                                type: IExplorationRewardEnum.GoldCoins,
                            },
                            {
                                itemText: "",
                                itemName: "Wheelbarrow",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.MORTALLY_WOUNDED_WARRIOR.toString()));
                break;
            case HeroMultiplesEnum.DISCARDED_SADDLE_BAG:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "GoldCoins",
                                amount: DiceEnum["2D6"],
                                type: IExplorationRewardEnum.GoldCoins,
                            },
                            {
                                itemText: "",
                                itemName: "Victuals",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.DISCARDED_SADDLE_BAG.toString()));
                break;
            case HeroMultiplesEnum.STATUE:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "Lucky Charm",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Axe",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.STATUE.toString()));
                break;
            case HeroMultiplesEnum.RUNAWAY_HORSE:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "GoldCoins",
                                amount: DiceEnum["2D6"],
                                type: IExplorationRewardEnum.GoldCoins,
                            },
                            {
                                itemText: "",
                                itemName: "Rain Coat",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Net",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Garlic",
                                amount: 2,
                                type: IExplorationRewardEnum.Item,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.RUNAWAY_HORSE.toString()));
                break;
            case HeroMultiplesEnum.TREMBLING_BUSHES:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "Cathayan Silk Clothes",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.TREMBLING_BUSHES.toString()));
                break;
            case HeroMultiplesEnum.SECLUDED_COTTAGE:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "GoldCoins",
                                amount: DiceEnum["2D6"],
                                type: IExplorationRewardEnum.GoldCoins,
                            },
                            {
                                itemText: "",
                                itemName: "Dagger",
                                amount: DiceEnum["D6"],
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Sword",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "War Horn",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.SECLUDED_COTTAGE.toString()));
                break;
            case HeroMultiplesEnum.CRASHED_CARAVAN:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "GoldCoins",
                                amount: DiceEnum["2D6"],
                                type: IExplorationRewardEnum.GoldCoins,
                            },
                            {
                                itemText: "",
                                itemName: "Sword",
                                amount: DiceEnum["D3"],
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Dagger",
                                amount: DiceEnum["D6"],
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Spear",
                                amount: DiceEnum["D3"],
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Shield",
                                amount: DiceEnum["D6"],
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Light Armor",
                                amount: 1,
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Cathayan Map",
                                amount: DiceEnum["4+D6"],
                                type: IExplorationRewardEnum.Item,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.CRASHED_CARAVAN.toString()));
                break;
            case HeroMultiplesEnum.SLAUGHTERED_CONVOY:
                setAdditionalRender(
                    <MultiInputControl
                        inputs={[
                            {
                                itemText: "",
                                itemName: "GoldCoins",
                                amount: DiceEnum["3D6*5"],
                                type: IExplorationRewardEnum.GoldCoins,
                            },
                            {
                                itemText: "",
                                itemName: "Dagger",
                                amount: DiceEnum["D6"],
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Heavy Armour",
                                amount: DiceEnum["5+D6"],
                                type: IExplorationRewardEnum.Item,
                            },
                            {
                                itemText: "",
                                itemName: "Cathayan Map",
                                amount: DiceEnum["4+D6"],
                                type: IExplorationRewardEnum.Item,
                            },
                        ]}
                        inputCallback={handleMoney}
                    />,
                );
                setElementList(elementList.filter((multi) => multi.toString() === HeroMultiplesEnum.SLAUGHTERED_CONVOY.toString()));
                break;
            default:
                window.alert("this lacks implementation");
        }
    };

    const renderDivs = elementList.map((multiple) =>
        (
            <div key={multiple.toString()} style={{ display: "grid" }}>
                <button
                    onClick={(e) => handleBtnClick(multiple)}
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
                    {additionalRender}
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
