import {UtilityCards} from "./UtilityCollectionCards/UtilityCards";
import {UtilitiesStore} from "../../UtilitiesStores/Utilities/UtilitiesStore";
import {observer} from "mobx-react-lite";

export const MainPage = observer(() => {
    return (
        <div className="page">
            <main className="pageContent">
                <h1 className='mainContent__title'>Developer utilities</h1>
                <UtilityCards items={UtilitiesStore.instance.utilities}/>
            </main>
        </div>
    )
});