import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { BoxModule, BoxSmallModule as MkBoxSmallModule  } from 'angular-admin-lte';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BoxModule,
    MkBoxSmallModule
  ]
})
export class HomeModule { }
