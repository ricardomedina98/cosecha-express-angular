import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import 'rxjs';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    Ng2SmartTableModule
  ]
})
export class ProductsModule { }
