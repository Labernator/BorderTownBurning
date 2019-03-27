import React from "react";
import { ICharTable } from "../constants";
export class CharacteristicTable extends React.Component<ICharTable> {
    constructor(props: ICharTable) {
        super(props);
    }
    public render() {
        return (
            <div >
                <table>
                    <tbody>
                        <tr>
                            <th>Movement</th>
                            <td>{this.props.characteristics.Movement}</td>
                        </tr>
                        <tr>
                            <th>WeaponSkill</th>
                            <td>{this.props.characteristics.WeaponSkill}</td>
                        </tr>
                        <tr>
                            <th>BallisticSkill</th>
                            <td>{this.props.characteristics.BallisticSkill}</td>
                        </tr>
                        <tr>
                            <th>Strength</th>
                            <td>{this.props.characteristics.Strength}</td>
                        </tr>
                        <tr>
                            <th>Toughness</th>
                            <td>{this.props.characteristics.Toughness}</td>
                        </tr>
                        <tr>
                            <th>Wounds</th>
                            <td>{this.props.characteristics.Wounds}</td>
                        </tr>

                        <tr>
                            <th>Initiative</th>
                            <td>{this.props.characteristics.Initiative}</td>
                        </tr>
                        <tr>
                            <th>Attacks</th>
                            <td>{this.props.characteristics.Attacks}</td>
                        </tr>
                        <tr>
                            <th>Leadership</th>
                            <td>{this.props.characteristics.Leadership}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
