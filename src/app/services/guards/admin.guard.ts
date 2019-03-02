// ESTE ADMIN GUARD DEBEMOS IMPORTARLOS EN  service module 
import { Injectable } from '@angular/core';
import { CanActivate  } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public storageService: StorageService,
    public usuarioService: UsuarioService
    ){}

  canActivate()
  {

    let role = this.storageService.usuario.role;

     if( role === 'admin' || role === 'super'){
      return true;

     }else {

      console.log('bloqueado por el ADMIN GUARD');
      this.usuarioService.logoutUsuario();// este ademas navega hacia el login 
      return false
     }
   
  };
}
