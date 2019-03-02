import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

 
  imagenAsubir: File;
  imagenTemp: any;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  cerrarModal(){

    this.modalUploadService.ocultarModal(); // esta declarada en el modal service
    this.imagenAsubir= null;
    this.imagenTemp= null;
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

// la llama el boton del modal 
subirImagen(){

  this.subirArchivoService.subirArchivo(this.imagenAsubir, this.modalUploadService.tipo, this.modalUploadService.id)
  .then(resp =>{
    // aqui se subio la imagen , emito la notificacion que recibe el nginit del usuario component
    this.modalUploadService.notificacion.emit(resp);
    this.cerrarModal();
  })
  .catch(err =>{
    console.log('error en la subida');
  })
}

}

// colocamos el selectro app-modal-upload al final del pages-admin-component.html
