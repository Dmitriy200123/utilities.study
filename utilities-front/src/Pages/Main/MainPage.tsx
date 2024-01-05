import {UtilityCards} from "./UtilityCollectionCards/UtilityCards";
import {UtilitiesStore} from "../../UtilitiesStores/Utilities/UtilitiesStore";
import {observer} from "mobx-react-lite";
import '../CommonStyles/PageCommonStyle.css';
import '../Main/MainPageStyle.css';
import {Header} from "../Common/Headers/Header";

export const MainPage = observer(() => {
    return (
        <div className="page">
            <Header needPageNavButton={false}/>
            <main className="pageContent">
                <h1 className='pageContent__title'>Developer utilities</h1>
                <UtilityCards items={UtilitiesStore.instance.utilities}/>
            </main>
        </div>
    )
});