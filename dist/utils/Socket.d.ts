/// <reference types="node" />
import http from 'http';
import { Server, Socket as BaseSocket } from 'socket.io';
import Listener from './Listener';
declare type ListenerClass = {
    new (socket: BaseSocket): Listener;
};
export default class Socket {
    private static _instance;
    private _io;
    private constructor();
    /**
     * Initialise le Socket.
     */
    static init(server: http.Server): void;
    /**
     * Ajoute l'action à exécuter lors de l'authentification.
     */
    static onAuth(callback: (token: string) => void): void;
    /**
     * Ajoute les actions à exécuter lors de la connexion.
     */
    static onConnection(listeners: Array<ListenerClass>): void;
    static get io(): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
export {};
