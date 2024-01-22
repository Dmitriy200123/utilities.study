import {ApiTransport} from "../../TransportHelpers/ApiTransport";
import {IRequestStatisticsInfo} from "./Contracts/IRequestStatisticsInfo";
import {IUserRequestStatisticsInfo} from "./Contracts/IUserRequestStatisticsInfo";

export class RequestStatisticsTransport extends ApiTransport {
    private static readonly _basePath: string = 'api/request-statistics/';

    static getTopRequests() {
        return this.get(`${this._basePath}top-requests`,
            result => result as IRequestStatisticsInfo[]);
    }

    static getTopUsers() {
        return this.get(`${this._basePath}top-users`,
            result => result as IUserRequestStatisticsInfo[]);
    }
}