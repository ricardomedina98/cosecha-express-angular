export class Product {
    constructor(
        public id_producto: string,
        public nombre_producto: string,
        public categoria: string,
        public medicion: string,
        public existencia: string,
        public existencia_min: string,
        public existencia_max: string,
        public precio_semanal: string,
        public precio_diario: string,
        public status: string,
        public fecha_creacion: string,
        public creado_por: string,
        public fecha_ultima_modificacion: string,
        public fecha_modificacion_por: string
    ){}
}