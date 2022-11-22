import { Socket } from 'socket.io';

export type SocketIdentifier = {
  socket: Socket
  id: string
}

export type SocketListenerPath = {
  path: string,
  action: string
}
