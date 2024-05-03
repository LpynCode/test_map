const { randomUUID } = require("crypto");


class BaseHandler {
    endpoints = {
        "authorization": this.#authorize.bind(this),
        /* "message": this.#handleMessage.bind(this), */
        "markers.create": this.#createMarker.bind(this),
        "markers.update": this.#updateMarker.bind(this),
        "markers.delete": this.#deleteMarker.bind(this),
    };
    clients = new Array();

    /* constructor(messagesRepository) {
        this.messagesRepository = messagesRepository;
    } */

    constructor(markersRepository) {
        this.markersRepository = markersRepository;
    }

    addConnection(ws) {
        ws.id = randomUUID();
        this.clients.push(ws);
    }

    async handle({ data, ws, ...options }) {
        const prepairedData = JSON.parse(data);
        if (!this.endpoints[prepairedData.type]) return;
        await this.endpoints[prepairedData.type](ws, prepairedData.data, options);
    }

    async #authorize(ws, data, { isBinary }) {
        const client = this.clients.find((client) => client.id === ws.id);
        client.name = data;
        const allMarkers = await this.markersRepository.getAll();
        ws.send(JSON.stringify({ data: allMarkers, type: "markers.all" }), { binary: isBinary });
        /* const allMessages = await this.messagesRepository.getAll();
        ws.send(JSON.stringify(allMessages), { binary: isBinary }); */
    }

    /* async #handleMessage(ws, data, { isBinary }) {
        const created = await this.messagesRepository.create({ text: data, name: ws.name });
        this.clients.forEach((client) => {
            client.send(JSON.stringify(created), { binary: isBinary });
        });
    } */

    async #createMarker(ws, data, { isBinary }) {
        const { id, name } = this.clients.find((client) => client.id === ws.id);
        data = { ...data, user: { id, name } };
        const created = this.markersRepository.create(data);
        this.clients.forEach((client) => {
            client.send(JSON.stringify({ data: created, type: "markers.create" }), { binary: isBinary });
        });
    }

    async #updateMarker(ws, data, { isBinary }) {
        const updated = this.markersRepository.update(data);
        if (!updated) return;
        this.clients.forEach((client) => {
            client.send(JSON.stringify({ data: updated, type: "markers.update" }), { binary: isBinary });
        });
    }

    async #deleteMarker(ws, data, { isBinary }) {
        const deleted = this.markersRepository.delete(data.id);
        this.clients.forEach((client) => {
            client.send(JSON.stringify({ data: deleted, type: "markers.delete" }), { binary: isBinary });
        });
    }
}

module.exports = BaseHandler