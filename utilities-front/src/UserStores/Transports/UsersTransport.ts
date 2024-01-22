import {ApiTransport} from "../../TransportHelpers/ApiTransport";
import {IUtilitiesUser} from "./ApiContracts/IUtilitiesUser";


export class UsersTransport extends ApiTransport {
    private static readonly _basePath: string = 'api/users/';

    static getCurrentUser() {
        return this.get(`${this._basePath}current`, json => json as IUtilitiesUser);
    }
}