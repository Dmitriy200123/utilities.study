import React from "react";
import {observer} from "mobx-react-lite";
import {IUtility} from "../../../UtilitiesStores/Utilities/Contracts/IUtility";
import {Link} from "react-router-dom";
import {UtilityCard} from "./UtilityCard";

export interface IUtilityCardsProps {
    items: Array<IUtility>,
}

export const UtilityCards = observer((props: IUtilityCardsProps) => {
    return <div className=' scroll horizontalScroll'> {
        props.items.map(item => (
            <div className='' key={item.id}>
                <Link to={item.link}>
                    <UtilityCard info={item}/>
                </Link>
            </div>)
        )
    }
    </div>
});

