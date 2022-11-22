/// <reference types="node" />
import http from 'http';
import { Server } from 'socket.io';
export default class Socket {
    private static _instance;
    private _io;
    private constructor();
    static init(server: http.Server): void;
    static get io(): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
