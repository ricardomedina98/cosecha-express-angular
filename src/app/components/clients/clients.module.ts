import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';

import { HttpClientModule } from '@angular/common/http';

import { NzTableModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NzTableModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
