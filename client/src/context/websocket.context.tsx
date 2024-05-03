import { createContext, useState, useRef, useEffect, ReactNode } from "react";
import { IWebsocketMessageRequest } from "../types/websocket/message.interface";


interface IWebSocketContext {
    isReady: boolean;
    lastMessage: any | null;
    sendMessage: <T>(data: IWebsocketMessageRequest<T>) => void
}
export const WebsocketContext = createContext<IWebSocketContext>({ isReady: false, lastMessage: null, sendMessage: () => { } });

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
    const [isReady, setIsReady] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/");

        socket.onopen = () => setIsReady(true);
        socket.onclose = () => setIsReady(false);
        socket.onmessage = (event) => {
            setLastMessage(JSON.parse(event.data))
        };

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (data: IWebsocketMessageRequest<any>) => {
        return ws.current?.send.bind(ws.current)(JSON.stringify(data))
    }

    const ret: IWebSocketContext = { isReady, lastMessage, sendMessage };

    return (
        <WebsocketContext.Provider value={ret}>
            {children}
        </WebsocketContext.Provider>
    );
};