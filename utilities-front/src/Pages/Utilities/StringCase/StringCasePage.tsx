import {observer} from "mobx-react-lite";
import {StringCaseStore} from "../../../UtilitiesStores/StringCase/StringCaseStore";
import {ConvertedString} from "./ConvertedValues/ConvertedString";
import {Link} from "react-router-dom";

export const StringCasePage = observer(() => {
    return (
        <div className="page">
            <Link to={'/'}>Main page</Link>
            <main className="pageContent">
                <h1 className='mainContent__title'>String case</h1>
                <input type='text' value={StringCaseStore.instance.stringToConvert}
                       onChange={e => StringCaseStore.instance.convert(e.target.value)}></input>
                {StringCaseStore.instance.convertedStrings.map(e => <ConvertedString convertedString={e}/>)}
            </main>
        </div>
    )
});