import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css"
import {observer} from "mobx-react-lite";
import {MainPage} from "./Pages/Main/MainPage";
import {StringCasePage} from "./Pages/Utilities/StringCase/StringCasePage";

export const App = observer(() => {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/string-case' element={<StringCasePage/>}/>
          </Routes>
        </div>
      </Router>
  );
});
