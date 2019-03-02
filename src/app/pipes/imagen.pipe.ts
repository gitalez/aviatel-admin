import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  // el tipo tiene un default que es usuario,
  //pero si viene otro tipo , tomo ese tipo
  
  transform(img: string, tipo: string = "usuario"): any {

    let url = URL_SERVICIOS + "/img";

    if (!img) {
      return url + "/usuarios/XXX"; // como la imagen XXX no exite , trae la imagen por defecto en la api noimagen
    }

   // viene un https
    if (img.indexOf("https") >= 0) {
      // es una imagen de google retornamos la img sin ninguna transformacion
      return img;
    }

    // si no es un https : pueden ser 
    switch (tipo) {

      case "usuario":
        url += "/usuarios/" + img;
        break;

      case "dispositivo":
        url += "/dispositivos/" + img;
        break;

      default:
        console.log("tipo de imagen no existe");
        url += "/usuarios/XXX"; // trae la imagen por defecto en la api noimagen
    }
    return url;
  }
}


// probar el pipe 

/*

 hago retrun 'funciona'
  y en algun lugar por ejemplo en el nombre del uusario el header.component.html pongo el pipe 
  pongo {{'alejandro' | ImagenPipe}}
 renderizara FUNCIONA  eliminando a alejandro 

 en los parametros del transform coloco un parametro img
 y tipo usuario 
 esto es lo que espera el server 
api.get('/img/:tipo/:img', ImgUploadController.imgUpload);

*/
