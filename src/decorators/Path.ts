import 'reflect-metadata'
import { SocketListenerPath } from '../types/socket';

/**
 * Définit la méthode comme étant un écouteur Socket.io.
 */
const Path = (path: string): MethodDecorator => (
  (target, propertyKey): void => {
    if (!Reflect.hasMetadata('paths', target.constructor)) {
      Reflect.defineMetadata('paths', [], target.constructor);
    }

    const paths = Reflect.getMetadata('paths', target.constructor) as Array<SocketListenerPath>;

    paths.push({
      path,
      action: propertyKey as string
    });
    Reflect.defineMetadata('paths', paths, target.constructor);
  }
);

export default Path