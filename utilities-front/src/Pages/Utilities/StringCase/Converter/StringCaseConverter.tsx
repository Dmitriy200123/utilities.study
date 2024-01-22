import {observer} from "mobx-react-lite";
import {StringCaseStore} from "../../../../UtilitiesStores/StringCase/StringCaseStore";
import {ConvertedString} from "../ConvertedValues/ConvertedString";
import "./StringCaseConverterStyle.css";

export const StringCaseConverter = observer((props: { className: string }) => {
    return (
        <div className={props.className}>
            <label className='inputLabel'>Your string</label>
            <input className='inputString' type='text' value={StringCaseStore.instance.stringToConvert}
                   onChange={e => StringCaseStore.instance.convert(e.target.value)}></input>
            <div className={'stringCaseConvertedStrings'}>
                {StringCaseStore.instance.convertedStrings.map(e => {
                    return <ConvertedString convertedString={e} className={'stringCaseConvertedString'}/>
                })}
            </div>
        </div>
    );
});