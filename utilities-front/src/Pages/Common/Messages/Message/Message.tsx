import {IMessageProps} from "./IMessageProps";
import ErrorIcon from './error.svg';
import CloseIcon from './close.svg';
import './Message.css';
import {observer} from "mobx-react-lite";
import {MessageStore} from "../../../../MessageStores/MessageStore";

export const Message = observer((props: IMessageProps) => {
    function onClose() {
        MessageStore.instance.removeMessage(props.message.id);
    }

    return <div className='message'>
        <img className='messageIcon' src={ErrorIcon} alt='Error icon'/>
        <h1 className='messageHeader'>Проблема</h1>
        <p className='messageContent'>{props.message.content}</p>
        <button className={"messageCloseButton"} onClick={onClose}>
            <img src={CloseIcon} alt="CloseIcon"/>
        </button>
    </div>
});