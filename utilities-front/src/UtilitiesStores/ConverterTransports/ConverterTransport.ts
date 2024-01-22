import {ApiTransport} from "../../TransportHelpers/ApiTransport";
import {IConvertedStrings} from "./Contracts/IConvertedStrings";
import {INumberNotationRequest} from "./Contracts/INumberNotationRequest";
import {IStringBase64ConversionRequest} from "./Contracts/IStringBase64ConversionRequest";

export class ConverterTransport extends ApiTransport {
    private static readonly _basePath: string = 'converters/';

    static convertString(stringToConvert: string) {
        return this.post(`${this._basePath}/string-case`,
            {stringToConvert},
            result => result as IConvertedStrings);
    }

    static convertToNumberNotation(request: INumberNotationRequest) {
        return this.post(`${this._basePath}number-notation`,
            request,
            result => result as string);
    }

    static getNumberNotations() {
        return this.get(`${this._basePath}number-notations`,
            result => result as number[]);
    }

    static convertToBase64AndBack(request: IStringBase64ConversionRequest) {
        return this.post(`${this._basePath}base-64`,
            request,
            result => result as string);
    }
}