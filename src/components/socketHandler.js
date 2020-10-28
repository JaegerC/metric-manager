import SocketClient from 'socket.io-client';

let io = null

export function createSocket() {
    io = !io ? SocketClient('http://localhost:8000') : io;
    io.connect();
    return io;
}
