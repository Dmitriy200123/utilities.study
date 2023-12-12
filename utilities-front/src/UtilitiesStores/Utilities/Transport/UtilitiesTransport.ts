import {IUtilityInfo} from "./Contracts/IUtilityInfo";
import {v4 as createUuid} from 'uuid';

export class UtilitiesTransport {
    private static _utilities: IUtilityInfo[] = [
        {
            id: createUuid() as string,
            name: 'StringCase',
            description: 'Convert string to another case',
            link: '/string-case'
        },
    ];

    static getUtilities() {
        return this._utilities;
    }
}