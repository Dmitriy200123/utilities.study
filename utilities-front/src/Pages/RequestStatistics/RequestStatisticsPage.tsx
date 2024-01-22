import {observer} from "mobx-react-lite";
import React from "react";
import {Header} from "../Common/Headers/Header";
import {RequestStatisticsStore} from "../../RequestStatiscticsStores/RequestStatisticsStore";
import {RequestStatisticsFetchingType} from "../../RequestStatiscticsStores/Contracts/RequestStatisticsFetchingType";

export const RequestStatisticsPage = observer(() => {
    return (
        <div className="page requestStatisticsPage">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Request statistics</h1>
                <select value={RequestStatisticsStore.instance.fetchingType}
                        onChange={() => RequestStatisticsStore.instance.setFetching(true)}>
                    <option value={RequestStatisticsFetchingType.byRequest}>Top requests</option>
                </select>
                <div>
                    {
                        RequestStatisticsStore.instance.requestStatistics.map(e =>
                            <div key={e.id}>
                                <div>{e.requestType}</div>
                                <div>{e.count}</div>
                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    )
});