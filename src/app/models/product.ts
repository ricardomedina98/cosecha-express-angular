export class Product {
    constructor(
        public id_producto: string,
        public nombre_producto: string,        
        public medicion: string,
        public existencia: string,
        public existencia_min: string,
        public existencia_max: string,
        public precio_semanal: string,
        public status: string,
        public fecha_creacion: string,
        public creado_por: string,
        public fecha_ultima_modificacion: string,
        public fecha_modificacion_por: string,
        public id_equivalencia?: string,
        public equivalencia1?: string,
        public equivalencia2?: string,
        public equivalencia1Med?: string,
        public equivalencia2Med?: string,
    ){}
}