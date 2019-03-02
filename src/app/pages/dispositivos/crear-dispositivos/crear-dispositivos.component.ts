import { Component, OnInit } from '@angular/core';
import { Dispositivo } from '../../../models/dispositivo.models';
import { DispositivoService } from '../../../services/dispositivo/dispositivo.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.models';


@Component({
  selector: 'app-crear-dispositivos',
  templateUrl: './crear-dispositivos.component.html',
  styles: []
})
export class CrearDispositivosComponent implements OnInit {


  dispositivo : Dispositivo = new Dispositivo('','',0,0,'','','','','','','');
  usuarios: Usuario[] = [];

  constructor(
              public dispositivoService: DispositivoService,
              public usuarioservice: UsuarioService
    ) { }

  ngOnInit() {

    this.usuarioservice.cargarUsuariosSPag()
    .subscribe((respuesta)=>{
      this.usuarios = respuesta.usuarios;
    
    });
  }

  crearDispositivo(fDisp: NgForm){

    if(fDisp.invalid){
      return
    }

      console.log(fDisp.value);

      // tengo que  guardar el dispositivo
      this.dispositivo.nombre= fDisp.value.nombre,
      this.dispositivo.lat= fDisp.value.lat,
      this.dispositivo.lng= fDisp.value.lng,
      this.dispositivo.ssid= fDisp.value.ssid,
      this.dispositivo.passwordRouter= fDisp.value.passwordRouter,
      this.dispositivo.hogar= fDisp.value.hogar,
      this.dispositivo.sector= fDisp.value.sector,
      this.dispositivo.lugar= fDisp.value.lugar,
      this.dispositivo.mac= fDisp.value.mac,
      this.dispositivo.descripcion= fDisp.value.descripcion,
      this.dispositivo.tipo= fDisp.value.tipo,
      this.dispositivo.estado= fDisp.value.estado,
      this.dispositivo.usuario= fDisp.value.idUsuarioAsociado;
      this.dispositivo.esVerdadero = false;

      
      this.dispositivoService.crearDispositivo(this.dispositivo)
        .subscribe((dispositivo:any)=>{
     
          swal('Dispositivo creado', dispositivo.dispositivo.nombre , 'success');
    
        },error =>{
            console.log(error);
            swal('error al crear un dispositivo', error.error.mensaje,'error')
           }
          
          );
  }
}


