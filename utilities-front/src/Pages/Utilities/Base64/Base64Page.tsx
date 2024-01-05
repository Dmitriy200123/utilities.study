import {observer} from "mobx-react-lite";
import {Header} from "../../Common/Headers/Header";
import React from "react";
import {Base64ConversionStore} from "../../../UtilitiesStores/Base64Converter/Base64ConversionStore";
import {Base64ConversionType} from "../../../UtilitiesStores/Base64Converter/Contracts/Base64ConversionType";

export const Base64Page = observer(() => {
    return (
        <div className="page base64Page">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Base64 converter</h1>
                <select value={Base64ConversionStore.instance.conversionType}
                        onChange={e => {
                            Base64ConversionStore.instance.setConversionType(e.target.value as Base64ConversionType);
                            Base64ConversionStore.instance.setFetching(true);
                        }}>
                    <option value={Base64ConversionType.toBase64}>To base64</option>
                    <option value={Base64ConversionType.toString}>To string</option>
                </select>
                <input value={Base64ConversionStore.instance.stringToConvert} onChange={e => {
                    Base64ConversionStore.instance.setStringToConvert(e.target.value);
                    Base64ConversionStore.instance.setFetching(true);
                }
                }/>
                <input value={Base64ConversionStore.instance.convertedString} disabled={true}/>
            </main>
        </div>
    )
});