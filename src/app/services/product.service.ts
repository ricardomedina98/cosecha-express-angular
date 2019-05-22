import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product } from '../models/product';
import { Observable } from 'rxjs';

import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class ProductService {    
    observable:Observable<Product[]>;

    constructor(private http: HttpClient, private socket: Socket) {        
    }

    getAllProducts(): Observable<Product[]> {
        
        return this.http.get<any>(`${environment.url_api}productos`)
        .pipe(
            map( result => {
                return JSON.parse(JSON.stringify(result.Productos)).map(item => {                    
                    return new Product(
                        item.id_producto,
                        item.nombre_producto,
                        this.arrayPosToJSONC(item.Categoria_productos),
                        this.arrayPosToJSONM(item.Mediciones),
                        item.existencia,
                        item.existencia_min,
                        item.existencia_max,
                        item.precio_semanal,
                        item.precio_diario,
                        item.status,
                        item.fecha_creacion,
                        item.creado_por,
                        item.fecha_ultima_modificacion,
                        item.fecha_modificacion_por
                    );
                })
            })
        );
        
    }

    getProducts(): Observable<Product[]> {
        return this.observable = new Observable((observer)=>{
            this.socket.on('SHOW_PRODUCTS', (data) => { 
                let request = JSON.parse(JSON.stringify(data.Productos)).map(item => {                                   
                    return new Product(
                        item.id_producto,
                        item.nombre_producto,
                        this.arrayPosToJSONC(item.Categoria_productos),
                        this.arrayPosToJSONM(item.Mediciones),
                        item.existencia,
                        item.existencia_min,
                        item.existencia_max,
                        item.precio_semanal,
                        item.precio_diario,
                        item.status,
                        item.fecha_creacion,
                        item.creado_por,
                        item.fecha_ultima_modificacion,
                        item.fecha_modificacion_por
                    );
                })
                observer.next(request);
            });
        }) 
    }

    updateProduct(product: Product) {
        let data = {
            id_categoria: 1,
            id_medicion: 1,
            nombre_producto: product.nombre_producto,
            existencia: product.existencia,
            existencia_min: product.existencia_min,
            existencia_max: product.existencia_max,
            precio_semanal: product.precio_semanal,
            precio_diario: product.precio_diario
        }

        return this.http.put<any>(`${environment.url_api}productos/${product.id_producto}`, data)
        .pipe(
            map(result => {
                console.log(result);
                return result;
            })
        );
    }


    arrayPosToJSONC(value: any) {      
        try {
            return value[0].nombre_categoria;
        } catch (error) {
            return;
        }  
    }

    arrayPosToJSONM(value: any) {      
        try {
            return value[0].tipo_medicion;
        } catch (error) {
            return;
        }  
    }
}
