import {action, makeObservable, observable} from "mobx";
import {ConverterTransport} from "../ConverterTransports/ConverterTransport";
import {MessageStore} from "../../MessageStores/MessageStore";

export class NumberNotationConversionStore {
    private static _instance: NumberNotationConversionStore;
    private readonly __messageStore: MessageStore;

    currentNotation: number = 10;
    newNotation: number = 2;
    numberToConvert: string = '10'
    convertedNumber: string = '';
    notations: number[] = [];

    constructor(messageStore: MessageStore) {
        this.__messageStore = messageStore;

        makeObservable(this, {
            currentNotation: observable,
            newNotation: observable,
            numberToConvert: observable,
            convertedNumber: observable,
            notations: observable,
            getNumberInNotation: action,
            setNumberInNotation: action,
            setNumberToConvert: action,
            setNewNotation: action,
            setNumberNotations: action,
            setCurrentNotation: action,
            getNumberNotations: action,
        });

        this.getNumberNotations();
        this.getNumberInNotation();
    }

    static get instance() {
        if (!this._instance)
            this._instance = new NumberNotationConversionStore(MessageStore.instance);
        return this._instance;
    }

    getNumberInNotation() {
        if (this.numberToConvert) {
            ConverterTransport
                .convertToNumberNotation({
                    currentNotation: this.currentNotation,
                    valueToNotation: this.numberToConvert,
                    newNotation: this.newNotation,
                })
                .then(convertedNumber => this.setNumberInNotation(convertedNumber.value))
                .catch(() => this.__messageStore.addErrorMessage('Не удалось преобразовать данные'));
        }
    }

    getNumberNotations() {
        ConverterTransport
            .getNumberNotations()
            .then(notations => this.setNumberNotations(notations))
            .catch(() => this.__messageStore.addErrorMessage('Не удалось загрузить допустимые системы счисления'));
    }

    setNumberNotations(notations: number[]) {
        this.notations = notations;
    }

    setNumberInNotation(convertedString: string) {
        this.convertedNumber = convertedString;
    }

    setNumberToConvert(stringToConvert: string) {
        this.numberToConvert = stringToConvert;
        this.getNumberInNotation();
    }

    setNewNotation(notation: number) {
        this.newNotation = notation;
        this.getNumberInNotation();
    }

    setCurrentNotation(notation: number) {
        this.currentNotation = notation;
        this.getNumberInNotation();
    }
}