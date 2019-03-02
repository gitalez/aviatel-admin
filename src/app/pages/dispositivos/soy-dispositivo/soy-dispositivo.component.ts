import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dispositivo } from '../../../models/dispositivo.models';
import { StorageService } from '../../../services/storage/storage.service';
import { ChatService } from '../../../services/chat/chat.service';
import { Usuario } from '../../../models/usuario.models';

@Component({
  selector: 'app-soy-dispositivo',
  templateUrl: './soy-dispositivo.component.html',
  styles: []
})
export class SoyDispositivoComponent implements OnInit, OnDestroy {

  dispositivo : Dispositivo;
  //usuario : any;
  //email: string;

  constructor(public storageService: StorageService, public chatService: ChatService) {
 
  }

  ngOnInit() {

  this.dispositivo = this.storageService.dispositivo;
  //console.log( 'soy dispositivo',this.dispositivo);
  //console.log('soy usuario', this.dispositivo.usuario);
 



  this.estoyOnLine();
  }

  ngOnDestroy(){
    //this.dispositivo = null;
    //estoyOffLine();

  }

estoyOnLine(){

  this.chatService.emitirMiMac(this.dispositivo.mac)

}


  operar(){

  }
}
