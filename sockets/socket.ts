import { Socket } from 'socket.io';
import { UserList } from '../class/user-list';
import { User } from '../class/user';

export const usersConnects = new UserList(); 

/**
 * Servidor de sockect conectado 
 */
export const connectClient = (client: Socket, io: SocketIO.Server) => {

    const user = new User( client.id );
    usersConnects.add(user);
    io.emit('active-users', usersConnects.getList());

}

/**
 * Servidor de sockets desconectado
 */
export const disconnect = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        usersConnects.deleteUser(cliente.id);
    });
}

/**
 * Cliente desconectado
 */
export const disconnectClient = (client: Socket) => {
    
    const user = new User(client.id);

    usersConnects.deleteUser(user.id);

}

/**
 * Enviar Mensaje
 */
export const message = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('message', ( payload: { from: string, body: string }) => {

        console.log('Mensaje recibido', payload);
        
        io.emit('message-new', payload);

    });
}

/**
 * Nuevo usuario dado de alta
 */
export const userNew = (client: Socket, io: SocketIO.Server) => {
    
    client.on('new-user', (payload: { name  : string }, callback: Function) => {

        usersConnects.updateName( client.id, payload.name );
        
        io.emit('active-users', usersConnects.getList());

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.name } configurado`
        });
        // io.emit('name  ', payload);
    });
}

/**
 * Obtener Usuarios
 */
export const getUsers = (client: Socket, io: SocketIO.Server) => {
    
    client.on('get-users', () => {

        io.to(client.id).emit('active-users', usersConnects.getList());

        // io.emit('name  ', payload);
    });
}