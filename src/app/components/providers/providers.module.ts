import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';

  
import { from } from 'rxjs';
@NgModule({
  declarations: [ProvidersComponent],
  imports: [
    CommonModule,
    ProvidersRoutingModule
  ]
})
export class ProvidersModule { }
