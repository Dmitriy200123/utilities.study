import {action, makeObservable, observable} from "mobx";
import {IConvertedString} from "./Contracts/IConvertedString";
import {ConverterTransport} from "../ConverterTransports/ConverterTransport";
import {v4 as createUuid} from 'uuid';
import {MessageStore} from "../../MessageStores/MessageStore";

export class StringCaseStore {
    private static _instance: StringCaseStore;
    private readonly __messageStore: MessageStore;

    stringToConvert: string = 'example string';
    convertedStrings: IConvertedString[] = [];

    constructor(messageStore: MessageStore) {
        this.__messageStore = messageStore;

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
            this._instance = new StringCaseStore(MessageStore.instance);
        return this._instance;
    }

    convert(value: string) {
        this.stringToConvert = value;
        this.getConvertedStrings();
    }

    getConvertedStrings() {
        ConverterTransport
            .convertString(this.stringToConvert)
            .then(convertedStrings => {
                this.setConvertedStrings(convertedStrings.items?.map(e => {
                    return {id: createUuid(), value: e.value, convertType: e.convertType.toString()}
                }));
            })
            .catch(() => this.__messageStore.addErrorMessage('Не удалось преобразовать данные'));
    }

    setConvertedStrings(convertedStrings: IConvertedString[]) {
        this.convertedStrings = convertedStrings;
    }
}