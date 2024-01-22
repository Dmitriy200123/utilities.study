import {makeObservable, observable, action} from 'mobx'
import {UserConverter} from "./Converters/UserConverter";
import {UsersTransport} from "./Transports/UsersTransport";
import {IUser} from "./Contracts/IUser";

export class UserStore {
    private static _instance: UserStore;

    currentUser: IUser = {
        id: '',
        name: '',
        imageUrl: ''
    };

    constructor() {
        makeObservable(this, {
            currentUser: observable,
            getCurrentUserInfo: action,
            setCurrenUser: action
        });

        this.getCurrentUserInfo();
    }

    static get instance() {
        if (!this._instance)
            this._instance = new UserStore();
        return this._instance;
    }

    getCurrentUserInfo() {
        UsersTransport.getCurrentUser()
            .then(userInfo => this.setCurrenUser(UserConverter.ToUser(userInfo)));
    }

    setCurrenUser(user: IUser) {
        this.currentUser = user;
    }
}