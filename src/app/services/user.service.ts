import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthentificationService } from '../services/authentification.service'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public currentUser;
    public urlAPI;

    constructor(private http: HttpClient, private authenticationService: AuthentificationService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    updateUser(nombre_empleado: string, nombre_usuario: string, contrasena: string) {

        let data = {
            nombre_empleado: nombre_empleado,
            nombre_usuario: nombre_usuario,
            contrasena: contrasena
        }
        
        return this.http.put<any>(`${environment.url_api}usuario/${this.currentUser.usuario.id_usuario}`, data)
        .pipe(map (user=> {            
            return user;
        }));
    }
}
