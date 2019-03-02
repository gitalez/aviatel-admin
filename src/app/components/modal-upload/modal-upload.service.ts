// lo declaramos en el service.module.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {


  public tipo: string; // es la coleccion 
  public id: string;

  public oculto: string = 'oculto'; //  para el modal , pone la clase  css oculto 
// leida por el ngclass


  // necesitamos una notificacion que dira cuando se termina de subir la imagen
  // emitimos un  any , que s el objeto respuesta de carga de imagenes
  // la subscripcion a la escucha de este evento esta en el nginit del usuariocomponent
  // y la emision de esta notificacion estara cuando se termine de subir el archivo  en el 
  // componente del modal 
  public notificacion = new EventEmitter<any>();

  constructor() { }


  ocultarModal(){

    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;

  }

  mostrarModal(tipo: string, id: string ){

    this.oculto = '';
    this.id = id;
    this.tipo = tipo;

  }
}
