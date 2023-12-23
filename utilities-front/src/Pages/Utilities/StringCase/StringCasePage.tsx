import {observer} from "mobx-react-lite";
import './StringCasePageStyle.css';
import {Header} from "../../Common/Headers/Header";
import {StringCaseConverter} from "./Converter/StringCaseConverter";

export const StringCasePage = observer(() => {
    return (
        <div className="page stringCasePage">
            <Header/>
            <main className="pageContent">
                <h1 className='pageContent__title'>String case</h1>
                <StringCaseConverter className='stringCaseConverter'/>
            </main>
        </div>
    )
});