import {ApiTransport} from "../../TransportHelpers/ApiTransport";
import {IConvertedStrings} from "./Contracts/IConvertedStrings";

export class ConverterTransport extends ApiTransport {
    static convertString(stringToConvert: string) {
        return this.post('converters/string-case',
            {stringToConvert},
                result => result as IConvertedStrings);
    }
}