import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import  swal from 'sweetalert';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;
  
  constructor(
    public usuarioService: UsuarioService, 
    public router: Router) { }


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

    init_plugins();

    
    // creamos el formulario form , de tipo reactivo 
    // para el caso de contraseñas usamos una validacion 
    //personalizada  mediante un objeto y una funcion

    
    this.form = new FormGroup(
      {
        // completamos los campos del html
        nombre: new FormControl (null, Validators .required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales("password", "password2") } // espera una funcion 
    );

/*
    /// para no escribir una y otra vez
    this.form.setValue({
      nombre: "Test",
      email: "test@test.com",
      password: "123456",
      password2: "123456",
      condiciones: true
    });
*/
  }

  registrarUsuario(){

    if(this.form.invalid){
      return;
    }

    if(!this.form.value.condiciones){
      console.log('debe aceptar las condiciones');
      swal('Importante', 'debe aceptar las condiciones', 'warning') 
      return
    }

    // aqui tenemos un usuario valido para registrarse

    console.log('formulario: ' , this.form.valid);
    console.log(this.form.value);


    // creamos el usuario a partir del modelo/clase Usuario

    let usuario = new Usuario(

      this.form.value.nombre,
      this.form.value.email,
      this.form.value.password
    );

    // llamamos al servicio y me subscribo a la respuesta 
    this.usuarioService.crearUsuario(usuario)

    .subscribe((usuario: any) => {
        console.log(usuario);
        swal('estas en nuestra base de datos con el correo: ',usuario.email,'success');
        this.router.navigate(['/login']);
      })
   
  }
}
