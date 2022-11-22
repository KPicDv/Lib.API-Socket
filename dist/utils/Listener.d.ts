import { Socket } from 'socket.io';
export default class Listener {
    private _socket;
    constructor(socket: Socket);
    get socket(): Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
