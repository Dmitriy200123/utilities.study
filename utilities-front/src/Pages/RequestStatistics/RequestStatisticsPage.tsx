import {observer} from "mobx-react-lite";
import React from "react";
import {Header} from "../Common/Headers/Header";
import {RequestStatisticsStore} from "../../RequestStatiscticsStores/RequestStatisticsStore";
import {RequestStatisticsType} from "../../RequestStatiscticsStores/Contracts/RequestStatisticsType";
import "./RequestStatisticsPageStyle.css";
import {LoadingAnimation} from "../Common/LoadingAnimation/LoadingAnimation";

export const RequestStatisticsPage = observer(() => {
    if (RequestStatisticsStore.instance.needFetching)
        return <LoadingAnimation/>

    return (
        <div className="page requestStatisticsPage">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Request statistics</h1>
                <label className='statisticsTypeSelectLabel'>Select request type:</label>
                <select className='statisticsTypeSelect' value={RequestStatisticsStore.instance.requestStatisticsType}
                        onChange={e => RequestStatisticsStore.instance.setRequestStatisticsType(e.target.value as RequestStatisticsType)}>
                    <option value={RequestStatisticsType.byRequest}>Top requests</option>
                    <option value={RequestStatisticsType.byUser}>Top users</option>
                </select>
                <div className='statisticsItems'>
                    {
                        RequestStatisticsStore.instance.requestStatistics.map(e =>
                            <div className='statisticsItem' key={e.id}>
                                <div>{e.name}</div>
                                <div>{e.count}</div>
                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    )
});