import {action, makeObservable, observable} from "mobx";
import {Base64ConversionType} from "./Contracts/Base64ConversionType";
import {ConverterTransport} from "../ConverterTransports/ConverterTransport";
import {StringBase64ConversionRequestType} from "../ConverterTransports/Contracts/StringBase64ConversionRequestType";
import {MessageStore} from "../../MessageStores/MessageStore";

export class Base64ConversionStore {
    private static _instance: Base64ConversionStore;
    private readonly __messageStore: MessageStore;

    conversionType: Base64ConversionType = Base64ConversionType.toBase64;
    stringToConvert: string = 'your string'
    convertedString: string = '';
    needFetching: boolean = true;

    constructor(messageStore: MessageStore) {
        this.__messageStore = messageStore;

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

        this.getBase64ConvertedString();
    }

    static get instance() {
        if (!this._instance)
            this._instance = new Base64ConversionStore(MessageStore.instance);
        return this._instance;
    }

    getBase64ConvertedString() {
        ConverterTransport.convertToBase64AndBack({
            stringToConvert: this.stringToConvert,
            type: this.conversionType === Base64ConversionType.toBase64
                ? StringBase64ConversionRequestType.toBase64
                : StringBase64ConversionRequestType.toString,
        })
            .then(convertedString => this.setBase64ConvertedString(convertedString.value))
            .catch(() => this.__messageStore.addErrorMessage('Не удалось преобразовать данные'));
    }

    setBase64ConvertedString(convertedString: string) {
        this.convertedString = convertedString;
    }

    setFetching(value: boolean) {
        this.needFetching = value;
    }

    setStringToConvert(stringToConvert: string) {
        this.stringToConvert = stringToConvert;
        this.getBase64ConvertedString();
    }

    setConversionType(value: Base64ConversionType) {
        this.conversionType = value;
        this.getBase64ConvertedString();
    }
}