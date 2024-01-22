import {observer} from "mobx-react-lite";
import {Header} from "../../Common/Headers/Header";
import {
    NumberNotationConversionStore
} from "../../../UtilitiesStores/NumberNotationConverter/NumberNotationConversionStore";

export const NumberNotationPage = observer(() => {
    return (
        <div className="page numberNotationPage">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Number notation converter</h1>
                <select value={NumberNotationConversionStore.instance.currentNotation} onChange={e => {
                    NumberNotationConversionStore.instance.setCurrentNotation(Number(e.target.value));
                }}>
                    {NumberNotationConversionStore.instance.notations.map(e => <option value={e}>{e}</option>)}
                </select>
                <select value={NumberNotationConversionStore.instance.destinationNotation} onChange={e => {
                    NumberNotationConversionStore.instance.setDestinationNotation(Number(e.target.value));
                }}>
                    {NumberNotationConversionStore.instance.notations.map(e => <option value={e}>{e}</option>)}
                </select>
                <input value={NumberNotationConversionStore.instance.numberToConvert} onChange={e => {
                    NumberNotationConversionStore.instance.setNumberToConvert(e.target.value);
                }}/>
                <input value={NumberNotationConversionStore.instance.convertedNumber} disabled={true}/>
            </main>
        </div>
    )
});