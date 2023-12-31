import {observer} from "mobx-react-lite";
import {IConvertedString} from "../../../../UtilitiesStores/StringCase/Contracts/IConvertedString";

export interface IConvertedStringProps{
    convertedString: IConvertedString,
    className: string,
}

export const ConvertedString = observer((props: IConvertedStringProps) => {
    return (
        <div className={props.className} id={props.convertedString.id}>
            <div className={`${props.className}__type`}>{props.convertedString.convertType}</div>
            <div className={`${props.className}__value`}>{props.convertedString.value}</div>
        </div>
    )
})