import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { StorageService } from '../services/storage/storage.service';



declare function init_plugins();


@Component({
  selector: 'app-pages-admin',
  templateUrl: './pages-admin.component.html',
  styles: []
})
export class PagesAdminComponent implements OnInit {

  elIdDelUsuario:  string;

  constructor(
    public chatService: ChatService,
    public storageService: StorageService
          ) { }

  ngOnInit() {

    console.log('pagina admin funcionando');
    init_plugins();

    this.elIdDelUsuario = this.storageService.idUsuario

    this.chatService.escucharMensajesPrivados()
    .subscribe((msg)=>{
      console.log('mensaje privado',msg);
    })

    this.chatService.escucharEventosPrivados()
    .subscribe((msg)=>{
    console.log('evento privado',msg);
    })


    // forma hecha  por socket
    //1ro escuchamos cualquier cambio en los socket que entran o salen del socket 
    this.escucharMisDispositivosOnSocket();

    //2do emitimos al server para que nos diga quienes son los quee stan en el socket 
    this.emitirMisDispositivosOnSocket();


  } // end oninit



////////////////////////////////////////////////////////
// escucha que dispositivos on line mediante socket
// escucho cualquier dispositivo que se conecte  del evento escuchar-mis-dispositivos-on-socket
////////////////////////////////////////////////////////
escucharMisDispositivosOnSocket(){

  // me subscribo a escuchar los dispositivos socket del servidor 
  this.chatService.escucharMisDispositivosOnSocket()
  .subscribe((msg: any) =>{
    console.log('mis dispositivos en socket ',msg);
    
  });

}


  ////////////////////////////////////////////////////////
// carga dispositivos on line mediante socket emitiendo al server
// con el evento: emitir-mis-dispositivos-on-socket
////////////////////////////////////////////////////////
emitirMisDispositivosOnSocket(){
  this.chatService.emitirMisDispositivosOnSocket(this.elIdDelUsuario);
}
  
}
