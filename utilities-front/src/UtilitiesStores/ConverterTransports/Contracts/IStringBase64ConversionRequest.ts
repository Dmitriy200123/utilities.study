import {StringBase64ConversionRequestType} from "./StringBase64ConversionRequestType";

export interface IStringBase64ConversionRequest {
    stringToConvert: string;

    type: StringBase64ConversionRequestType;
}