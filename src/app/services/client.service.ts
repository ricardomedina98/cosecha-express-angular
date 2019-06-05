import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Cliente } from '../models/clientes';
import { Observable } from 'rxjs';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  observable:Observable<Cliente[]>;

  constructor(private http: HttpClient, private socket: Socket) {   
  }


}

}