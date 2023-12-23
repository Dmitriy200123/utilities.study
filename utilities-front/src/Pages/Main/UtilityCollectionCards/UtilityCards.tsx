import React from "react";
import {observer} from "mobx-react-lite";
import {IUtility} from "../../../UtilitiesStores/Utilities/Contracts/IUtility";
import {UtilityCard} from "./UtilityCard";
import './UtilityCardsStyle.css'

export interface IUtilityCardsProps {
    items: Array<IUtility>,
}

export const UtilityCards = observer((props: IUtilityCardsProps) => {
    return <div className='utilityCards scroll horizontalScroll'> {
        props.items.map(item => <UtilityCard key={item.id} info={item}/>)
    }
    </div>
});

