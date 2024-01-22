import {IUtilityInfo} from "./Contracts/IUtilityInfo";
import {v4 as createUuid} from 'uuid';

export class UtilitiesTransport {
    private static _utilities: IUtilityInfo[] = [
        {
            id: createUuid() as string,
            name: 'String Case',
            description: 'Convert string to another case',
            link: '/string-case',
        },
        {
            id: createUuid() as string,
            name: 'Number Notations',
            description: 'Convert number to certain notation',
            link: '/number-notation',
        },
        {
            id: createUuid() as string,
            name: 'Base64',
            description: 'Convert string to base64 and back',
            link: '/base-64',
        },
    ];

    static getUtilities() {
        return this._utilities;
    }
}