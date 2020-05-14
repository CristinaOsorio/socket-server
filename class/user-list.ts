import { User } from "./user";

export class UserList {
    private list: User[] = [];

    constructor() { }

    /*
    * Agregar un usuario
   */
    public add( user: User ) {

        this.list.push(user);
        console.log('========== Lista de usuarios ==========');
        console.log(this.list);
        return user;
        
    }

    /**
     * Actualizar nombre de usuario
     */
    public updateName(id: string, name:string) {
        for (let user of this.list) {
            if (user.id === id) {
                user.name = name;
                break;
            }
        }
        console.log('========== Usuario Actualizado - Lista Actualizada - ==========');
        console.log(this.list);
    }

    /**
     * Obtener list de usuarios
     */
    public getList() {
        console.log( '========== Lista de usuarios conectados ============' );
        console.log( this.list );
        return this.list.filter(usuario => usuario.name !== 'sin-nombre');
    }

    public getUser(id: string) {
        return this.list.find(user => user.id == id);
    }

    /**
     * Obtener usuarion en una sala en particular
     */
    public getUserInRoom( room: string ) {
        return this.list.filter(user => user.room = room);
    }

    /**
     * Borrar usuario
     */
    public deleteUser(id: string) {
        const tempUser = this.getUser(id);

        this.list = this.list.filter(user => user.id !== id);
        
        return tempUser;
    }


}