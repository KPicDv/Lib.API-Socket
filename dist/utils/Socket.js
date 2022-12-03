"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@kpic/logger");
const socket_io_1 = require("socket.io");
class Socket {
    constructor(server) {
        this._io = new socket_io_1.Server(server, { cors: { origin: '*' } });
    }
    /**
     * Initialise le Socket.
     */
    static init(server) {
        this._instance = new Socket(server);
    }
    /**
     * Ajoute l'action à exécuter lors de l'authentification.
     */
    static onAuth(callback) {
        Socket.io.use((socket, next) => {
            if (typeof socket.handshake.query.token != 'string') {
                next(new Error('Authentication error'));
            }
            else {
                try {
                    callback(socket.handshake.query.token);
                    next();
                }
                catch (error) {
                    next(error);
                }
            }
        });
    }
    /**
     * Ajoute les actions à exécuter lors de la connexion.
     */
    static onConnection(listeners) {
        Socket.io.on('connection', (socket) => {
            logger_1.Logger.log(`[${socket.id}] connection`.green);
            listeners.forEach((Listener) => {
                const paths = Reflect.getMetadata('paths', Listener);
                paths.forEach((path) => {
                    socket.on(path.path, (data) => {
                        const instance = new Listener(socket);
                        const action = instance[path.action].bind(instance);
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
