import { Component, OnInit } from "@angular/core";
import { Dispositivo } from '../../../models/dispositivo.models';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { DispositivoService } from '../../../services/dispositivo/dispositivo.service';

// hacemos esto para evitar los errores que tira Ts
declare var swal: any;

@Component({
  selector: "app-dispositivos",
  templateUrl: "./dispositivos.component.html",
  styles: []
})

export class DispositivosComponent implements OnInit {

  // total de registros  de dispositivos de la base de datos
  totalRegistros: number = 0;

  //dispositivos es un array de la clase Dispositivo
  dispositivos: Dispositivo[] = [];

  constructor(
    public modalUploadUsuarioService: ModalUploadService,
    public dispositivoService: DispositivoService

  ) {}

  ngOnInit() {

    this.cargarDispositivos();

 
    //this.cargarUsuario(this.dispositivos._id)





    // aqui nos subscribimos a la notificcion que termina de subir la imagen 

    this.modalUploadUsuarioService.notificacion
    .subscribe((resp:any) =>{

      this.cargarDispositivos(); // actualiza la imagen cargada
    });


    // nos subscribimos a cualquier cambio en la notificacion del evento
    //que la imagen se ha terminado de subir
    // siendo asi recargamos la tabla de dispositivos para que se muestre la foto que se acaba de subir
    //this.modalUploadUsuarioService.notificacion
    //.subscribe(resp=> this.cargarDispositivos())
  }


  cargarDispositivos() {


    this.dispositivoService.cargarDispositivos()
    .subscribe((resp: any) => {

      this.totalRegistros = resp.total;
      this.dispositivos = resp.dispositivos; // el array de usuarios presentes en la BD
      console.log('son disp',this.dispositivos);
      //console.log(this.dispositivos.usuario);

    });
  }
  //usuario: {{ dispositivo.usuario[i].nombre}}

  borrarDispositivo(dispositivo: Dispositivo){

    swal({
      title: "¿esta seguro?",
      text: "Esta a punto de borrar a " + dispositivo.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
    .then(borrar => {
      console.log(borrar);

      if (borrar) {
        this.dispositivoService
          .borrarDispositivo(dispositivo._id)
          .subscribe((borrado: boolean) => {
            // si no regresa un error del http lo hizo , si lo hace pasa x aqui
            console.log(borrado);
            swal(
              "Dispositivo borrado: ",
              dispositivo.nombre,
              "success"
            );
            this.cargarDispositivos(); // hacemos un refresh con los dispossitivos que quedaron
          });
      } else {

      }

    });

  }


mostrarModal(id: string){

  this.modalUploadUsuarioService.mostrarModal('dispositivos',id)

  }

buscarDispositivo(termino: string){

  if (termino.length <= 0) {
    this.cargarDispositivos(); // carga todos los dispositivos cuendo en el search no hay termino
    return;
  }

  console.log(termino);

  this.dispositivoService.buscarDispositivos(termino)
  .subscribe((resp: any) => {
    // me subscribo a recibir un array de usuarios
    if (resp.ok === true) {
      this.dispositivos = resp.dispositivos;
    } else {
      this.dispositivos = null;
    }
  });
}

}

