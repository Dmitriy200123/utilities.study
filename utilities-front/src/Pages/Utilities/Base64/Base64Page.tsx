import {observer} from "mobx-react-lite";
import {Header} from "../../Common/Headers/Header";
import React from "react";
import {Base64ConversionStore} from "../../../UtilitiesStores/Base64Converter/Base64ConversionStore";
import {Base64ConversionType} from "../../../UtilitiesStores/Base64Converter/Contracts/Base64ConversionType";
import './Base64PageStyle.css';

export const Base64Page = observer(() => {
    return (
        <div className="page base64Page">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Base64 converter</h1>
                <div className='base64ConverterItem'>
                    <label className='base64ConversionTypeSelectLabel'>Select conversion type:</label>
                    <select className='base64ConversionTypeSelect' value={Base64ConversionStore.instance.conversionType}
                            onChange={e => {
                                Base64ConversionStore.instance.setConversionType(e.target.value as Base64ConversionType);
                            }}>
                        <option value={Base64ConversionType.toBase64}>To base64</option>
                        <option value={Base64ConversionType.toString}>To string</option>
                    </select>
                </div>

                <div className='base64ConverterItem'>
                    <label className='base64StringToConvertInputLabel'>Your string:</label>
                    <input className='base64StringToConvertInput' value={Base64ConversionStore.instance.stringToConvert}
                           onChange={e => {
                               Base64ConversionStore.instance.setStringToConvert(e.target.value);
                           }
                           }/>
                </div>

                <div className='base64ConverterItem'>
                    <label className='base64ConvertedStringLabel'>Result:</label>
                    <input className='base64ConvertedString' value={Base64ConversionStore.instance.convertedString}
                           disabled={true}/>
                </div>
            </main>
        </div>
    )
});