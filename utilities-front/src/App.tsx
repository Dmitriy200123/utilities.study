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

export const App = observer(() => {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/string-case' element={<StringCasePage/>}/>
            <Route path='/number-notation' element={<NumberNotationPage/>}/>
            <Route path='/base-64' element={<Base64Page/>}/>
            <Route path='/request-statistics' element={<RequestStatisticsPage/>}/>
          </Routes>
            {MessageStore.instance.messages.length !== 0 && <Messages/>}
        </div>
      </Router>
  );
});
