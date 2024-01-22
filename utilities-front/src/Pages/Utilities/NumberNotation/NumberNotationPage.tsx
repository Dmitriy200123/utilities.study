import {observer} from "mobx-react-lite";
import {Header} from "../../Common/Headers/Header";

export const NumberNotationPage = observer(() => {
    return (
        <div className="page numberNotationPage">
            <Header needPageNavButton={true}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Number notation converter</h1>
            </main>
        </div>
    )
});