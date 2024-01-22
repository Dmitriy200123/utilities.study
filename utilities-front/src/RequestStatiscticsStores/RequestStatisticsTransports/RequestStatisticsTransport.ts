import {ApiTransport} from "../../TransportHelpers/ApiTransport";
import {IRequestStatisticsInfo} from "./Contracts/IRequestStatisticsInfo";

export class RequestStatisticsTransport extends ApiTransport {
    private static readonly _basePath: string = 'api/request-statistics/';

    static getTopRequests() {
        return this.get(`${this._basePath}top-requests`,
            result => result as IRequestStatisticsInfo[]);
    }
}