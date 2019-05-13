export class User{
    constructor(
        public id_usuario: string,
        public nombre_empleado: string,
        public nombre_usuario: string,
        public contrasena: string,
        public role: string,
        public token?: string
    ){}
}
