import {observer} from "mobx-react-lite";
import * as React from "react";
import "./Header.css"
import {PageNavButton} from "./PageNavButtons/PageNavButton";
import {PageNavDirection} from "./PageNavButtons/PageNavDirection";
import {Link} from "react-router-dom";
import {RequestStatisticsStore} from "../../../RequestStatiscticsStores/RequestStatisticsStore";
import {UserStore} from "../../../UserStores/UserStore";
import {TokensStorage} from "../../../AuthTokenStorages/TokensStorage";
import {LogoutLogo} from "./LogoutLogo";

export interface IHeaderProps {
    needPageNavButton: boolean,
}

export const Header = observer((props: IHeaderProps) => {
    return <header className="header">
        {props.needPageNavButton && <PageNavButton pageNavDirection={PageNavDirection.Previous} label='<'/>}
        <Link className='requestStatisticsLink' to={'/request-statistics'}
              onClick={() => RequestStatisticsStore.instance.setNeedFetching(true)}>Request statistics</Link>

        <div className='userInfo'>
            <label className='userInfo__name'>{UserStore.instance.currentUser.name}</label>
            <img className='userInfo__image' src={UserStore.instance.currentUser.imageUrl} alt='avatar'/>
        </div>

        <Link className='logoutLink' to={'/login'}
              onClick={() => TokensStorage.removeAccessToken()}> <LogoutLogo/></Link>
    </header>
});