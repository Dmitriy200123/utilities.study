import {action, autorun, makeObservable, observable} from "mobx";
import {ConverterTransport} from "../ConverterTransports/ConverterTransport";

export class NumberNotationConversionStore {
    private static _instance: NumberNotationConversionStore;

    currentNotation: number = 10;
    destinationNotation: number = 2;
    numberToConvert: string = '10'
    convertedNumber: string = '';
    needFetching: boolean = true;
    notations: number[] = [];
    isFirstFetching: boolean = true;

    constructor() {
        makeObservable(this, {
            destinationNotation: observable,
            currentNotation: observable,
            numberToConvert: observable,
            convertedNumber: observable,
            needFetching: observable,
            setFetching: observable,
            getNumberInNotation: action,
            setNumberInNotation: action,
            setNumberToConvert: action,
            setDestinationNotation: action,
        });

        autorun(() => {
            if (this.isFirstFetching) {
                this.getNumberNotations().finally(() => {
                    this.isFirstFetching = false;
                });
            }
            if (this.needFetching) {
                this.getNumberInNotation().finally(() => {
                    this.setFetching(false);
                })
            }
        });
    }

    static get instance() {
        if (!this._instance)
            this._instance = new NumberNotationConversionStore();
        return this._instance;
    }

    async getNumberInNotation() {
        try {
            const convertedString = await ConverterTransport.convertToNumberNotation({
                currentNotation: this.currentNotation,
                valueToNotation: this.numberToConvert,
                newNotation: this.destinationNotation,
            });

            this.setNumberInNotation(convertedString.value);
        } catch {
            throw new Error("Не удалось преобразовать");
        }
    }

    async getNumberNotations() {
        const notations = await ConverterTransport.getNumberNotations();
        this.setNumberNotations(notations);
    }

    setNumberNotations(notations: number[]) {
        this.notations = notations;
    }

    setNumberInNotation(convertedString: string) {
        this.convertedNumber = convertedString;
    }

    setFetching(value: boolean) {
        this.needFetching = value;
    }

    setNumberToConvert(stringToConvert: string) {
        this.numberToConvert = stringToConvert;
    }

    setDestinationNotation(notation: number) {
        this.destinationNotation = notation;
    }

    setCurrentNotation(notation: number) {
        this.currentNotation = notation;
    }
}