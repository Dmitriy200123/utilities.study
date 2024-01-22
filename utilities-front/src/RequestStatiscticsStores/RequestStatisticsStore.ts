import {action, autorun, makeObservable, observable} from "mobx";
import {RequestStatisticsTransport} from "./RequestStatisticsTransports/RequestStatisticsTransport";
import {IRequestStatistics} from "./Contracts/IRequestStatistics";
import {RequestStatisticsType} from "./Contracts/RequestStatisticsType";
import {v4 as createUuid} from 'uuid';
import {MessageStore} from "../MessageStores/MessageStore";
import {IRequestStatisticsInfo} from "./RequestStatisticsTransports/Contracts/IRequestStatisticsInfo";

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
            setNeedFetching: action,
        });

        autorun(() => {
            if (this.needFetching) {
                this.getRequestStatistics();
            }
        })
    }

    static get instance() {
        if (!this._instance)
            this._instance = new RequestStatisticsStore(MessageStore.instance);
        return this._instance;
    }

    getRequestStatistics() {
        const request = this.requestStatisticsType === RequestStatisticsType.byRequest
            ? RequestStatisticsTransport.getTopRequests()
                .then(requestStatistics => this.setRequestStatistics(requestStatistics.map(e => {
                    return {
                        id: createUuid() as string,
                        name: e.requestType,
                        count: e.count
                    }
                })))
            : RequestStatisticsTransport.getTopUsers().then(requestStatistics => this.setRequestStatistics(requestStatistics.map(e => {
                return {
                    id: createUuid() as string,
                    name: e.userName,
                    count: e.count,
                }
            })));

        request
            .catch(() => this.__messageStore.addErrorMessage('Не удалось загрузить статистику по запросам'))
            .finally(() => this.setNeedFetching(false));
    }

    setRequestStatistics(requestStatistics: IRequestStatistics[]) {
        this.requestStatistics = requestStatistics;
    }

    setRequestStatisticsType(value: RequestStatisticsType) {
        this.requestStatisticsType = value;
        this.setNeedFetching(true);
    }

    setNeedFetching(needFetching: boolean) {
        this.needFetching = needFetching;
    }
}