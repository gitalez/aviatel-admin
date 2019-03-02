import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { DispositivoService } from '../dispositivo/dispositivo.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

 menu: any = [];

  constructor(
    public storageService: StorageService,
    public dispositivoService: DispositivoService) {

    // si colocamos lo que sigue  en el constructor no funciona porque s ecarga una sola vez
    // hay que hacerlo con una funcion fuera llamandola del sidebar component
    //this.menu = this.storageService.menu;

    //console.log(this.menu);

   }

   cargarMenu(){

      this.menu = this.storageService.menu;
   
   }

}

