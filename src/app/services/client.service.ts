import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

import { Cliente } from '../models/clientes';

import { Product } from '../models/product';

import { Socket } from 'ngx-socket-io';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  observable:Observable<Cliente[]>;  

  constructor(private http: HttpClient, private socket: Socket) {   
  }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<any>(`${environment.url_api}clientes`)
        .pipe(
            map(result => {
                return JSON.parse(JSON.stringify(result.Clientes)).map(item => {                
                    return new Cliente(
                        item.id_cliente,
                        item.nombre_cliente,
                        item.apellido1_cliente,
                        item.apellido2_cliente,
                        item.nombre_empresa_cliente,
                        item.telefono_cliente,
                        item.correo_cliente,
                        item.status,
                        item.fecha_creacion,
                        item.creado_por,
                        item.fecha_ultima_modificacion,
                        item.fecha_modificacion_por
                    );
                });
            })
        );
    }

    addCliente(client: Cliente){        
        let data = {
            nombre_cliente: client.nombre_cliente,
            apellido1_cliente: client.apellido1_cliente,
            apellido2_cliente: client.apellido2_cliente,
            nombre_empresa_cliente: client.nombre_empresa_cliente,
            telefono_cliente: client.telefono_cliente,
            correo_cliente: client.correo_cliente
        }

        return this.http.post<any>(`${environment.url_api}clientes`, data)
        .pipe(
            map(result => {                           
                if(result.OK) {
                    return result.Cliente;
                } else {
                    return reject;
                }
            })
        );  
    }

    updateCliente(client: Cliente) {
        let data = {
            nombre_cliente: client.nombre_cliente,
            apellido1_cliente: client.apellido1_cliente,
            apellido2_cliente: client.apellido2_cliente,
            nombre_empresa_cliente: client.nombre_empresa_cliente,
            telefono_cliente: client.telefono_cliente,
            correo_cliente: client.correo_cliente
        }        

        return this.http.put<any>(`${environment.url_api}clientes/${client.id_cliente}`, data)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    deleteClient(id_cliente: string) {
        return this.http.delete<any>(`${environment.url_api}clientes/${id_cliente}`)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    deleteProductClient(id_cliente: string, id_producto: string) {
        return this.http.delete<any>(`${environment.url_api}clientes/${id_cliente}/productos/${id_producto}`)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }


    getClientProducts(id_cliente: string): Observable<Product[]>{
        return this.http.get<any>(`${environment.url_api}clientes/${id_cliente}/productos`)
        .pipe(
            map( result => {                     
                return JSON.parse(JSON.stringify(result.Clientes.ProductosClientes)).map(item => {     
                    return new Product(
                        item.id_producto,
                        item.nombre_producto,                                               
                        item.id_medicion,
                        this.arrayPosToJSOID(item.Categoria_producto),
                        item.existencia,
                        item.existencia_min,
                        item.existencia_max,
                        this.arrayPosToJSOPrecioE(item.Productos_Clientes)
                    );
                })
            })
        );
    }

    addProductsClient(listProducts: Product[], id_cliente: string) {


        let ListProducts = [];
        
        listProducts.forEach((item, index) => {
            ListProducts.push({
                id_producto: item.id_producto,
                id_cliente: id_cliente,
                precio_especial: item.precio_semanal
            });
            
        });        
        
        return this.http.put<any>(`${environment.url_api}clientes/productos`, ListProducts)
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

    arrayPosToJSOPrecioE(value: any) {    
        
        try {
            return value.precio_especial;
        } catch (error) {
            return null;
        }  
    }
}