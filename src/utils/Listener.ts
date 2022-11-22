import { Socket } from 'socket.io';

export default class Listener {
  private _socket;

  constructor(socket: Socket) {
    this._socket = socket;
  }

  get socket() {
    return this._socket;
  }
}
