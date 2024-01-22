import {ApiTransport} from "../../TransportHelpers/ApiTransport";
import {IRequestStatistics} from "./Contracts/IRequestStatistics";

export class ConverterTransport extends ApiTransport {
    private static readonly _basePath: string = 'request-statistics/';

    static getTopRequests() {
        return this.get(`${this._basePath}top-requests`,
            result => result as IRequestStatistics[]);
    }
}