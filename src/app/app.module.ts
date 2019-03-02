import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// rutas
import { APP_ROUTES } from './app-routing.module';

// modulos 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from './shared/shared.module';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagesAdminComponent } from './pages/pages-admin.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { URL_SOCKET } from './config/config';


const config: SocketIoConfig = {
   url: URL_SOCKET, options: {} };

// servicios 
import { ServiceModule } from './services/service.module';
import {LoggerModule} from 'ngx-logger';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesAdminComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    SocketIoModule.forRoot(config),
    LoggerModule.forRoot(environment.logging)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
