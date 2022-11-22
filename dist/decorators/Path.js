"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/**
 * Définit la méthode comme étant un écouteur Socket.io.
 */
const Path = (path) => ((target, propertyKey) => {
    if (!Reflect.hasMetadata('paths', target.constructor)) {
        Reflect.defineMetadata('paths', [], target.constructor);
    }
    const paths = Reflect.getMetadata('paths', target.constructor);
    paths.push({
        path,
        action: propertyKey
    });
    Reflect.defineMetadata('paths', paths, target.constructor);
});
exports.default = Path;
