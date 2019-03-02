import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../../services/chat/chat.service';
import { Subscription } from 'rxjs/Subscription';
import { StorageService } from 'src/app/services/service.index';
import { WebsocketService } from '../../../services/websocket/websocket.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string;

  mensajeDeSubscripcion: Subscription;
  subscripcionActivos : Subscription;

  // para el scroll automatico
  elemento: HTMLElement;
  elementoList: HTMLElement;

  mensajes: Mensajes[] = [];
  imag: string;
  now: any;
  usuarioId:  string;
  soyYo: string = '';
  usuariosConectados: []= [];
  usuariosActivos : any;

  // usamos el pipe async para ver los usuarios activos 
  //usuariosActivosObs: Observable<any>; // es un obs 

  constructor(
    public chatService: ChatService,
    public storageService: StorageService,
    public websocketService: WebsocketService,
    public usuarioService: UsuarioService
    ) { }

  ngOnInit() {

    //this.reLoad();

    this.imag = this.storageService.usuario.imagen
    this.usuarioId = this.storageService.usuario._id; // soy yo 

    // obtengo el id del elemento 
    this.elemento = document.getElementById('chat-mensajes');

   // obtengo el id del elemento 
   this.elementoList = document.getElementById('list-mensajes');

    this.escucharDelServidor();

    this.obtenerUsr();

    
    
  }



  ngOnDestroy(){
    // cuando salgo de la pagina destruyo la subscripcion a la recepcion de mensajes 
    this.mensajeDeSubscripcion.unsubscribe();
    this.subscripcionActivos.unsubscribe();
  }

  enviarMsg(){

    // validamos que no este vacio

    //if( this.texto.trim().length === 0){
     // return;
    //}
    console.log(this.texto);
    this.chatService.enviarMensajeAlServidor(this.texto);
    this.texto = '';
  }


  escucharDelServidor(){

     // me subscribo a escuchar los mensajes del servidor 
     this.mensajeDeSubscripcion = this.chatService.escucharMensajesDelServidor()
     .subscribe((msg: any) =>{
 
       // escucho cualquier mensaje del evento mensaje-nuevo
       // me reenvia lo que to le envie 
       console.log('mensajes publicos',msg);
       
       if (msg.id === this.usuarioId){
       
         this.soyYo = 'soyYo';
  
       }else{
        this.soyYo = 'noSoyYo';
       }
       console.log(this.soyYo);
 
       let dato: Mensajes = {

         mensaje : msg.mensaje,
         de: msg.de,
         quien: this.soyYo,
         imagen:msg.imagen
       }
 
       this.mensajes.push(dato)
       this.now = Date();

      // scrol automatico
       setTimeout(()=>{
         this.elemento.scrollTop = this.elemento.scrollHeight;
       },50)
 
 
     })


  }


  reLoad(){

      const payload = {

        de: this.storageService.usuario.nombre,
        id: this.storageService.usuario._id,
        imagen: this.storageService.usuario.imagen,
        mensaje: "hola me re-conecto de nuevo, actualizame"
      };
      
          this.websocketService.emitirAlServidor('reload', payload,(resp)=>{
            console.log(resp);
          })
      

  
  }

  obtenerUsr(){

  // inicializamos el obs 
  this.subscripcionActivos = this.chatService.obtenerUsuariosActivos()
  .subscribe(
    usuariosActivos =>{
      console.log('usuarios activos', usuariosActivos) // PRIMER CALLBACK . LINEA DE DATOS
      console.log('el id es :' , this.storageService.usuario._id);
      this.usuariosActivos = usuariosActivos;
      let lista = this.usuariosActivos.filter(usuario => usuario.usuario !== this.storageService.usuario._id);
      console.log('lista',lista);
      this.usuariosActivos = lista;

  // scrol automatico
  setTimeout(()=>{
    this.elementoList.scrollTop = this.elementoList.scrollHeight;
    },50)
   

  },
    error =>{
      console.error('error en el obs', error) // 2DO CALLBACK , PARA EL ERROR
  },
    ()=>{
    console.log('el observador termino'); // 3ER CALLBACK PARA CUANDO TERMINA 
    });

 
  // Emitir el obtenerUsuarios
  this.chatService.emitirUsuariosActivos();
}


}



interface Mensajes {

  mensaje: string;
  de: string,
  quien: string;
  imagen: string;
}

/*
obtenerUsuariosConectados(){

    // llamamos al servicio y os subscribimos a la respuesta
    this.usuarioService.obtenerUsuariosConectados()
    .subscribe((respuesta:any) => {
  
     console.log('los usuarios conectados son  : ', respuesta);
      this.usuariosConectados = respuesta.usuarios;
      //swal('password actualizado','success');
    }, error =>{
      console.log(error);
      //swal('error al cambiar la contraseña', error.error.mensaje,'error')
     })
}


*/
