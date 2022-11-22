import { Socket } from 'socket.io';
export declare type SocketIdentifier = {
    socket: Socket;
    id: string;
};
export declare type SocketListenerPath = {
    path: string;
    action: string;
};
