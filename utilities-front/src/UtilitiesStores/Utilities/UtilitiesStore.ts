import {action, autorun, makeObservable, observable} from "mobx";
import {IUtility} from "./Contracts/IUtility";
import {UtilitiesTransport} from "./Transport/UtilitiesTransport";

export class UtilitiesStore {
    private static _instance: UtilitiesStore;

    utilities: IUtility[] = [];
    needFetching: boolean = true;

    constructor() {
        makeObservable(this, {
            utilities: observable,
            needFetching: observable,
            getUtilities: action,
            setUtilities: action,
            setFetching: action,
        });

        autorun(() => {
            if (this.needFetching) {
                this.getUtilities().finally(() => {
                    this.setFetching(false);
                })
            }
        });
    }

    static get instance() {
        if (!this._instance)
            this._instance = new UtilitiesStore();
        return this._instance;
    }

    async getUtilities() {
        try {
            const utilitiesInfo = UtilitiesTransport.getUtilities();
            this.setUtilities(utilitiesInfo);
        } catch {
            throw new Error("Не удалось загрузить утилиты");
        }
    }

    setUtilities(utilities: IUtility[]) {
        this.utilities = [...this.utilities, ...utilities];
    }

    setFetching(value: boolean) {
        this.needFetching = value;
    }
}