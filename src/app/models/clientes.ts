export class Cliente {
    constructor(
        public id_cliente: string,
        public nombre_cliente: string,     
        public apellido1: string,
        public apellido2: string,
        public nombre_empresa: string, 
        public telefono: string,
        public correo: string
    ){}
}