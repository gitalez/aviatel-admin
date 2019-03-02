import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Dispositivo } from '../../models/dispositivo.models';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  
  constructor(
    public http: HttpClient,
    public storageService: StorageService
    ) { 
    }


  ///////////////////////////////////////////////////////////////
  //
  // envia un mensaje a un dispositivo
  //
  ///////////////////////////////////////////////////////////////
  enviarMensaje(aQuien: string, payload: any) {
  
    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
     "Authorization": this.storageService.token
   });
   
    let url = URL_SERVICIOS + "/mensaje/" + aQuien;

    return this.http.post(url, payload, {headers: encabezado })
    .map((resp: any) =>{
      return resp
      })
  }

  ///////////////////////////////////////////////////////////////
  //
  // Crear un dispositivo
  //
  ///////////////////////////////////////////////////////////////
  crearDispositivo(dispositivo: Dispositivo) {
  
    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
     "Authorization": this.storageService.token
   });
   
    let url = URL_SERVICIOS + "/disp";

    return this.http.post(url, dispositivo, {headers: encabezado })
    .map((resp: any) =>{
      return resp
      })
  }

  ///////////////////////////////////////////////////////////////
  //
  // actualizar un dispositivo
  //
  ///////////////////////////////////////////////////////////////
  actualizarDispositivo(dispositivo: Dispositivo) {

    let url = URL_SERVICIOS + "/disp/" + dispositivo._id;

    let encabezado = new HttpHeaders({
       "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
      .put(url, dispositivo, { headers: encabezado })
      .map((resp: any) => {
        return resp;
      })
  }

  ///////////////////////////////////////////////////////////////
  //
  // obtener un dispositivo si existe  mediante  su mac
  //
  ///////////////////////////////////////////////////////////////
  obtenerDispositivo(mac: string) {

    let url = URL_SERVICIOS + "/obtener-disp/" + mac;

    let encabezado = new HttpHeaders({
       "content-Type": "application/json"
    });

    return this.http
      .get(url , { headers: encabezado })
      .map((resp: any) => {
        return resp;
      })
  }

  ///////////////////////////////////////////////////////////////
  // 
  // carga los dispositivos disponibles que hay en base de datos , en forma paginada
  // desde : donde indica el parametro , hasta los siguientes 5
  //
  ///////////////////////////////////////////////////////////////
  cargarDispositivos(desde: number = 0) {

    let url = URL_SERVICIOS + "/disps?desde=" + desde;

    //console.log(url);
   
    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .get(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp // retorno resp xque necesito  el total de registros
    })
  }


  ///////////////////////////////////////////////////////////////
  // 
  // carga los dispositivos disponibles del usuario logueado que hay en base de datos
  //
  ///////////////////////////////////////////////////////////////
  cargarMisDispositivos(elIdDelusuario: string) {

    let url = URL_SERVICIOS + "/mis-disps/" + elIdDelusuario;

    //console.log(url);
   
    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .get(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp // retorno resp xque necesito  el total de registros
    })
  }

  ///////////////////////////////////////////////////////////////
  // 
  // carga los dispositivos disponibles online que estan en el socket  del usuario logueado que hay en base de datos
  //
  ///////////////////////////////////////////////////////////////
  cargarMisDispositivosOnline(elIdDelusuario: string) {

    let url = URL_SERVICIOS + "/mis-disps-online/" + elIdDelusuario;

    //console.log(url);
   
    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .get(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp // retorno resp xque necesito  el total de registros
    })
  }
  
  ///////////////////////////////////////////////////////////////
  // carga los dispositivos disponibles que hay en base de datos 
  // los reqiiere el admin
  ///////////////////////////////////////////////////////////////
  cargarLosDispositivosDelUsuario(idUsaurio: string) {

    let url = URL_SERVICIOS + "/mis-disps/" + idUsaurio;

    //console.log(url);
   
    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .get(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp.dispositivos // retorno resp xque necesito  el total de registros
    })
  }

  ///////////////////////////////////////////////////////////////
  // carga un dispositivo undicado por su ID
  ///////////////////////////////////////////////////////////////
  cargarDispositivo(id: string) {

    let url = URL_SERVICIOS + "/disp/" + id;

    let encabezado = new HttpHeaders({

      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });
    return this.http
      .get(url, { headers: encabezado })
      .map((resp:any)=>{
        return resp;
      })
  }

  ///////////////////////////////////////////////////////////////
  // 
  // busca dispositivos  por coleccion , con un termino de busqueda
  //
  ///////////////////////////////////////////////////////////////
  buscarDispositivos(termino: string) {

    let url = URL_SERVICIOS + "/busquedas/coleccion/dispositivos/" + termino;

    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .get(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp
    })
  }

  ///////////////////////////////////////////////////////////////
  // 
  // busca dispositivos  por coleccion , con un termino de busqueda
  //
  ///////////////////////////////////////////////////////////////
  buscarMisDispositivos(termino: string) {

    let url = URL_SERVICIOS + "/busquedas/coleccion/dispositivos/" + termino;

    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .get(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp
    })
  }

  ///////////////////////////////////////////////////////////////
  // 
  // borra un dispositivo indicado por su ID
  // 
  //
  ///////////////////////////////////////////////////////////////
  borrarDispositivo(id: string) {

    let url = URL_SERVICIOS + "/disp/" + id;

    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .delete(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp
    })
  }
}
