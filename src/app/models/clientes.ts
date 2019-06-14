export class Cliente {
    constructor(
        public id_cliente: string,
        public nombre_cliente: string,     
        public apellido1_cliente: string,
        public apellido2_cliente: string,
        public nombre_empresa_cliente: string, 
        public telefono_cliente: string,
        public correo_cliente: string,
        public status?: string,
        public fecha_creacion?: string,
        public creado_por?: string,
        public fecha_ultima_modificacion?: string,
        public fecha_modificacion_por?: string,
    ){}
}