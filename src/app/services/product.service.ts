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
                        item.Medicione.id_medicion,
                        this.arrayPosToJSOID(item.Categoria_producto),
                        item.existencia,
                        item.existencia_min,
                        item.existencia_max,
                        this.convertTwoDecimal(item.precio_semanal),
                        item.status,
                        item.fecha_creacion,
                        item.creado_por,
                        item.fecha_ultima_modificacion,
                        item.fecha_modificacion_por,
                        item.Equivalencia.id_equivalencia,
                        item.Equivalencia.equivalencia1,
                        item.Equivalencia.equivalencia2,
                        item.Equivalencia.medicionEquiv1,
                        item.Equivalencia.medicionEquiv2,
                        this.arrayPosToJSOMedcion(item.Medicione)
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
                        item.Medicione.id_medicion,
                        this.arrayPosToJSOID(item.Categoria_producto),
                        item.existencia,
                        item.existencia_min,
                        item.existencia_max,
                        this.convertTwoDecimal(item.precio_semanal),
                        item.status,
                        item.fecha_creacion,
                        item.creado_por,
                        item.fecha_ultima_modificacion,
                        item.fecha_modificacion_por,
                        item.Equivalencia.id_equivalencia,
                        item.Equivalencia.equivalencia1,
                        item.Equivalencia.equivalencia2,
                        item.Equivalencia.medicionEquiv1,
                        item.Equivalencia.medicionEquiv2,
                        this.arrayPosToJSOMedcion(item.Medicione)
                    );
                })
                observer.next(request);
            });
        }) 
    }

    updateProduct(product: Product) {
        let data = {
            id_categoria: product.id_categoria,
            id_medicion: product.id_medicion,
            nombre_producto: product.nombre_producto,
            existencia: product.existencia,
            existencia_min: product.existencia_min,
            existencia_max: product.existencia_max
        }        

        if(data.id_categoria === 'null'){
            data.id_categoria = null;
        }

        return this.http.put<any>(`${environment.url_api}productos/${product.id_producto}`, data)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    addProduct(product: Product){
        let data = {
            id_categoria: product.id_categoria,
            id_medicion: product.id_medicion,
            nombre_producto: product.nombre_producto,
            existencia: product.existencia,
            existencia_min: product.existencia_min,
            existencia_max: product.existencia_max
        }        

        if(data.id_categoria === 'null'){
            data.id_categoria = null;
        }        

        return this.http.post<any>(`${environment.url_api}productos`, data)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    deleteProduct(id_producto: string) {
        return this.http.delete<any>(`${environment.url_api}productos/${id_producto}`)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    arrayPosToJSOID(value: any) {    
        
        try {
            return value.id_categoria;
        } catch (error) {
            return null;
        }  
    }

    arrayPosToJSOMedcion(value: any) {    
        
        try {
            return value.tipo_medicion;
        } catch (error) {
            return null;
        }  
    }

    convertTwoDecimal(value: any) {
        try {
            if(value != null) {
                return Number(value).toFixed(2);
            } else {
                return null;
            }
            
        } catch (error) {
            return null;
        }  
    }

    
}
