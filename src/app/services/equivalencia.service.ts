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
      precio_semanal: equivalencia.precio_semanal,
      equivalencia1: equivalencia.equivalencia1,
      medicionEquiv1: equivalencia.medicionEquiv1,
      equivalencia2: equivalencia.equivalencia2,
      medicionEquiv2: equivalencia.medicionEquiv2,
      id_producto: equivalencia.id_producto,
      porcentaje: equivalencia.porcentaje
    }
    console.log(data);

    return this.http.put<any>(`${environment.url_api}productos/equivalencias/${equivalencia.id_producto}`, data)
    .pipe(
        map(result => {                
            return result;
        })
    );
}
}
