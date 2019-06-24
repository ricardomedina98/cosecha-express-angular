import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
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
                        this.arrayPosToJSOPrecioE(item.Productos_Clientes),
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        this.arrayPosToJSOMedcion(item.Medicione)
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

    updatePrecioEspecial(id_cliente: string, id_producto: string, precio_especial: string){

        let data = {
            precio_especial
        }
        return this.http.put<any>(`${environment.url_api}clientes/${id_cliente}/productos/${id_producto}`, data)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    restaurarListaPrecios(id_cliente: string){

        return this.http.get<any>(`${environment.url_api}clientes/restaurar_lista/${id_cliente}`)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    restaurarPrecio(id_cliente: string, id_producto: string){

        return this.http.get<any>(`${environment.url_api}clientes/${id_cliente}/producto/${id_producto}`)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    aplicarDescuentoLista(id_cliente: string, porcentaje: number, operacion: string){

        let data = {
            porcentaje,
            operacion
        }        

        return this.http.put<any>(`${environment.url_api}clientes/${id_cliente}/aplicar_operacion`, data)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    enviarCorreo(id_cliente: string, observacion: string, productosMarcados: any){

        let data = {
            observacion,
            productosMarcados
        }

        return this.http.post<any>(`${environment.url_api}clientes/${id_cliente}/enviar_correo`, data)
        .pipe(
            map(result => {                
                return result;
            })
        );
    }

    exportExcel(id_cliente: string) {     
        return this.http.get(`${environment.url_api}clientes/${id_cliente}/descargar_excel`, {responseType: 'blob'})
        .pipe(
        tap( // Log the result or error
            data => {
                return data;
            },
            error => {
                console.log("TCL: ClientService -> exportExcel -> error", error)    
            }
        ));
            
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
            return this.convertTwoDecimal(value.precio_especial);
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