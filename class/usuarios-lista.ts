import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() { }

    /*
    * Agregar un usuario
   */
    public agregar(usuario: Usuario) {

        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
        
    }

    /**
     * Actualizar nombre de usuario
     */
    public actualizarNombre(id: string, nombre:string) {
        for (let usuario of this.lista){
            usuario.name = nombre;
            break;
        }
        console.log('========== Actualizando Usuario ==========');
        console.log(this.lista);
    }

    /**
     * Obtener lista de usuarios
     */
    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id == id);
    }

    /**
     * Obtener usuarion en una sala en particular
     */
    public getusuarioEnSala( sala: string ) {
        return this.lista.filter(usuario => usuario.sala = sala);
    }

    /**
     * Borrar usuario
     */
    public eliminarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(usuario => usuario.id !== id);
        
        return tempUsuario;
    }


}