import { Logger } from '@kpic/logger';
import http from 'http';
import { Server, Socket as BaseSocket } from 'socket.io';
import SocketException from '../exceptions/SocketException';
import { SocketListenerPath } from '../types/socket';
import Listener from './Listener';

type ListenerClass = { new(socket: BaseSocket): Listener }

export default class Socket {
  private static _instance: Socket;
  private _io;

  private constructor(server: http.Server) {
    this._io = new Server(server, { cors: { origin: '*' } });
  }

  /**
   * Initialise le Socket.
   */
  public static init(server: http.Server) {
    this._instance = new Socket(server);
  }

  /**
   * Ajoute l'action à exécuter lors de l'authentification.
   */
  public static onAuth(callback: (token: string, socket: BaseSocket) => void) {
    Socket.io.use((socket, next) => {
      if (typeof socket.handshake.query.token != 'string') {
        next(new Error('Authentication error'))
      } else {
        try {
          callback(socket.handshake.query.token, socket)
          next()
        } catch (error: any) {
          next(error)
        }
      }
    })
  }

  /**
   * Ajoute les actions à exécuter lors de la connexion.
   */
  public static onConnection(listeners: Array<ListenerClass>) {
    Socket.io.on('connection', (socket) => {
      Logger.log(`[${socket.id}] connection`.green);

      listeners.forEach((Listener) => {
        const paths = Reflect.getMetadata('paths', Listener) as Array<SocketListenerPath>;
        
        paths.forEach((path) => {
          socket.on(path.path, (data: any) => {
            const instance = new Listener(socket);
            const action = (instance[path.action as keyof typeof instance] as any).bind(instance);

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
    if (!this._instance) throw new SocketException('Socket n\'a pas été initialisé.')
    return this._instance._io;
  }
}
