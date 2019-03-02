import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../../models/usuario.models';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public payload ={};
  public usuario: Usuario;

  constructor(
    public socket: Socket,
    public storageService: StorageService){
  
      this.checkStatus();
      console.log('servicio websocket funcionando');
   }
 

checkStatus(){

  console.log('entramos en el check');

  this.socket.on('connect', ()=>{

    console.log('conectado al servidor , desde checkstatus');
    this.socketStatus = true;

    if(this.storageService.estaLogueado()){
      console.log('esta logueado un: ',this.storageService.quienEstaLogueado() );
      if(this.storageService.quienEstaLogueado() === 'usuario'){


        const payloadUsuario = {

        de: this.storageService.usuario.nombre,
        idUsuario:null,// this.storageService.usuario._id,
        idDispositivo: null,
        imagen:this.storageService.usuario.imagen,
        mensaje: "hola soy usuario, me re-conecto, actualizame",
        name: this.storageService.usuario.nombre,
        correo: this.storageService.usuario.email,
        mac: 'sin-mac',
        sala: 'sin-sala',
        tipo: 'sin-tipo',
        estado_posible:'no-posible',
        progreso: 0,
        cortesia: 'sin-cortesia',
        fotocel: 'sin-fotocel',
        canal1:'sin-canal',
        canal2: 'sin-canal',
        canal3: 'sin-canal'
        };

        this.payload = payloadUsuario

        }else{
        //es un dispositivo

        // tomo el id  del usauario a quien pertenece este dispositivo 
        let disp_id = this.storageService.dispositivo.usuario;


          const payloadDispositivo = {

          de: this.storageService.dispositivo.nombre,
          idDispositivo:null, // this.storageService.dispositivo._id,
          idUsuario: disp_id, //this.storageService.usuario._id,// null,
          mensaje: "hola soy disp me re-conecto, actualizame",
          name: this.storageService.dispositivo.nombre,
          mac: this.storageService.dispositivo.mac,
          sala: 'sin-sala',
          tipo: this.storageService.dispositivo.tipo,
          imagen: this.storageService.dispositivo.imagen,
          estado_posible:'no-posible',
          progreso: 0,
          cortesia: 'off',
          fotocel: 'normal',
          canal1:'off',
          canal2: 'off',
          canal3: 'off'
        };

          this.payload= payloadDispositivo
        }

    this.loginWS();
    }
});

  this.socket.on('disconnect', ()=>{
    console.log('desconectado del servidor ');
    this.socketStatus =  false;
  });
}


/// emite cualquier evento al servidor 
emitirAlServidor(evento: string, payload?: any, callback?: Function){

  this.socket.emit(evento, payload,callback)

}

//escucho cualquier evento del servidor 
escucharDelServidor(evento: string){

  // retorno un observable de tipo T , cualquier cosa 
  return this.socket.fromEvent(evento);

}

loginWS() {

  console.log('estamos relodeando');
  return new Promise((resolve, reject) => {

    this.emitirAlServidor('reload', this.payload,(resp)=>{
      console.log(resp);
      })
      resolve();
    });
};

}







    /*
 
      const payload = {

      
        de: this.storageService.usuario.nombre,
        idUsuario: this.storageService.usuario._id,
        idDispositivo: ,
        imagen: this.storageService.usuario.imagen,
        mensaje: "hola , acabo de loguearme , actualizame",

        mac: 'sin-mac',
        name: this.storageService.usuario.nombre,
        sala: 'sin-sala',
        //usuario:'sin-usuario',
        tipo: 'sin-tipo',
        estado_posible:'no-posible',
        progreso: 0,
        cortesia: 'sin-cortesia',
        fotocel: 'sin-fotocel',
        canal1:'sin-canal',
        canal2: 'sin-canal',
        canal3: 'sin-canal'
      };


*/