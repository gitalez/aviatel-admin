import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute , nos da la pos de leer params en la url 

import swal from 'sweetalert';

import { Usuario } from '../../../models/usuario.models';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Dispositivo } from '../../../models/dispositivo.models';
import { DispositivoService } from '../../../services/dispositivo/dispositivo.service';


@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styles: []
})
export class ActualizarUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('','','');

    //dispositivos es un array de la clase Dispositivo
  dispositivos: Dispositivo[] = [];

  constructor(
  
    public usuarioService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dispositivoService: DispositivoService
    ) { 

     

    }

  ngOnInit() {

   // obtenemos la ruta cuando entramos al componente
   this.activatedRoute.params.subscribe(params =>{
    let idUsuario = params['usuarioId'] // es usuarioId xque es lo declaramos en las ruta
    this.cargarUsuario(idUsuario)
     
    // cargamos los dispositivos que tiene este usuario 
    // id es el id del usuario que estamos actualizando
    // este usuario tendria dispositivos asociados 
    this.cargarLosDispositivosDelUsuario(idUsuario);

  });
  }
  
  guardarUsuario(f: NgForm){

    if(f.invalid){
      console.log(f.invalid);
      return
    }
  
    this.usuario.nombre= f.value.nombre,
    this.usuario.email= f.value.email,
    this.usuario.estado= f.value.estado
    this.usuario.role= f.value.role


    this.usuarioService.actualizarUsuario(this.usuario)
    .subscribe((respuesta: any)=> {
      swal('perfil actualizado de : ',respuesta.usuario.nombre,'success');
    });
      


        //this.router.navigate(['/usuario', usuario._id]);
      
    
  }
 
cargarLosDispositivosDelUsuario(idUsuario: string){

  this.dispositivoService.cargarLosDispositivosDelUsuario(idUsuario)
  .subscribe((dispositivosUsuario: any)=>{
 
    this.dispositivos = dispositivosUsuario;
    console.log('dispositivos del usuario', this.dispositivos);
  });
  }


  cargarUsuario(id: string){

    this.usuarioService.cargarUsuario(id)
    .subscribe((usuario: any) =>{
      this.usuario = usuario.usuario;
     console.log('usuario cargado', this.usuario);
    })
  
  }
}

