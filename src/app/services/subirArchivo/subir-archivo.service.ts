import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  // lo hacemos con js , porque angular no lo tiene
  // upload es la ruta en el server 
  // ej quiero subir un archivo de tipo usuario con el el id : mmmm
  // el tipo es la coleccion a la cual queiro que pertenezca 
  //{{url}}/upload/usuarios/5b85b8967f58840f0d7ada28
  // key : imagen

  // esta funcion la llama: desde el profile.component
  subirArchivo(archivo: File, tipo: string, id: string) {
    // resolvemos la peticion como una promesa para luego comunicar a quien me la pidio que se hizo

    // la estructura de una promesa es :

    /*
    return new Promise ((resolve,reject)=> {

    });
*/
/*
let usuario = {
  nombre : 'alex',
  edad: 60
};

let url = URL_SERVICIOS + "/upload/" + tipo + "/" + id;
console.log(url);


fetch( url, 

{ method: 'PUT',
body: archivo,
headers: {'Content-type': 'application/json'}})
.then((resp) => resp.json())
.then((respObj) => {
  console.log('respuesta del put');
  console.log(respObj);
})
.catch( error => {
  console.log('error en la peticion');
  console.log(error);
})



*/

    return new Promise((resolve, reject) => {
      let formData = new FormData(); // es el payload que quiero subir

      // peticion ajax
      let xhr = new XMLHttpRequest();

      // en la variable archivo tenemos el contenido del archivo
      // imagen es el key que enviamos  al server
      // porque espera : let archivo = req.files.imagen 
      // el name es una propiedad de File que esta dentro del archivo
      formData.append("imagen", archivo, archivo.name); 

      // configuramos la peticion ajax , me pongo a escuchar que el archivo sea subido 
      xhr.onreadystatechange = function() {
        // es como un observable, hay  una propiedad que cambia de estado readystate

        // me interesa el estado 4  , que es cuando termina
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("imagen subida");
            // regresa un string , lo convierto a json
            resolve(JSON.parse(xhr.response)); //  en status 200 es el objeto json que devuelve el server
          } else {
            console.log("fallo la subida");
            reject(xhr.response);
          }
        }
      }; // function

      let url = URL_SERVICIOS + "/upload/" + tipo + "/" + id;
      console.log(url);

      // enviamos la peticion
      xhr.open("PUT", url, true); // es un put xque en el server lo hicimos con put, el true es asincrono
      xhr.send(formData);

    }); // promesa

  } // metodo
} // clase

