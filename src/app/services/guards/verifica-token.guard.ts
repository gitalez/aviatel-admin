import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public storageService: StorageService,
    public usuarioService: UsuarioService,
    public router: Router){}
  //
  canActivate():Promise<boolean> | boolean{


    console.log('Token Guard');
    let token = this.storageService.token;

    // el metodo atob decodifica un acadena de datos que ha sido decodificada en base 64
    // so nos da el payload , no el token decodificado
    // dentro del payload esta la fecha de expiracion  en seg


    let payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);

    let expirado = this.expirado(payload.exp)

    if ( expirado) {
      console.log('token expirado');
      this.router.navigate(['/login']);
       return false // si expiro no lo deja seguir 
    }

  return this.hayQueRenovar(payload.exp);

  }

  // hay que renovar retorna una promesa , por eso canactivarte retorna una promesa que retorna un booleano
  // o un booleano a traves  de la comparaion del if 
  hayQueRenovar( fechaExp: number): Promise<boolean>{ // hay que poner el tipo para que no de error TS

    return new Promise((resolve, reject)=>{

      // la fecha de exp esta en ms
      let tokenExp = new Date( fechaExp * 1000); // token exp en seg 
      let ahora = new Date();
      let masAdelante = new Date()

      // a ahora le sume una hora 
      masAdelante.setTime(masAdelante.getTime() + (1 * 60 * 60 * 1000)); // en miliseg

  
      //console.log('son las: ',ahora);
      //console.log('el token expira',tokenExp);
      //console.log('le sumo 1 hora a ahora ',masAdelante);


      if(tokenExp.getTime() > masAdelante.getTime()){

        //console.log('me voy x false');
        //console.log(tokenExp);
        resolve (true)
        
      }else{
        // esta proximo a vencer , renovamos el token
        
        this.usuarioService.renovarToken()
        .subscribe(()=>{
          console.log('token renovado');
          resolve(true);
        },()=>{
          console.log('no se pudo renovar token ');
          this.router.navigate(['/login']);
          reject(false);
        })

      }
    });


  }

  expirado( fechaExp: number){

    // la fecha de exp esta en ms 
    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora){
      return true // esta expirado 
    }else{
      // aun no expiro 
      return false
    }

  }

}
