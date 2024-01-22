import {observer} from "mobx-react-lite";
import React from "react";
import {Header} from "../Common/Headers/Header";
import {RequestStatisticsStore} from "../../RequestStatiscticsStores/RequestStatisticsStore";
import {RequestStatisticsType} from "../../RequestStatiscticsStores/Contracts/RequestStatisticsType";
import "./RequestStatisticsPageStyle.css";

export const RequestStatisticsPage = observer(() => {
    return (
        <div className="page requestStatisticsPage">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Request statistics</h1>
                <label className='statisticsTypeSelectLabel'>Select request type:</label>
                <select className='statisticsTypeSelect' value={RequestStatisticsStore.instance.requestStatisticsType}
                        onChange={e => RequestStatisticsStore.instance.setRequestStatisticsType(e.target.value as RequestStatisticsType)}>
                    <option value={RequestStatisticsType.byRequest}>Top requests</option>
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