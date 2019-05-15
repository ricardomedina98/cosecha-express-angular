import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { adminLteConf } from './admin-lte.conf';
import {LayoutModule, AlertModule } from 'angular-admin-lte';

import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { CoreComponent, CoreModule } from './core';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, 
    MaterialBarModule,
    AlertModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
