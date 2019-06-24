import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Equivalencia } from '../models/equivalencia';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciaService {

  constructor(private http: HttpClient) { }

  updateEquivalencia(equivalencia: Equivalencia){
    let data = {
      precio_semanal: Number(equivalencia.precio_semanal),
      equivalencia1: Number(equivalencia.equivalencia1),
      medicionEquiv1: Number(equivalencia.medicionEquiv1),
      equivalencia2: Number(equivalencia.equivalencia2),
      medicionEquiv2: Number(equivalencia.medicionEquiv2),
      id_producto: Number(equivalencia.id_producto),
      porcentaje: Number(equivalencia.porcentaje)
    }

    if(data.porcentaje == 0){
      data.porcentaje = null;
    }

    if(data.equivalencia1 == 0)
      data.equivalencia1 = null;
    if(data.equivalencia2 == 0 )
      data.equivalencia2 = null;
    if(data.medicionEquiv1 == 0)
      data.medicionEquiv1 = null;
    if(data.medicionEquiv2 == 0)
      data.medicionEquiv2 = null;

    return this.http.put<any>(`${environment.url_api}productos/equivalencias/${equivalencia.id_producto}`, data)
    .pipe(
        map(result => {                
            return result;
        })
    );
  }
}