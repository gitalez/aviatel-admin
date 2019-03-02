import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { Dispositivo } from '../../models/dispositivo.models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  usuario : Usuario;
  dispositivo: Dispositivo;
  token : string;
  idUsuario: string;
  menu: any = [];

  constructor() {

    this.cargarStorage();
    //console.log('estoy en storage , el token es ', this.token);
    this.cargarStorageDispositivo();
   }




  estaLogueado(){

     return (this.token.length > 5 ) ? true : false;
  }

  quienEstaLogueado(){

    if(this.dispositivo){

      return( 'dispositivo')
    }else{
      return ( 'usuario');
    }
  

  }

/////////////////////////////////////////////////////
//
//guarda el id, token y el usuario loguedo en forma de string
// guarda en las referencias de la clase  el usuario y el token
//
//////////////////////////////////////////////////////

  guardarStorage(id: string, token: string, usuario: Usuario, menu?: any) {

    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.idUsuario = id;
    this.menu = menu;

  }
/////////////////////////////////////////////////////
//
//guarda el dispositivo loguedo en forma de string
//
//////////////////////////////////////////////////////

guardarStorageDispositivo(dispositivo: Dispositivo) {

  localStorage.setItem("dispositivo", JSON.stringify(dispositivo));
  this.dispositivo = dispositivo;


}
////////////////////////////////////////////////////
//
//obtiene el token  el id, token y el usuario convertido a objeto
// guarda en las referencias de la clase  el usuario y el token
// si no encuentra token en el local hace usuario y token a vacios
//
//////////////////////////////////////////////////////

  cargarStorage() {

    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.idUsuario =  localStorage.getItem("id")
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));

    } else {
      this.token = "";
      this.idUsuario = "";
      this.usuario = null;
      this.menu = [];
    }
  }


  cargarStorageDispositivo() {

    if (localStorage.getItem("dispositivo")) {
      this.dispositivo = JSON.parse(localStorage.getItem("dispositivo"));

    } else {
    
      this.dispositivo = null;
   
    }
  }
}
