
type messageTypes = 'markers.create' | 'markers.update' | 'markers.delete' | 'authorization';

export interface IWebsocketMessageRequest<T> {
    type: messageTypes;
    data: T;
}

export interface IWebsocketMessageResponse<T> {
    type: messageTypes;
    data: T;
}