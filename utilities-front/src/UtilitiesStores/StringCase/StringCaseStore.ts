import {action, makeObservable, observable} from "mobx";
import {IConvertedString} from "./Contracts/IConvertedString";
import {ConverterTransport} from "../ConverterTransports/ConverterTransport";
import {v4 as createUuid} from 'uuid';

export class StringCaseStore {
    private static _instance: StringCaseStore;

    stringToConvert: string = 'example string';
    convertedStrings: IConvertedString[] = [];

    constructor() {
        makeObservable(this, {
            stringToConvert: observable,
            convertedStrings: observable,
            convert: action,
            getConvertedStrings: action,
            setConvertedStrings: action,
        });
        this.getConvertedStrings();
    }

    static get instance() {
        if (!this._instance)
            this._instance = new StringCaseStore();
        return this._instance;
    }

    convert(value: string) {
        this.stringToConvert = value;
        this.getConvertedStrings();
    }

    getConvertedStrings() {
        ConverterTransport.convertString(this.stringToConvert).then(convertedStrings => {
            this.setConvertedStrings(convertedStrings.items?.map(e => {
                return {id: createUuid(), value: e.value, convertType: e.convertType.toString()}
            }));
        })
    }

    setConvertedStrings(convertedStrings: IConvertedString[]) {
        this.convertedStrings = convertedStrings;
    }
}