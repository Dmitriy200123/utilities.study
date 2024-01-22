import {observer} from "mobx-react-lite";
import {Header} from "../../Common/Headers/Header";
import {
    NumberNotationConversionStore
} from "../../../UtilitiesStores/NumberNotationConverter/NumberNotationConversionStore";
import '../CommonConverterStyle.css';

export const NumberNotationPage = observer(() => {
    return (
        <div className="page numberNotationPage">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Number notation converter</h1>

                <div className='converterItem'>
                    <label className='converterItem__label'>Current notation:</label>
                    <select className='converterItem__param'
                            value={NumberNotationConversionStore.instance.currentNotation} onChange={e => {
                        NumberNotationConversionStore.instance.setCurrentNotation(Number(e.target.value));
                    }}>
                        {NumberNotationConversionStore.instance.notations.map(e => <option key={e}
                                                                                           value={e}>{e}</option>)}
                    </select>
                </div>

                <div className='converterItem'>
                    <label className='converterItem__label'>Number:</label>
                    <input className='converterItem__param'
                           value={NumberNotationConversionStore.instance.numberToConvert} onChange={e => {
                        NumberNotationConversionStore.instance.setNumberToConvert(e.target.value);
                    }}/>
                </div>

                <div className='converterItem'>
                    <label className='converterItem__label'>New notation:</label>
                    <select className='converterItem__param'
                            value={NumberNotationConversionStore.instance.newNotation} onChange={e => {
                        NumberNotationConversionStore.instance.setNewNotation(Number(e.target.value));
                    }}>
                        {NumberNotationConversionStore.instance.notations.map(e => <option key={e}
                                                                                           value={e}>{e}</option>)}
                    </select>
                </div>

                <div className='converterItem'>
                    <label className='converterItem__label'>Result:</label>
                    <input className='converterItem__param'
                           value={NumberNotationConversionStore.instance.convertedNumber} disabled={true}/>
                </div>
            </main>
        </div>
    )
});