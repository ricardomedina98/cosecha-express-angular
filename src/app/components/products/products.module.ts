import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { HttpClientModule } from '@angular/common/http';



import { NzTableModule } from 'ng-zorro-antd';

import 'rxjs';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    NzTableModule  
  ]
})
export class ProductsModule { }
