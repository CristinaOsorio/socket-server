import express from 'express';
import { SERVER_PORT } from '../global/environments';
import http from 'http'
import SocketIO from 'socket.io';
import * as socket from '../sockets/socket'

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;
    public io: SocketIO.Server;
    private httpServer: http.Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = SocketIO(this.httpServer); 
        
        this.listeSockets();
        
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }

    private listeSockets() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', client => {

            // Conectar cliente
            socket.conectarCliente(client);


            // Configurar usuario
            socket.usuarioNuevo(client, this.io);

            // Mensaje
            socket.message( client, this.io );

            // Desconectar
            socket.desconectar( client  );
            
        });
        
    }

    start( callback: Function ) {
        this.httpServer.listen(this.port, callback);
    }

}