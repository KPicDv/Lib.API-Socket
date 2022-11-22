/// <reference types="node" />
import http from 'http';
import { Server, Socket as BaseSocket } from 'socket.io';
import Listener from './Listener';
export default class Socket {
    private static _instance;
    private _io;
    private constructor();
    static init(server: http.Server, listeners: Array<{
        new (socket: BaseSocket): Listener;
    }>): void;
    static get io(): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
