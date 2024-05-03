import { IWebsocketMessage } from "../types/websocket/message.interface";

export const prepareMessage = (message: IWebsocketMessage) => JSON.stringify(message);