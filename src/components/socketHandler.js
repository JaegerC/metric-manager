import SocketClient from 'socket.io-client';

let io = null

export function createSocket() {
    io = !io ? SocketClient('https://metric-manager-api.herokuapp.com') : io;
    io.connect();
    return io;
}
