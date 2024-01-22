import {MessageType} from "./MessageType";

export interface IMessage {
    id: string,
    type: MessageType,
    content: string
}