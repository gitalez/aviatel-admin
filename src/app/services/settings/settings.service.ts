import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // creamos un tema  ajuste por defecto
  // la primera vez sera este el tema , si el usurio lo cambia
  // quedara en el local lo que haya seleccionado

ajustes: Ajustes = {

  temaUrl: 'assets/css/colors/default.css',
  tema: 'default'
}


  constructor(@Inject(DOCUMENT) private _document) { 

    this.cargarAjustes()
  }

  // cuando se llama a esta funcion  el usuario cambio los ajustes 
  // en al accountsetting

  guardarAjustes(){

    // JSON.  convierte un obj json a un string
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes))
  }

  // lo cargamos desde el app.component
  cargarAjustes(){

    if(localStorage.getItem('ajustes')){

      // JSON:parse convirte un string en un obj json
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema)

    }else{
      console.log('usando valores por defecto');
      this.aplicarTema(this.ajustes.tema); // valores por defecto

    }
  }

  aplicarTema(tema: string){

    // accedemos al elemento tema y le cambiamos elatributo 
    // le indicamos la ruta donde esta lo que queremos cambiar 
    // color tienE los temas com por ejemplo green-dark
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href',url);

    // aqui el usuario esta cambiando los temas 
    // por ende los salvo en el objeto ajustes
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    // luego lo salvo en el local 
    this.guardarAjustes();
  }
}


// creamos una interface para qque TS nos ayude 

interface Ajustes {

  temaUrl: string;
  tema: string;
}