import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(

  public settingService: SettingsService) { }

  ngOnInit() {

    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any){

    console.log(tema);
    this.aplicarCheck(link);
    this.settingService.aplicarTema(tema)

  }

  aplicarCheck(link: any){

    // hacemos un arreglo de selectores que contiene la clase selector 
      let selectores: any = document.getElementsByClassName('selector');

      // barremos el arreglo de selectores 
      for(let ref of selectores){

          // removemos la clase working
          ref.classList.remove('working');

      }

// agregamos la clase working ( tilde ) a donde nos indica link 

link.classList.add('working')

  }

  colocarCheck(){

   

 // hacemos un arreglo de selectores que contiene la clase selector 
 let selectores: any = document.getElementsByClassName('selector');

 // obtenemos el tema 
 let tema = this.settingService.ajustes.tema
      // barremos el arreglo de selectores 
      for(let ref of selectores){

        if(ref.getAttribute('data-theme') === tema)
        {
          ref.classList.add('working');
          break;
        }
        }
  }


}
