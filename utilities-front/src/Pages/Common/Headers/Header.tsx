import {observer} from "mobx-react-lite";
import * as React from "react";
import "./Header.css"
import {PageNavButton} from "./PageNavButtons/PageNavButton";
import {PageNavDirection} from "./PageNavButtons/PageNavDirection";
import {Link} from "react-router-dom";

export interface IHeaderProps {
    needPageNavButton: boolean,
}

export const Header = observer((props: IHeaderProps) => {
    return <header className="header">
        {props.needPageNavButton && <PageNavButton pageNavDirection={PageNavDirection.Previous} label='<'/>}
        <Link to={'/request-statistics'}>Request statistics</Link>
    </header>
});