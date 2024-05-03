import { useMarkersStore } from "../store/markers.store";
import { IMarker } from "../types/marker.interface";
import { IRemoveMarkerResponse } from "../types/websocket/markers.interfaces";
import { IWebsocketMessageResponse } from "../types/websocket/message.interface";


const handlers: Record<string, (message: IWebsocketMessageResponse<any>) => void> = {
    "markers.create": (message: IWebsocketMessageResponse<IMarker>) => {
        const { addMarker } = useMarkersStore.getState();
        console.log(message.data)
        addMarker(message.data);
    },

    "markers.update": (message: IWebsocketMessageResponse<IMarker>) => {
        const { updateMarker } = useMarkersStore.getState();
        updateMarker(message.data);
    },

    "markers.all": (message: IWebsocketMessageResponse<IMarker[]>) => {
        const { setMarkers } = useMarkersStore.getState();
        setMarkers(message.data);
    },

    "markers.delete": ({data: {id}}: IWebsocketMessageResponse<IRemoveMarkerResponse>) => {
        const { removeMarker } = useMarkersStore.getState();
        removeMarker(id);
    }
}

export const handleMessage = (message: IWebsocketMessageResponse<IMarker>) => {
    const handler = handlers[message.type];
    if (!handler) return;

    return handler(message);
}