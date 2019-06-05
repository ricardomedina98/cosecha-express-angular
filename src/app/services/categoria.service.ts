import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<any>(`${environment.url_api}categorias`)
    .pipe(
        map(result => {
            return JSON.parse(JSON.stringify(result.Categorias)).map(item => {                
                return new Categoria(
                    item.id_categoria,
                    item.nombre_categoria
                );
            });
        })
    );
}
}
