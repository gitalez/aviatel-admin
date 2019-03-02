import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RecuperarPassService {


  emailARecuperar : string = '';

  constructor(public http: HttpClient,
              public storageService: StorageService,
              public usuarioService: UsuarioService
    ) { }

 ///////////////////////////////////////////////////////////////
  // 
  // envia un email al usuario seleccionado 
  
  //
  ///////////////////////////////////////////////////////////////

 recuperarPass(email: string){

  this.emailARecuperar = email;

    let url = URL_SERVICIOS + "/recuperar-pass";

    //console.log(url);
   
    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .post(url, {email:email},{ headers: encabezado })
    .map((resp:any)=>{
      return resp // retorno resp xque necesito  el total de registros
    })
  
  }
  
  nuevoPass(pass: string){

    let url = URL_SERVICIOS + "/cambiar-pass";

    return this.http
    .post(url, {emailARecuperar: this.emailARecuperar,passwordTemporal:pass})
    .map((resp:any)=>{
      return resp // retorno resp xque necesito  el total de registros
    })
  }
}