import React from "react";
import { IUnitProps } from "../constants";
import { checkRacialMaximums } from "../utilities/utils";

export const CharacteristicsComponent = (props: IUnitProps) => {
    checkRacialMaximums(props.unit);

    return (
        <div >
            <table>
                <tbody>
                    <tr>
                        <th>Movement</th>
                        <th>WeaponSkill</th>
                        <th>BallisticSkill</th>
                        <th>Strength</th>
                        <th>Toughness</th>
                        <th>Wounds</th>
                        <th>Initiative</th>
                        <th>Attacks</th>
                        <th>Leadership</th>
                    </tr>
                    <tr>
                        <td>{props.unit.characteristics.Movement}</td>
                        <td>{props.unit.characteristics.WeaponSkill}</td>
                        <td>{props.unit.characteristics.BallisticSkill}</td>
                        <td>{props.unit.characteristics.Strength}</td>
                        <td>{props.unit.characteristics.Toughness}</td>
                        <td>{props.unit.characteristics.Wounds}</td>
                        <td>{props.unit.characteristics.Initiative}</td>
                        <td>{props.unit.characteristics.Attacks}</td>
                        <td>{props.unit.characteristics.Leadership}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
