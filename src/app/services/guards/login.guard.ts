import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public storageService: StorageService,
    public router: Router) { }

      canActivate() {

        // para activar el guard , vemos si etsa logueado
        if (this.storageService.estaLogueado()) {
          return true;
        } else {

          console.log("bloquedao x el guard");
          this.router.navigate(['/login']);
          return false;
        }
      }


}
