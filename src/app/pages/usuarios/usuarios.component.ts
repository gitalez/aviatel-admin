import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/service.index";
import { StorageService } from "../../services/storage/storage.service";
import { Router } from "@angular/router";
import { Usuario } from "../../models/usuario.models";
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// hacemos esto para evitar los errores que tira Ts
declare var swal: any;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})

export class UsuariosComponent implements OnInit {

  // para el spinner
  cargando: boolean = false;

  //usuarios es un array de la clase Usuario
  usuarios: Usuario[] = [];

  // parametro desde que usa el backend
  desde : number = 0;

  // total de registros  de usuarios de la base de datos
  totalRegistros: number = 0;



  constructor(

    public usuarioService: UsuarioService,
    public storageService: StorageService,
    public modalUploadUsuarioService: ModalUploadService,
    public router: Router

  ) {}

  ngOnInit() {

    this.cargarUsuarios();

    // aqui nos subscribimos a la notificcion que termina de subir la imagen 

    this.modalUploadUsuarioService.notificacion
    .subscribe((resp:any) =>{

      this.cargarUsuarios(); // actualiza la imagen cargada
    });


    // nos subscribimos a cualquier cambio en la notificacion del evento
    //que la imagen se ha terminado de subir
    // siendo asi recargamos la tabla de usuarios para que se muestre la foto que se acaba de subir
    //this.modalUploadUsuarioService.notificacion
    //.subscribe(resp=> this.cargarUsuarios())
  }


  mostrarModal(id: string){

    this.modalUploadUsuarioService.mostrarModal('usuarios',id)

  }

  cargarUsuarios() {

    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {

      console.log("estoy en cargar usuarios , el server responde  resp ", resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios; // el array de usuarios presentes en la BD
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;
    //console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  todos() {
    this.desde = 0;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios(); // carga todos los usuarios cuendo en el search no hay termino
      return;
    }

    console.log(termino);

    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino)
    .subscribe((resp: any) => {
      // me subscribo a recibir un array de usuarios
      if (resp.ok === true) {
        this.usuarios = resp.usuarios;
      } else {
        this.usuarios = null;
        //swal("no autorizado", "su rol no le permite buscar usuarios", "error");
      }

      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    //console.log(usuario);

    if (usuario._id === this.usuarioService.storageService.usuario._id) {
      // this.usuarioService.usuario._id es el usuario logueado

      swal(
        "imposible borrar usuario",
        "no se puede borrar a si mismo",
        "error"
      );
      return;
    }

    swal({
      title: "¿esta seguro?",
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
    .then(borrar => {
      console.log(borrar);

      if (borrar) {
        this.usuarioService
          .borrarUsuario(usuario._id)
          .subscribe((borrado: boolean) => {
            // si no regresa un error del http lo hizo , si lo hace pasa x aqui
            console.log(borrado);
            swal(
              "usuario borrado: ",
              usuario.email,
              "error"
            );
            this.cargarUsuarios(); // hacemos un refresh con los nuevos usuarios
          });
      } else {
      }
    });
  
  }


  // se  modificaron role y estado , entonces se salvan los nuevos cambios
  guardarUsuario(usuario: Usuario) {
    console.log(usuario);
    this.usuarioService.actualizarUsuario(usuario)
    .subscribe((respuesta: any)=> {
      //console.log("la respuesta es ", respuesta);

      // si soy yo mismo , admin o super 
      if (usuario._id === this.usuarioService.storageService.usuario._id){
        this.storageService.guardarStorage(this.storageService.idUsuario, this.storageService.token, respuesta.usuario, respuesta.menu);
      }
      swal('perfil actualizado de : ',respuesta.usuario.nombre,'success');
    });
  }

  actualizarUsuario(id: string){
    console.log('el id es ',id);
    this.router.navigate(['/actualizar-usuario',id])
  }
}
