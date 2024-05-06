const WebSocket = require('ws');
const MarkersRepository = require('./repositories/markers.repository');
const BaseHandler = require('./handlers/base-handler');

const wss = new WebSocket.Server({ port: 8080 }, () => console.log("SERVER STARTED ON PORT 8080"));

/* const messagesRepository = new MessagesRepository(getPool()); */
const markersRepository = new MarkersRepository();
const handler = new BaseHandler(markersRepository);

wss.on('connection', (ws) => {
    handler.addConnection(ws);
    ws.on('message', (data, isBinary) => {
        handler.handle({ data, ws, isBinary });
    });
})
