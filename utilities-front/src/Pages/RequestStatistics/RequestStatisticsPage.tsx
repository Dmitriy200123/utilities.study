import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {Header} from "../Common/Headers/Header";
import {RequestStatisticsStore} from "../../RequestStatiscticsStores/RequestStatisticsStore";
import {RequestStatisticsFetchingType} from "../../RequestStatiscticsStores/Contracts/RequestStatisticsFetchingType";
import "./RequestStatisticsPageStyle.css";

export const RequestStatisticsPage = observer(() => {
    useEffect(() => RequestStatisticsStore.instance.setFetching(true), [])

    return (
        <div className="page requestStatisticsPage">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Request statistics</h1>
                <label className='statisticsTypeSelectLabel'>Select request type:</label>
                <select className='statisticsTypeSelect' value={RequestStatisticsStore.instance.fetchingType}
                        onChange={() => RequestStatisticsStore.instance.setFetching(true)}>
                    <option value={RequestStatisticsFetchingType.byRequest}>Top requests</option>
                </select>
                <div className='statisticsItems'>
                    {
                        RequestStatisticsStore.instance.requestStatistics.map(e =>
                            <div className='statisticsItem' key={e.id}>
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