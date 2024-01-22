import {action, makeObservable, observable} from "mobx";
import {RequestStatisticsTransport} from "./RequestStatisticsTransports/RequestStatisticsTransport";
import {IRequestStatistics} from "./Contracts/IRequestStatistics";
import {RequestStatisticsType} from "./Contracts/RequestStatisticsType";
import {v4 as createUuid} from 'uuid';
import {MessageStore} from "../MessageStores/MessageStore";

export class RequestStatisticsStore {
    private static _instance: RequestStatisticsStore;
    private readonly __messageStore: MessageStore;

    requestStatisticsType: RequestStatisticsType = RequestStatisticsType.byRequest;
    requestStatistics: IRequestStatistics[] = [];
    needFetching: boolean = false;

    constructor(messageStore: MessageStore) {
        this.__messageStore = messageStore;

        makeObservable(this, {
            requestStatisticsType: observable,
            requestStatistics: observable,
            needFetching: observable,
            getRequestStatistics: action,
            setRequestStatistics: action,
        });

        this.getRequestStatistics();
    }

    static get instance() {
        if (!this._instance)
            this._instance = new RequestStatisticsStore(MessageStore.instance);
        return this._instance;
    }

    getRequestStatistics() {
        RequestStatisticsTransport
            .getTopRequests()
            .then(requestStatistics => this.setRequestStatistics(requestStatistics.map(e => {
                return {
                    id: createUuid() as string,
                    ...e,
                }
            })))
            .catch(() => this.__messageStore.addErrorMessage('Не удалось загрузить статистику по запросам'));
    }

    setRequestStatistics(requestStatistics: IRequestStatistics[]) {
        this.requestStatistics = requestStatistics;
    }

    setRequestStatisticsType(value: RequestStatisticsType) {
        this.requestStatisticsType = value;
        this.getRequestStatistics();
    }
}