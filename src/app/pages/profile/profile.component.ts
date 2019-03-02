import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenAsubir: File;
  imagenTemp: any; // si no existe imagenTemp se muestra la que se encuentre cargada


  constructor(
    public storageService: StorageService,
    public usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuario = this.storageService.usuario
  }

  guardarProfile(usuario: Usuario){

// el perfil lo actualiza uno mismo 
// actualiza nombre  y email

    // los nuevos valores del usuarios
    this.usuario.nombre = usuario.nombre;

    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }else{
      this.usuario.email = this.storageService.usuario.email
    }

    //console.log("el usuario actualizado es : " , usuario);

// llamamos al servicio y os subscribimos a la respuesta
  this.usuarioService.actualizarUsuario (this.usuario)
  .subscribe((respuesta:any) => {

   console.log('la respuesta es : ', respuesta);
    // el email lo guarda la funcion recordame
    this.storageService.guardarStorage(this.storageService.idUsuario, this.storageService.token, respuesta.usuario);
    swal('actualizaste tu perfil:',respuesta.usuario.nombre,'success');
  
  });
 }

 
// esta funcion es llamada cuando hay un cambio en el box de subir imagen
seleccionImagen(archivo: File) {

  if (!archivo) {
    this.imagenAsubir = null;
    return;
  }

  // validamos si es una imagen
  // si el indice tiene la palabra imagen
  if (archivo.type.indexOf("image") < 0) {
    // no es una imagen

    swal(
      "Solo Imagenes",
      "El archivo seleccionado no es una imagen",
      "error"
    );
    this.imagenAsubir = null;
    return;
  }
  // tengo el archivo en imagenasubir
  this.imagenAsubir = archivo;

  // lo siguiente es para mostrar una imagen temporal antes de enviarla al server
  // declaramos un reader  en js .puro java scrpts
  let reader = new FileReader();
  let urlImagenTemp = reader.readAsDataURL(archivo);

  reader.onload = () => (this.imagenTemp = reader.result);

  //console.log(reader.result); // vemos una imnagen en base 64
}

// es llamada desde este html
cambiarImagenUsuario() {
  // disparamos el servicio desde usuario.service , en donde tengo todos los datos
  // desde profile llamo a cambiarimagen de usuarioservice
  //desde usarioservice llamo a subir usuario service
  // y desde ahi llamo al XMLHttpRequest

  this.usuarioService.cambiarImagenUsuario(this.imagenAsubir, this.usuario._id);
}

  
}
