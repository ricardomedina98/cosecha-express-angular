export class Equivalencia {
    constructor(
        public precio_semanal: string,
        public equivalencia1: string,
        public medicionEquiv1: string,
        public equivalencia2: string,
        public medicionEquiv2: string,
        public id_producto: string,
        public porcentaje: string,
        public id_equivalencia?: string,
        public fecha_creacion?: string,
        public fecha_ultima_modificacion?: string
    ) {}
}


