import { IWebsocketMessageRequest } from "../types/websocket/message.interface";

export const prepareMessage = (message: IWebsocketMessageRequest<any>) => JSON.stringify(message);