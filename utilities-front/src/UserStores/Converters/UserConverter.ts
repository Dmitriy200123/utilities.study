import {IUser} from "../Contracts/IUser";
import {IUtilitiesUser} from "../Transports/ApiContracts/IUtilitiesUser";

export class UserConverter {
    static ToUser(user: IUtilitiesUser): IUser {
        return {
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
        };
    }
}