import {action, autorun, makeObservable, observable} from "mobx";
import {RequestStatisticsTransport} from "./RequestStatisticsTransports/RequestStatisticsTransport";
import {IRequestStatistics} from "./Contracts/IRequestStatistics";
import {RequestStatisticsFetchingType} from "./Contracts/RequestStatisticsFetchingType";
import {v4 as createUuid} from 'uuid';

export class RequestStatisticsStore {
    private static _instance: RequestStatisticsStore;

    fetchingType: RequestStatisticsFetchingType = RequestStatisticsFetchingType.byRequest;
    requestStatistics: IRequestStatistics[] = [];
    needFetching: boolean = false;

    constructor() {
        makeObservable(this, {
            fetchingType: observable,
            requestStatistics: observable,
            needFetching: observable,
            getRequestStatistics: action,
            setRequestStatistics: action,
        });

        autorun(() => {
            if (this.needFetching) {
                if (this.fetchingType === RequestStatisticsFetchingType.byRequest) {
                    this.getRequestStatistics().finally(() => {
                        this.setFetching(false);
                    })
                }
            }
        });
    }

    static get instance() {
        if (!this._instance)
            this._instance = new RequestStatisticsStore();
        return this._instance;
    }

    async getRequestStatistics() {
        try {
            const requestStatistics = await RequestStatisticsTransport.getTopRequests();

            this.setRequestStatistics(requestStatistics.map(e => {
                return {
                    id: createUuid() as string,
                    ...e,
                }
            }));
        } catch {
            throw new Error("Не удалось загрузить утилиты");
        }
    }

    setRequestStatistics(requestStatistics: IRequestStatistics[]) {
        this.requestStatistics = requestStatistics;
    }

    setFetching(value: boolean) {
        this.needFetching = value;
    }
}