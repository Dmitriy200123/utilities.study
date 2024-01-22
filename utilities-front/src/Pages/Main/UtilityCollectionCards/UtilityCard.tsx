import {observer} from "mobx-react-lite";
import {IUtility} from "../../../UtilitiesStores/Utilities/Contracts/IUtility";
import './UtilityCardStyle.css';
import {Link} from "react-router-dom";

export interface IUtilityProps {
    info: IUtility,
}

export const UtilityCard = observer((props: IUtilityProps) => {
    return (
        <Link className='utilityCardLink' to={props.info.link}>
            <div className='utilityCard'>
                <p className='utilityCard__title'>{props.info.name}</p>
                <p className='utilityCard__description'>{props.info.description}</p>
            </div>
        </Link>
    );
})