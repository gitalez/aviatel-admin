import { NgModule } from "@angular/core";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from "./dashboard/dashboard.component";

import { PAGES_ADMIN_ROUTES } from "./pages-admin-routing.module";

import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { TerminosComponent } from './terminos/terminos.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { ChatComponent } from './chat/chat/chat.component';
import { CrearDispositivosComponent } from './dispositivos/crear-dispositivos/crear-dispositivos.component';
import { SoyDispositivoComponent } from './dispositivos/soy-dispositivo/soy-dispositivo.component';
import { ActualizarUsuarioComponent } from './actualiza-usuario/actualizar-usuario/actualizar-usuario.component';
import { EmailsComponent } from './emails/emails.component';
import { SeguridadComponent } from './seguridad/seguridad/seguridad.component';
import { DispositivosComponent } from './dispositivos/dispositivos/dispositivos.component';
import { DispositivoComponent } from './dispositivos/dispositivo/dispositivo.component';
import { ComandarDispositivoComponent } from './dispositivos/comandar-dispositivo/comandar-dispositivo.component';
import { MisDispositivosComponent } from './dispositivos/mis-dispositivos/mis-dispositivos.component';
import { ComandarUnDispositivoComponent } from './dispositivos/comandar-un-dispositivo/comandar-un-dispositivo.component';

import { CalendarioComponent } from './calendario/calendario.component';

import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BandaHoraComponent } from './banda-hora/banda-hora.component';
import { MisDispositivosOnlineComponent } from './dispositivos/mis-dispositivos-online/mis-dispositivos-online.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AccountSettingsComponent,
    TerminosComponent,
    ProfileComponent,
    UsuariosComponent,
    BusquedaComponent,
    ChatComponent,
    CrearDispositivosComponent,
    ComandarDispositivoComponent,
    SoyDispositivoComponent,
    ActualizarUsuarioComponent,
    EmailsComponent,
    SeguridadComponent,
    DispositivosComponent,
    DispositivoComponent,
    MisDispositivosComponent,
    ComandarUnDispositivoComponent,
    CalendarioComponent,
    BandaHoraComponent,
    MisDispositivosOnlineComponent,

  ],
  exports:[
     DashboardComponent,
     CalendarioComponent
  ],
  imports:[
  
       PAGES_ADMIN_ROUTES,
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       ChartsModule,
       SharedModule,
       PipesModule,
       FormsModule,
       NgbModalModule,
       FlatpickrModule.forRoot(),
       CalendarModule.forRoot({
         provide: DateAdapter,
         useFactory: adapterFactory
       })
     
  ]
})
export class PagesAdminModule {}
