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

import { NgZorroAntdModule} from 'ng-zorro-antd';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { environment } from '../environments/environment';

import { NZ_I18N, es_ES } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { UsersComponent } from './components/users/users.component';
registerLocaleData(en);


const config: SocketIoConfig = { url: environment.url_api, options: {} };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,    
    HttpClientModule,    
    AlertModule,
    BrowserAnimationsModule, 
    NgZorroAntdModule, 
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
