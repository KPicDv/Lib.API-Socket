import http from 'http';
import { Server } from 'socket.io';

export default class Socket {
  private static _instance: Socket;
  private _io;

  private constructor(server: http.Server) {
    this._io = new Server(server, { cors: { origin: '*' } });
  }

  public static init(server: http.Server) {
    this._instance = new Socket(server);
  }

  static get io() {
    return this._instance._io;
  }
}
