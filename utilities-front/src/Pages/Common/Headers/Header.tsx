import {observer} from "mobx-react-lite";
import * as React from "react";
import "./Header.css"
import {PageNavButton} from "./PageNavButtons/PageNavButton";
import {PageNavDirection} from "./PageNavButtons/PageNavDirection";

export const Header = observer(() => {
    return <header className="header">
        <PageNavButton pageNavDirection={PageNavDirection.Previous} label='<'/>
    </header>
});