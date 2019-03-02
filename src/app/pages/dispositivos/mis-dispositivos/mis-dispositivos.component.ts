import { Component, OnInit } from "@angular/core";
import { Dispositivo } from '../../../models/dispositivo.models';
import { DispositivoService } from '../../../services/dispositivo/dispositivo.service';
import { StorageService } from 'src/app/services/service.index';

// hacemos esto para evitar los errores que tira Ts
declare var swal: any;

@Component({
  selector: "app-mis-dispositivos",
  templateUrl: "./mis-dispositivos.component.html",
  styles: []
})

export class MisDispositivosComponent implements OnInit {

  // total de registros  de dispositivos de la base de datos
  totalRegistros: number = 0;

  //dispositivos es un array de la clase Dispositivo
  misDispositivos: Dispositivo[] = [];


  elIdDelUsuario:  string;


  constructor(
   
    public dispositivoService: DispositivoService,
    public storageservice: StorageService

  ) {


  }

  ngOnInit() {

    this.elIdDelUsuario = this.storageservice.idUsuario

    this.cargarMisDispositivos(this.elIdDelUsuario);
  }


  cargarMisDispositivos(elIdDelUsuario: string) {


    this.dispositivoService.cargarMisDispositivos(elIdDelUsuario)
    .subscribe((resp: any) => {

      this.totalRegistros = resp.total;
      this.misDispositivos = resp.dispositivos; // el array de dispositivos presentes en la BD
      //console.log('son disp',this.misDispositivos);
      //this.saberEstadoDispositivo(this.misDispositivos);
    });
  }


}

