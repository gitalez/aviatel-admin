import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor( 
    public websocketService: WebsocketService,
    public storageservice: StorageService

    ) {}

  ////////////////////////////////////////////////////////////////
  // esta parte es para el chat entre usuarios de la app
  ////////////////////////////////////////////////////////////////

  // envio y comunicacion entre usuarios 
  // enviar mensaje al servidor
  enviarMensajeAlServidor(mensaje: string){


    const payload = {

        de: this.storageservice.usuario.nombre,
        id: this.storageservice.usuario._id,
        mensaje: mensaje
    };

    this.websocketService.emitirAlServidor('mensaje',payload);

  }


  escucharMensajesDelServidor(){

    // voy a escuchar mensajes nuevos globales
    return this.websocketService.escucharDelServidor('mensaje-nuevo');
    

  }


  // metodo para escuchar mensajes privados , regresa un observable , //
  // nos subscribimos en el constructor de page-admin
  escucharMensajesPrivados(){

    return this.websocketService.escucharDelServidor('mensaje-privado');
  }


  //vamos a obtener cambios de los usuarios que se conectan al chat
  obtenerUsuariosActivos(){

    return this.websocketService.escucharDelServidor('usuarios-activos');
  }

  // lo usa  el componente chat.component
  emitirUsuariosActivos() {

    return this.websocketService.emitirAlServidor('emitir-usuarios');
  
  }


  ////////////////////////////////////////////////////////////////
  // esta parte es para la comunicacion entre usuarios y susu dispositivos
 ////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
// escucha del servidor que dispositivos tiene este usuario on line 
////////////////////////////////////////////////////////////////
 escucharMisDispositivosOnSocket(){
  return this.websocketService.escucharDelServidor('escuchar-mis-dispositivos-on-socket');
 }

  ////////////////////////////////////////////////////////////////
  // emite al server para que le diga a este cliente que dispositivos tiene en el socket
  ////////////////////////////////////////////////////////////////
  emitirMisDispositivosOnSocket(idDelUsuario: string) {

    const payload = {

      de : idDelUsuario

    }
    
    return this.websocketService.emitirAlServidor('emitir-mis-dispositivos-on-socket',payload);
  }

  ////////////////////////////////////////////////////////////////
  // emite al servidor la mac para que ubique a su usuario y le diga que esta on line
  ////////////////////////////////////////////////////////////////
  emitirMiMac(mac: string) {

    const payload = {

      de : mac

    }
    
    return this.websocketService.emitirAlServidor('emitir-mi-mac',payload);
  }

  ////////////////////////////////////////////////////////////////
  // metodo para escuchar eventos privados entre usuarios y sus dispositivos , regresa un observable , //
  // nos subscribimos en el constructor de page-admin
  ////////////////////////////////////////////////////////////////
  escucharEventosPrivados(){
    return this.websocketService.escucharDelServidor('dame-evento');
  }

 ////////////////////////////////////////////////////////////////
 // metodo para eventos eventos privados entre usuarios y sus dispositivos
 //regresa un observable
 ////////////////////////////////////////////////////////////////
  emitirEventosPrivados(){
    return this.websocketService.emitirAlServidor('pone-evento');
  }


}
