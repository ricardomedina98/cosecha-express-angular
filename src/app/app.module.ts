import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { LayoutService, AlertModule } from 'angular-admin-lte';
import { ProvidersComponent } from './components/providers/providers.component';



@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,    
    HttpClientModule,    
    AlertModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
