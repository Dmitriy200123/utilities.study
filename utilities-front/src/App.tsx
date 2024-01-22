import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css"
import {observer} from "mobx-react-lite";
import {MainPage} from "./Pages/Main/MainPage";
import {StringCasePage} from "./Pages/Utilities/StringCase/StringCasePage";
import {RequestStatisticsPage} from "./Pages/RequestStatistics/RequestStatisticsPage";
import {Base64Page} from "./Pages/Utilities/Base64/Base64Page";
import {NumberNotationPage} from "./Pages/Utilities/NumberNotation/NumberNotationPage";
import {MessageStore} from "./MessageStores/MessageStore";
import {Messages} from "./Pages/Common/Messages/Messages";
import {LoginPage} from "./Pages/Login/LoginPage";
import {AuthCheck} from "./Pages/Common/AuthCheck/AuthCheck";
import {LoginCallback} from "./Pages/Login/LoginCallback";

export const App = observer(() => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/login-callback' element={<LoginCallback/>}/>
                    <Route path='/' element={<AuthCheck><MainPage/></AuthCheck>}/>
                    <Route path='/string-case' element={<AuthCheck><StringCasePage/></AuthCheck>}/>
                    <Route path='/number-notation' element={<AuthCheck><NumberNotationPage/></AuthCheck>}/>
                    <Route path='/base-64' element={<AuthCheck><Base64Page/></AuthCheck>}/>
                    <Route path='/request-statistics' element={<AuthCheck><RequestStatisticsPage/></AuthCheck>}/>
                </Routes>
                {MessageStore.instance.messages.length !== 0 && <Messages/>}
            </div>
        </Router>
    );
});
