import { Logger } from '@kpic/logger';
import http from 'http';
import { Server, Socket as BaseSocket } from 'socket.io';
import { SocketListenerPath } from '../types/socket';
import Listener from './Listener';

export default class Socket {
  private static _instance: Socket;
  private _io;

  private constructor(server: http.Server) {
    this._io = new Server(server, { cors: { origin: '*' } });
  }

  public static init(server: http.Server, listeners: Array<{ new(socket: BaseSocket): Listener }>) {
    this._instance = new Socket(server);
    
    Socket.io.on('connection', (socket) => {
      Logger.log(`[${socket.id}] connection`.green);

      listeners.forEach((Listener) => {
        const paths = Reflect.getMetadata('paths', Listener) as Array<SocketListenerPath>;
        const instance = new Listener(socket);

        paths.forEach((path) => {
          const action = (instance[path.action as keyof typeof instance] as any).bind(instance);
          socket.on(path.path, (data: any) => {
            Logger.log(`[${socket.id}] ${path.path}`.yellow);
            try {
              action(data);
            } catch (error: any) {
              Logger.log(`[${socket.id}] ${path.path} ${error.message}`.red);
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
