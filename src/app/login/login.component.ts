import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';
import { StorageService } from '../services/service.index';
import { WebsocketService } from '../services/websocket/websocket.service';
import { RecuperarPassService } from '../services/recuperar-password/recuperar-password.service';
import { DispositivoService } from '../services/dispositivo/dispositivo.service';

import swal from 'sweetalert';

// fuera de angular  , declaramos la funcion asi y la ejecutamos en el nginit
declare function init_plugins();

//hacemos que desde afuera de angular obtengamos una libreria  gapi , que esta en el scrips del index
declare const gapi: any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2: any; // declaro un objeto del sig-in de google 

  email: string;

  recordar : boolean = false; // para el boton de recordar 

  // para las contraseñas
  normalPass: boolean = true;
  recuperarPass: boolean = false
  nuevaPass: boolean = false;
  
  cargando: boolean = false;

  constructor(
    public router: Router, 
    public usuarioService: UsuarioService,
    public storageService: StorageService,
    public websocketService: WebsocketService,
    public recuperarPassService:  RecuperarPassService,
    public dispositivoService: DispositivoService
    ) { 

  
    }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    // el contenido de email se lo asignamos al ngmodel del html
    // solo con [] xque es del TS al html 
    // la actualizacion de recordar la hago en usuario.service, cuando me logueo
    this.email = localStorage.getItem('email') || '';

    // colocamos en check en el html si hay un email valido en el storage 
    if(this.email.length > 1 ){
      this.recordar = true; 
    }



  }

 //// init con google
 ///// login x google

 googleInit() {

  gapi.load("auth2", () => {
    this.auth2 = gapi.auth2.init({
      client_id:
      "444920625021-3u3ggjf0g9emno1hdeqlecfe4lujdnrt.apps.googleusercontent.com",
       // "444920625021-fb814pc5kobd282l3eqktch9m51dr7ti.apps.googleusercontent.com",
      cookiepolicy: "single_host_origin",
      scope: "profile email"
    });
    // obtenemos el elemento donde  esta el boton google 
    let elemento = document.getElementById("btnGoogle");
    this.attachSignin(elemento);


  });
}

attachSignin(elemento) { // recibe el elemento html 

  this.auth2.attachClickHandler(elemento, {}, googleUser => {

    // perfil de usuario de google , que nos sirve ahora 
    //let profile = googleUser.getBasicProfile();
    //console.log(profile);

    // obtenemos el token google 
    let tokenGoo = googleUser.getAuthResponse().id_token;
    //console.log(tokenGoo);

    
    // obtenido el token de google, lo envio al server para su verificacion
    // el server devuelve otro token , el token que queda en en local storage
    this.usuarioService.
    loginUsuarioGoogle(tokenGoo)
    .subscribe((respuesta: any) => {
      console.log(respuesta);
      //console.log('nos logueamos x google y el server responde : ');
      //console.log(respuesta); // tenemos la respuesta del server
      //console.log('el usuario es ',respuesta.usuario);
      //console.log('el id es : ', respuesta.usuario._id);
      // viene  todo el objeto : 
      /*
      res.status(200).json({
        ok: true,
        usuario: usuarioDB,
        token: token, //le envio el token 
*/

      // el email lo guarda la funcion recordame
      // el token y idusuario son los que estan guardados en el localstorage
      this.storageService.guardarStorage(respuesta.usuario._id, respuesta.token, respuesta.usuario, respuesta.menu);
    
      
      const payload = {

        de: this.storageService.usuario.nombre,
        id: this.storageService.usuario._id,
        imagen: this.storageService.usuario.imagen,
        mensaje: "hola , acabo de loguearme , actualizame"
    };

    console.log('actualizando: ', respuesta.usuario.nombre);
    this.websocketService.emitirAlServidor('actualizar-usuario', payload,(resp)=>{
      console.log(resp);
    })

      window.location.href = '#/dashboard'; // forma manual ,con el navigate  funciona a veces mal 
    });
    
  });

}

/////////////////////////////////////////
// loguin normal
/////////////////////////////////////////
 loguinNormal(fNormal: NgForm){

  //console.log(form.valid);
  //console.log(form.value);
  if(fNormal.invalid){
    return 
  }

  let  emailEntrante =   fNormal.value.email;
  const pass =   fNormal.value.password;

  var resultado = emailEntrante.split("-");
  let emailResultante = resultado[0];
  let mac: string = resultado[1];

if (mac){

    console.log('estamos configurando un dispositivo:', mac + " " + pass);
    this.configDispositivo('pupi@pupi.org',pass, mac) // el pass, en este caso viene el macaddress
}else{
  console.log('estamos configurando un usuario:', emailResultante + " " + pass);
    this.configUsuario(emailResultante,pass)
}

}


///////////////////////////////////////////////////////////////////////
// loguea un usuario y lo configura en el socket 
///////////////////////////////////////////////////////////////////////
configUsuario(email: string,pass: string){

// el nombre no lo sabemos , enviamos un null
let usuario = new Usuario(

  null,
  email, 
  pass
  );

// llamamos al servicio y nos subscribimos a la respuesta
this.usuarioService.loginUsuario(usuario,this.recordar)
  .subscribe((respuesta: any) => {

      //console.log('respuesta de loguin normal', respuesta);
      this.storageService.guardarStorage(respuesta.usuario._id, respuesta.token, respuesta.usuario, respuesta.menu);
    
      const payload = {

        de: this.storageService.usuario.nombre,
        idUsuario:this.storageService.usuario._id,// lo mando para encontrar el idsocket luego 
        idDispositivo: null,
        imagen: this.storageService.usuario.imagen,
        mensaje: "hola , acabo de loguearme , actualizame",

        mac: 'sin-mac',
        name: this.storageService.usuario.nombre,
        sala: 'sin-sala',
        tipo: 'sin-tipo',
        correo: this.storageService.usuario.email,
        estado_posible:'no-posible',
        progreso: 0,
        cortesia: 'sin-cortesia',
        fotocel: 'sin-fotocel',
        canal1:'sin-canal',
        canal2: 'sin-canal',
        canal3: 'sin-canal'
      };

      console.log('actualizando: ', respuesta.usuario.nombre);
      this.websocketService.emitirAlServidor('actualizar-participante-login', payload,(resp)=>{
        console.log(resp);
      })
      this.router.navigate(["/dashboard"]);
    });
}


///////////////////////////////////////////////////////////////////////
// configura un dispositivo falso cuando se loguea, sin identidad , solo el idsocket
//si entra aqui es porque es pupi que se ha logueado con un mac a verificar
///////////////////////////////////////////////////////////////////////
configDispositivo(email: string, pass: string, mac: string){

  //var res = codigo.split("-");
  //let pass = res[0]
  //let mac = res[1];
  //console.log(res[0]);
  //console.log(res[1]);

// el nombre no lo sabemos , enviamos un null
let usuario = new Usuario(

  null,
  email,
  pass
  );

// llamamos al servicio y nos subscribimos a la respuesta, para loguear a pupi
this.usuarioService.loginUsuario(usuario,this.recordar)
  .subscribe((respuesta: any) => {

      console.log('respuesta de loguin normal para dispositivo ', respuesta);
      this.storageService.guardarStorage(respuesta.usuario._id, respuesta.token, respuesta.usuario, respuesta.menu);
    
  });

  /// verificamos si existe esta macAdrees en base de datos 

  this.dispositivoService.obtenerDispositivo(mac)
  .subscribe((respuesta:any)=>{
    console.log('respuesta de obtener dispositivos es ',respuesta);
    //console.log('el nombre es : ',respuesta.dispositivo[0].nombre);

if (respuesta.ok === true){
  

  // guardo todo el dispositivo encontrado
  this.storageService.guardarStorageDispositivo(respuesta.dispositivo[0]);
    
  console.log(respuesta.dispositivo[0].usuario._id);
  
    const payload = {

 
      de: respuesta.dispositivo[0].nombre,
      idDispositivo:null, // respuesta.dispositivo[0]._id,
      idUsuario: respuesta.dispositivo[0].usuario._id,
      mensaje: "hola , acabo de loguearme , actualizame", 

      // le pasamos los datos de este dispositivo falso  cuando se loguea

      mac: respuesta.dispositivo[0].mac,
      name: respuesta.dispositivo[0].nombre,
      sala: 'sin-sala',
      imagen: respuesta.dispositivo[0].imagen,
      tipo: respuesta.dispositivo[0].tipo,
      estado_posible:'no-posible',
      progreso: 0,
      cortesia: 'off',
      fotocel: 'normal',
      canal1:'off',
      canal2: 'off',
      canal3: 'off'

     
  };

  this.websocketService.emitirAlServidor('actualizar-participante-login', payload,(resp)=>{
    console.log(resp);

  
  })
 
  this.router.navigate(["/dashboard"]);

}else{

  swal('error , no se pudo encontrar esa mac ', respuesta.mensaje,'error')

}
    
  },error =>{
    console.log(error);
    swal('error , error de servidor', error.error.mensaje,'error')
  })
};


olvide(){

  this.normalPass = false;
  this.recuperarPass = true;
  this.nuevaPass = false
}

noEnviar(){

  this.normalPass = true;
  this.nuevaPass = false;
  this.recuperarPass= false;
}

/////////////////////////////////////////
//
// enviar solicitud de recuperar password
// le enviamos el email del usuario que olvido la contraseña
//

enviarSolicitud(fOlvidar: NgForm){

  if(fOlvidar.invalid){
    return 
  }
  this.cargando = true
  console.log(fOlvidar.value);
// tengo un correo valido 

this.recuperarPassService.recuperarPass(fOlvidar.value.email)
.subscribe((respuesta: any)=> {
this.cargando = false;
swal('Solicitud de recuperacion enviada, revisa el correo de : ',fOlvidar.value.email,'success');

this.normalPass = false;
this.nuevaPass = true;
this.recuperarPass= false;

}, error =>{
 console.log(error);
 this.cargando = false;
 swal('error al recuparar la contraseña', error.error.mensaje,'error')
})

}


enviarNuevoPass(fPass: NgForm){

  if(fPass.invalid){
    return 
  }


  // aqui nos intentamos loguearnos con la pass temporal 
  // como un login normal pero con otra pantalla 
  // si el passtemporal  coincide ,  el server copia el temporal en el password normal borrando luego el temporal 
  // si el pass no coincide deja los dos password , hasta que coincida 
  // en caso de que la persona recuerde el pass normal ( cuando se loguea ) , borra el temporal ,si existe 
  
  
  this.recuperarPassService.nuevoPass(fPass.value.password)
  .subscribe(()=> {

  swal('la contraseña ha sido cambiada, ingrese por login',fPass.value.password,'success');

  this.normalPass = true;
  this.nuevaPass = false;
  this.recuperarPass= false;
  //console.log(fPass.value.password);
 
  }, error =>{
   console.log(error);
   this.cargando = false;
   swal('error al cambiar la contraseña', error.error.mensaje,'error')
  })


}

noEnviarNueva(){

  this.normalPass = true;
  this.nuevaPass = false;
  this.recuperarPass= false;
}

}
