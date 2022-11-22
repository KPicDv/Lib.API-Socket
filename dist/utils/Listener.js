"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Listener {
    constructor(socket) {
        this._socket = socket;
    }
    get socket() {
        return this._socket;
    }
}
exports.default = Listener;
