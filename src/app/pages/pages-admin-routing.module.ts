import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { ChatComponent } from './chat/chat/chat.component';
import { CrearDispositivosComponent } from './dispositivos/crear-dispositivos/crear-dispositivos.component';
import { SoyDispositivoComponent } from './dispositivos/soy-dispositivo/soy-dispositivo.component';
import { EmailsComponent } from './emails/emails.component';
import { SeguridadComponent } from './seguridad/seguridad/seguridad.component';
import { ActualizarUsuarioComponent } from './actualiza-usuario/actualizar-usuario/actualizar-usuario.component';
import { DispositivosComponent } from './dispositivos/dispositivos/dispositivos.component';
import { DispositivoComponent } from './dispositivos/dispositivo/dispositivo.component';
import { ComandarDispositivoComponent } from './dispositivos/comandar-dispositivo/comandar-dispositivo.component';
import { MisDispositivosComponent } from './dispositivos/mis-dispositivos/mis-dispositivos.component';
import { ComandarUnDispositivoComponent } from './dispositivos/comandar-un-dispositivo/comandar-un-dispositivo.component';
import { LoginGuard } from '../services/guards/login.guard';
import { CalendarioComponent } from './calendario/calendario.component';
import { MisDispositivosOnlineComponent } from './dispositivos/mis-dispositivos-online/mis-dispositivos-online.component';



const pagesRoutesAdmin: Routes = [


     // dentro del pagescomponent definimos hijas rutas mediante un arreglo
     //estas rutas hijas trabajan con el outlet secundario que esta en pagescomponent
    // un parametro opcional del path es data , que se pasa como un objeto
    // dentro colocamos un titulo que sera lo que se necesite 
    // como poner parametros opcionales 
    //{path: 'actualizarModulo/:termino?',component: ActualizarModuloComponent, data: {titulo: 'Actualizacion de un modulo'}},

    /*
    para pasar data ponemos un objeto data en el path que contiene titulo y descripcion 
    esta info data .sera usada por los breadcrumbs 
    */
/*
 canactivate es otra propiedad de las rutas , se lo agregamos añ pagesadmincomponent

 */
   
          {path: 'dashboard',
          component: DashboardComponent,
          canActivate: [VerificaTokenGuard],
          data: {titulo: 'Tablero',
          descripcion: 'Tablero principal'}},

      
        
          {path: 'emails',component: EmailsComponent, data: {titulo: 'Emails',descripcion: 'entender los envios de emails'}},
          {path: 'calendario',component: CalendarioComponent, data: {titulo: 'Calendario',descripcion: 'entender  el calendario de angular'}},
          {path: 'ajuste-cuenta', component: AccountSettingsComponent, data: {titulo: 'ajuste-cuenta',descripcion: 'ajustes del tema de la cuenta'}},
          {path: 'perfil', component: ProfileComponent, data: {titulo: 'Mi perfil',descripcion: 'perfil de usuario'}},
          {path: 'seguridad', component: SeguridadComponent, data: {titulo: 'Seguridad',descripcion: 'cambio de contraseñas'}},
          {path: 'crear-dispositivos', component: CrearDispositivosComponent, data: {titulo: 'Crear Dispositivos Wifi',descripcion: 'Crear dispositivos wifi'}},
          {path: 'dispositivo/:id', component: DispositivoComponent, data: {titulo: 'Actualizar dispositivos Wifi',descripcion: 'actualizacion de dispositivos wifi'}},
          {path: 'dispositivos', component: DispositivosComponent, data: {titulo: 'Dispositivos Wifi',descripcion: 'mantenimiento de dispositivos wifi'}},
          {path: 'misDispositivos', component: MisDispositivosComponent, data: {titulo: 'Mis dispositivos Wifi adquiridos',descripcion: 'mantenimiento de mis dispositivos wifi adquiridos'}},
          {path: 'misDispositivosOnline', component: MisDispositivosOnlineComponent, data: {titulo: 'Mis dispositivos Wifi online',descripcion: 'mantenimiento de mis dispositivos wifi online'}},
          {path: 'comandarUnDispositivo/:id', component: ComandarUnDispositivoComponent, data: {titulo: 'comandar un dispositivo Wifi',descripcion: 'comando de dispositivos wifi'}},
          {path: 'comandar', component: ComandarDispositivoComponent, data: {titulo: 'Comandar dispositivos wifi',descripcion: 'comandar todos los dispositivos wifi'}},
          {path: 'soy', component: SoyDispositivoComponent, data: {titulo: 'Soy un dispositivo wifi',descripcion: 'soy un dispositivo wifi'}},

          {path: 'chats', 
          component: ChatComponent,
          canActivate: [AdminGuard,LoginGuard],
          data: {titulo: 'Actividad de chat',
          descripcion: 'ver la actividad en los chats'}},
          
          {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador',descripcion: 'busqueda global'}},
          
          {path: 'usuarios', 
          component: UsuariosComponent,
          canActivate: [AdminGuard],
          data: {titulo: 'Usuarios',
          descripcion: 'usuarios registrados'}},

          {path: 'actualizar-usuario/:usuarioId', 
          component: ActualizarUsuarioComponent,
          canActivate: [AdminGuard],
          data: {titulo: 'Actualizar usuarios',
          descripcion: 'Actualizar usuarios registrados por el admin'}},
          
          // cuando no existe ninguna ruta
          {path: '',redirectTo: '/dashboard', pathMatch: 'full'}

];


//le decimos al routermodule que exporte el arreglo de rutas appRoutes
export const PAGES_ADMIN_ROUTES = RouterModule.forChild(pagesRoutesAdmin);

