import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Medicion } from '../models/medicion';

@Injectable({
    providedIn: 'root'
})
export class MedicionService {

    constructor(private http: HttpClient) { }

    getMediciones(): Observable<Medicion[]> {
        return this.http.get<any>(`${environment.url_api}mediciones`)
        .pipe(
            map(result => {
                return JSON.parse(JSON.stringify(result.Mediciones)).map(item => {
                    return new Medicion(
                        item.id_medicion,
                        item.tipo_medicion
                    );
                });
            })
        );
    }
}
