"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@kpic/logger");
const socket_io_1 = require("socket.io");
class Socket {
    constructor(server) {
        this._io = new socket_io_1.Server(server, { cors: { origin: '*' } });
    }
    static init(server, listeners) {
        this._instance = new Socket(server);
        Socket.io.on('connection', (socket) => {
            logger_1.Logger.log(`[${socket.id}] connection`.green);
            listeners.forEach((Listener) => {
                const paths = Reflect.getMetadata('paths', Listener);
                const instance = new Listener(socket);
                paths.forEach((path) => {
                    const action = instance[path.action].bind(instance);
                    socket.on(path.path, (data) => {
                        logger_1.Logger.log(`[${socket.id}] ${path.path}`.yellow);
                        try {
                            action(data);
                        }
                        catch (error) {
                            logger_1.Logger.log(`[${socket.id}] ${path.path} ${error.message}`.red);
                        }
                    });
                });
            });
        });
    }
    static get io() {
        return this._instance._io;
    }
}
exports.default = Socket;
