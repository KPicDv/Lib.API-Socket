"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class Socket {
    constructor(server) {
        this._io = new socket_io_1.Server(server, { cors: { origin: '*' } });
    }
    static init(server) {
        this._instance = new Socket(server);
    }
    static get io() {
        return this._instance._io;
    }
}
exports.default = Socket;
