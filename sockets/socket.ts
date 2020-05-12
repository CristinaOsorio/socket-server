import { Socket } from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

export const usuariosConectados = new UsuariosLista(); 

export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario( cliente.id );

    usuariosConectados.agregar( usuario );

}

export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        usuariosConectados.eliminarUsuario(cliente.id);
    });
}

export const message = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('message', (payload: { de: string, cuerpo: string }) => {

        console.log('Mensaje recibido', payload);
        
        io.emit('mensaje-nuevo', payload);

    });
}

export const usuarioNuevo = ( cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('new-user', (payload: { name  : string }, callback: Function) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.name );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.name } configurado`
        });
        // io.emit('name  ', payload);
    });
}

export const desconectarCliente = (cliente: Socket) => {
    
    const usuario = new Usuario(cliente.id);

    usuariosConectados.eliminarUsuario(usuario.id);

}