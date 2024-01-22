import {action, autorun, makeObservable, observable} from "mobx";
import {Base64ConversionType} from "./Contracts/Base64ConversionType";
import {ConverterTransport} from "../ConverterTransports/ConverterTransport";
import {StringBase64ConversionRequestType} from "../ConverterTransports/Contracts/StringBase64ConversionRequestType";

export class Base64ConversionStore {
    private static _instance: Base64ConversionStore;

    conversionType: Base64ConversionType = Base64ConversionType.toBase64;
    stringToConvert: string = 'your string'
    convertedString: string = '';
    needFetching: boolean = true;

    constructor() {
        makeObservable(this, {
            conversionType: observable,
            convertedString: observable,
            needFetching: observable,
            setFetching: observable,
            getBase64ConvertedString: action,
            setBase64ConvertedString: action,
            setStringToConvert: action,
            setConversionType: action,
        });

        autorun(() => {
            if (this.needFetching) {
                this.getBase64ConvertedString().finally(() => {
                    this.setFetching(false);
                })
            }
        });
    }

    static get instance() {
        if (!this._instance)
            this._instance = new Base64ConversionStore();
        return this._instance;
    }

    async getBase64ConvertedString() {
        try {
            const convertedString = await ConverterTransport.convertToBase64AndBack({
                stringToConvert: this.stringToConvert,
                type: this.conversionType == Base64ConversionType.toBase64
                    ? StringBase64ConversionRequestType.toBase64
                    : StringBase64ConversionRequestType.toString,
            });

            this.setBase64ConvertedString(convertedString.value);
        } catch {
            throw new Error("Не удалось преобразовать");
        }
    }

    setBase64ConvertedString(convertedString: string) {
        this.convertedString = convertedString;
    }

    setFetching(value: boolean) {
        this.needFetching = value;
    }

    setStringToConvert(stringToConvert: string) {
        this.stringToConvert = stringToConvert;
    }

    setConversionType(value: Base64ConversionType) {
        this.conversionType = value;
    }
}