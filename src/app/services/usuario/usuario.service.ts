import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders} from '@angular/common/http'; // hay que proveerlo en el service.module como un httpClientModule
import { Usuario } from '../../models/usuario.models';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert';

import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { WebsocketService } from '../websocket/websocket.service';
import { DispositivoService } from '../dispositivo/dispositivo.service';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient,
    public storageService: StorageService,
    public router: Router,
    public subirArchivoService: SubirArchivoService,
    public websocketService: WebsocketService,
    public dispositivoService: DispositivoService
   ) { }

  ///////////////////////////////////////////////////////////////
  //
  // login de usuario normal
  // se llama de login component
  //
  ///////////////////////////////////////////////////////////////
  loginUsuario(usuario: Usuario, recordar: boolean = false) {
    
    if (recordar) {

      localStorage.setItem("email", usuario.email);
      
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "/login-usuario";

      return this.http.post(url, usuario)
      .map( (resp:any) => {
          return resp;
      })
      .catch(err => {
        console.log('error en el catch1: ',err);
        //console.log('error',err);
        //console.log('status', err.status);
        //console.log('mensaje', err.error.mensaje);
        swal('Error en login', err.error.mensaje, 'error')
        return Observable.throw(err)
      });
  }

  /////////////////////////////////////////////////////////////////
  //
  // login por google , recibe el token google obtenido en el componente login 
  // y lo envia al server para su validacion
  // si es correcto , recibe del server el token del usuario lo salva en el local y en la  referencia local
  // lo llama login.component
  ////////////////////////////////////////////////////////////////
  loginUsuarioGoogle(tokenGoo: string) {

    let url = URL_SERVICIOS + "/login-usuario-google";

    return this.http.post(url, { token: tokenGoo })
    .map((resp: any) => {

      // mando resp , porque necesito el token 
      return resp;
    })
    .catch(err => {
      console.log('error en el catch2: ',err);
      swal('Error en login', err.error.mensaje, 'error')
      return Observable.throw(err)
    });
  }

  ///////////////////////////////////////////////////////////////
  //
  // salir de la app 
  // se llama desde sidebar y headerbar
  ///////////////////////////////////////////////////////////////
  

  logoutUsuario() {

    const payload = {

      de: this.storageService.usuario.nombre,
    
      mensaje: "hola estoy haciendo logout , borrame",
      idDispositivo: null,
      idUsuario: null,
      imagen: null,
      mac: 'sin-mac',
      name: 'sin-nombre',
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

    this.storageService.usuario = null;
    this.storageService.token = "";
    this.storageService.idUsuario = "";
    this.storageService.menu= [];
  
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("menu");
    localStorage.removeItem("dispositivo");

   
    this.websocketService.emitirAlServidor('actualizar-participante-logout', payload,(resp)=>{
      console.log(resp);
    })
   
    this.router.navigate(["/login"]);
  }

  ///////////////////////////////////////////////////////////////
  //
  // Crear un usuario
  // se llama desdeel  register component
  ///////////////////////////////////////////////////////////////
  crearUsuario(usuario: Usuario) {
     
    let url = URL_SERVICIOS + "/usuario";

    // http es un observador al cual nos vamos a subscribir en el register.component
    // para que esto funcione del lado del backend , tenemos que colocar los cords , que permiten 
    // que desde otro dominio se lo pueda consultar 
    // si no pongo map retorno todo el usuario 
/*
          res.status(201).json({ // recurso creado
            ok: true,
            usuario: usuarioDB,
            usuarioSolicitante: req.usuario // es el usuario que esta en el token 
*/ 
// si pongo map solo el usuario 
// usuario: usuarioDB

    return this.http.post(url, usuario)
    .map((resp: any) =>{
      return resp.usuario;
    })
    .catch(err => {
      console.log('error en el catch3: ',err);
      // error mongoose : err.error.error.message,
      let mensajeNeto = this.quitarDosPuntos(err.error.error.message);
      swal(err.error.mensaje, mensajeNeto ,'error')
      return Observable.throw(err)
    });
  
  }


  ///////////////////////////////////////////////////////////////
  //
  // actualizar un usuario
  //
  // es llamada del metodo guardar de profile.component 
  // y del metodo guardarusuario del usuario.component
  ///////////////////////////////////////////////////////////////
  actualizarUsuario(usuario: Usuario) {

    console.log('el usuario es ',usuario);
  
    let url = URL_SERVICIOS + "/usuario/" + usuario._id;

    let encabezado = new HttpHeaders({
       "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    //console.log(this.storageService.token);
    return this.http
      .put(url, usuario, { headers: encabezado })
      .map((resp: any) => {
        return resp;
      });
      
  }
/*
 .catch(err => {
        console.log('error en el catch4: ',err);
        let mensajeNeto = this.quitarDosPuntos(err.error.error.message);
        swal(err.error.mensaje, mensajeNeto,'error')
        return Observable.throw(err)
      }
*/

  ///////////////////////////////////////////////////////////////
  //
  // cambia una magen 
  //
  // es llamada  de profile component
  // 
  ///////////////////////////////////////////////////////////////
  cambiarImagenUsuario(archivo: File, id: string) {

    // subir archivo devuelve una promesa
    this.subirArchivoService.subirArchivo(archivo, "usuarios", id)
      .then((resp: any) => {
        console.log("estoy cambiando una imagen  y la resp es ");
        console.log(resp);
      
        this.storageService.usuario.imagen = resp.usuarioActualizado.imagen

        
        //chequeo si soy yo mismo o estoy actualizando una foto de otro usuario
        if (this.storageService.usuario.email === resp.usuarioActualizado.email) {
          
          // soy yo , lo hago desde mi perfil
          swal("Imagen Actualizada", this.storageService.usuario.nombre, "success");
        }
        else {
        // lo hago de usuarios , por ende soy un super o admin
          swal(
            "Imagen Actualizada de ",
            resp.usuarioActualizado.nombre,
            "success"
          );
        }
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  ///////////////////////////////////////////////////////////////
  // 
  // carga los usuarios disponibles que hay en base de datos , en forma paginada
  // desde : donde indica el parametro , hasta los siguientes 5
  // es llamada desde el usuariocomponent
  //
  ///////////////////////////////////////////////////////////////
  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICIOS + "/usuarios?desde=" + desde;

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
    .catch(err => {
      console.log('error en el catch5: ',err);
      return Observable.throw(err)
    });
  }

 ///////////////////////////////////////////////////////////////
  // 
  // carga los usuarios disponibles que hay en base de datos , en forma paginada
  // desde : donde indica el parametro , hasta los siguientes 5
  // es llamada desde el usuariocomponent
  //
  ///////////////////////////////////////////////////////////////
  obtenerUsuariosConectados() {

    let url = URL_SERVICIOS + "/usuarios-conectados";
   
    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .get(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp // retorno resp xque necesito  el total de registros
    })
   
  };

  ///////////////////////////////////////////////////////////////
  // 
  // carga los usuarios disponibles que hay en base de datos
  // es llamada desde el usuariocomponent
  //
  ///////////////////////////////////////////////////////////////
  cargarUsuariosSPag() {

    let url = URL_SERVICIOS + "/usuarios-sin-pag";

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
    .catch(err => {
      console.log('error en el catch5: ',err);
      return Observable.throw(err)
    });
  }


 ///////////////////////////////////////////////////////////////
  // 
  // carga un usuario undicado por su ID
  //
  // es llamada desde ???
  //
  ///////////////////////////////////////////////////////////////
  cargarUsuario(id: string) {

    let url = URL_SERVICIOS + "/usuario/" + id;
//console.log(url);
    let encabezado = new HttpHeaders({

      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });
    return this.http
      .get(url, { headers: encabezado })
      .map((resp:any)=>{
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.log('error en el catch6: ',err);
        return Observable.throw(err)
      });
  }

  ///////////////////////////////////////////////////////////////
  // 
  // busca usuarios por coleccion , con un termino de busqueda
  // es llamada desde el usuariocomponent
  //
  ///////////////////////////////////////////////////////////////
  buscarUsuarios(termino: string) {

    let url = URL_SERVICIOS + "/busquedas/coleccion/usuarios/" + termino;

    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .get(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp
    })
    .catch(err => {
      console.log('error en el catch7: ',err);
      return Observable.throw(err)
    });
  }

  ///////////////////////////////////////////////////////////////
  // 
  // borra un usuario indicado por su ID
  // 
  // es llamada desde el usuariocomponent
  //
  ///////////////////////////////////////////////////////////////
  borrarUsuario(id: string) {

    let url = URL_SERVICIOS + "/usuario/" + id;

    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http
    .delete(url, { headers: encabezado })
    .map((resp:any)=>{
      return resp
    })
    .catch(err => {
      console.log('error en el catch8: ',err);
      return Observable.throw(err)
    });
  }
  
  quitarDosPuntos(mensaje: string)
  {

    let pos = mensaje.lastIndexOf(":")
    console.log(pos);

    let msj = mensaje.slice(pos +1)
    console.log(msj);
    //let msj = mensaje.split(":");
    //let msj2 = msj.sp    split(":")
    return msj;

  }

  renovarToken(){

    let url = URL_SERVICIOS + "/login-renovar-token";


    let encabezado = new HttpHeaders({
      "content-Type": "application/json",
      "Authorization": this.storageService.token
    });

    return this.http.get(url, { headers: encabezado })
    .map((resp: any) =>{

      console.log('el nuevo token', resp.token);
      localStorage.setItem('token',resp.token);
      this.storageService.token = resp.token;
     
      return resp.token;
    })
    .catch(err => {
      console.log('error en el catch9: ',err);
      swal('no se pudo renovar token','error');
      this.router.navigate(['/login']);
      return Observable.throw(err)
    });

  }



}
