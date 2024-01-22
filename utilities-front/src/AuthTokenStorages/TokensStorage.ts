import {ACCESS_TOKEN} from "../Configs/AuthConstants/Constants";

export class TokensStorage {
    static get accessToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    static setAccessToken(accessToken: string) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
    }

    static removeAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN);
    }
}