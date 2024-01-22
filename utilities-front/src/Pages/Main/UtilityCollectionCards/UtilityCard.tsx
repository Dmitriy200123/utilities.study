import {observer} from "mobx-react-lite";
import {IUtility} from "../../../UtilitiesStores/Utilities/Contracts/IUtility";

export interface IUtilityProps{
    info: IUtility,
}

export const UtilityCard = observer((props: IUtilityProps) => {
    return <>
        <p>{props.info.name}</p>
        <p>{props.info.description}</p>
    </>
})