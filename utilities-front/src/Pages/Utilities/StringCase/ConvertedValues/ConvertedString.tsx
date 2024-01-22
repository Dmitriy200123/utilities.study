import {observer} from "mobx-react-lite";
import {IConvertedString} from "../../../../UtilitiesStores/StringCase/Contracts/IConvertedString";

export interface IConvertedStringProps{
    convertedString: IConvertedString,
}

export const ConvertedString = observer((props: IConvertedStringProps) => {
    return (
        <div id={props.convertedString.id}>
            <div>{props.convertedString.value}</div>
            <div>{props.convertedString.convertType}</div>
        </div>
    )
})