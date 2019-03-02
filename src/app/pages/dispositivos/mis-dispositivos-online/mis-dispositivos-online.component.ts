import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dispositivo } from '../../../models/dispositivo.models';
import { DispositivoService } from '../../../services/dispositivo/dispositivo.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ChatService } from '../../../services/chat/chat.service';
//import { Subscription } from 'rxjs/Subscription';
import { WebsocketService } from '../../../services/websocket/websocket.service';

@Component({
  selector: 'app-mis-dispositivos-online',
  templateUrl: './mis-dispositivos-online.component.html',
  styleUrls: ['./mis-dispositivos-online.component.css']
})
export class MisDispositivosOnlineComponent implements OnInit, OnDestroy {

  //mensajeDeSubscripcion: Subscription;

  //dispositivos es un array de la clase Dispositivo
  misDispositivosOnline: Dispositivo[] = [];
  elIdDelUsuario:  string;
  totalRegistros: string;

  constructor(
   
    public dispositivoService: DispositivoService,
    public storageservice: StorageService,
    public chatService: ChatService,
    public websocketService: WebsocketService,

  ) {}

  ngOnInit() {

    this.elIdDelUsuario = this.storageservice.idUsuario

    // no lo cargamos por rest
    //this.cargarMisDispositivosOnline(this.elIdDelUsuario);
    
    // forma hecha  por socket
    //1ro escuchamos cualquier cambio en los socket que entran o salen del socket 
    //this.escucharMisDispositivosOnSocket();

    //2do emitimos al server para que nos diga quienes son los quee stan en el socket 
    //this.emitirMisDispositivosOnSocket();

  }

  ngOnDestroy(){

    // cuando salgo de la pagina destruyo la subscripcion a la recepcion de mensajes 
    //this.mensajeDeSubscripcion.unsubscribe();
  
  }

  operar(indice: string){


    const aQuien = this.misDispositivosOnline[indice]._id

    const payload = {

      de: this.elIdDelUsuario,
      mensaje: 'cambia estado'
    }

    console.log('a quien le envio', aQuien);
    console.log('payload',payload);

    this.mensajeAdispositivo(aQuien,payload);

  }


  saberEstadoDispositivo(misDispositivos: Dispositivo[]){

    console.log('estos son mis dispositivos',misDispositivos);

    let long = misDispositivos.length;

    const payload = {

      de: this.elIdDelUsuario,
      mensaje: 'dame estado'
    }


    for( let i= 0; i < long ; i++){

      const aQuien = this.misDispositivosOnline[i]._id
      this.mensajeAdispositivo(aQuien,payload)
    
    }

  }

  mensajeAdispositivo(aQuien: string, payload:any){


 // llamamos al servicio y nos subscribimos a la respuesta
 this.dispositivoService.enviarMensaje(aQuien,payload)
 .subscribe((respuesta:any) => {
  console.log('la respuesta es : ', respuesta);
 }, error =>{
   console.log(error);
  
  })

  }

////////////////////////////////////////////////////////
// carga dispositivos on line mediante api-rest
////////////////////////////////////////////////////////
cargarMisDispositivosOnline(elIdDelUsuario: string) {


  this.dispositivoService.cargarMisDispositivosOnline(elIdDelUsuario)
  .subscribe((resp: any) => {

    this.totalRegistros = resp.total;
    this.misDispositivosOnline = resp.dispositivosOnline; // el array de dispositivos presentes en la BD
    console.log('mis dispositivos on line son : ', this.misDispositivosOnline);
  
  });
}



}