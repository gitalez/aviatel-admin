import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/service.index';
import { ModalUploadService } from './components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  title = 'aviatel';

  constructor(
    public settingService: SettingsService,
    public md: ModalUploadService
   
    ){

    // con solo inyectar en el constructor los servicios 
    // angular va a llamar el servicio 
    // y se vera por ejemplo lo que dice el console.log
    // el servicio settingService ahora inyectado aqui  ejecutara  el constructor del 
    //settingService.ts  que contiene la funcion  cargarstorage()
   

 

  }
ngOnInit(){

  console.log('oculto esta ',this.md.oculto);

}

}
