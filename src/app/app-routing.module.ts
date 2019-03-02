import {Routes, RouterModule} from '@angular/router';


// component
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './register/register.component';
import { PagesAdminComponent } from './pages/pages-admin.component';
import { LoginGuard } from './services/guards/login.guard';


const appRoutes: Routes  = [

     {path: 'login',component: LoginComponent},
     {path: 'register',component: RegisterComponent},
   
     {
          path: '',
          component: PagesAdminComponent,
          canActivate: [LoginGuard],
          loadChildren: './pages/pages-admin.module#PagesAdminModule'
     },

     // cualquier otra ruta que no este efinida en el arreglo
     {path: '**',component: NopagefoundComponent} 
];

//le decimos al routermodule que exporte el arreglo de rutas appRoutes
export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
