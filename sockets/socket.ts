import { Socket } from 'socket.io';

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });
}

export const message = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('message', (payload: { de: string, cuerpo: string }) => {

        console.log('Mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload);


    });
}