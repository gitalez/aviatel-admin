import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.models';
import { StorageService } from '../../../services/storage/storage.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styles: []
})
export class SeguridadComponent implements OnInit {

  usuario: Usuario ;
  formPass : FormGroup;

  constructor(
    public storageService: StorageService,
    public router: Router,
    public usuarioService: UsuarioService) { }

 // validators espera que le retorne una funcion
 sonIguales(campo1: string, campo2: string) {

  return (group: FormGroup) => {

    let pass1 = group.controls[campo1].value;
    let pass2 = group.controls[campo2].value;
    
    if (pass1 === pass2) {
      return null;
    }
    return {
      sonIguales: true
    };
  };
}


  ngOnInit() {

 
    this.formPass = new FormGroup(
      {
        // completamos los campos del html
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
    
      },
      { validators: this.sonIguales("password", "password2") } // espera una funcion 
    );



  }

  actualizarPass(){

    console.log(this.formPass.value);

    if(this.formPass.invalid){
      return
    }



    this.usuario= this.storageService.usuario;
    this.usuario.password = this.formPass.value.password;

    // llamamos al servicio y os subscribimos a la respuesta
      this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe((respuesta:any) => {
    
       console.log('la respuesta es : ', respuesta);
        swal('password actualizado','success');
      }, error =>{
        console.log(error);
        swal('error al cambiar la contraseña', error.error.mensaje,'error')
       })
       
   
    
     }



volver()
{
  this.router.navigate(['/dashboard']);
}

}
