import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { DispositivoService } from '../../../services/dispositivo/dispositivo.service';
import { Dispositivo } from '../../../models/dispositivo.models';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styles: []
})
export class DispositivoComponent implements OnInit {


usuarios: Usuario[] = [];
id : string;

 //dispositivos es un array de la clase Dispositivo
 dispositivo: Dispositivo;

constructor(
  public dispositivoService: DispositivoService,
  public usuarioservice: UsuarioService,
  public activatedRoute: ActivatedRoute
  ) { 

    // obtengo la ruta cuando entramos al componente
    this.activatedRoute.params
    .subscribe(params =>{
        this.id = params['id'] // es id xque es lo declaramos en las rutas

         this.dispositivoService.cargarDispositivo(this.id)
         .subscribe((respuesta)=>{
           this.dispositivo = respuesta
           console.log(respuesta);
         })

     });

  }

ngOnInit() {


}

actualizarDispositivo(fDisp: NgForm){

  if(fDisp.invalid){
    return
  }

    console.log(fDisp.value);


    // tengo que  guardar el dispositivo
    this.dispositivo.nombre= fDisp.value.nombre,
    this.dispositivo.lat= fDisp.value.lat,
    this.dispositivo.lng= fDisp.value.lng,
    this.dispositivo.lugar= fDisp.value.lugar,
    this.dispositivo.hogar= fDisp.value.hogar,
    this.dispositivo.sector= fDisp.value.sector,
    this.dispositivo.descripcion= fDisp.value.descripcion,
    this.dispositivo.estado= fDisp.value.estado,


    this.dispositivoService.actualizarDispositivo(this.dispositivo)
      .subscribe((dispositivo:any)=>{
   
        swal('Dispositivo actualizado', dispositivo.dispositivo.nombre , 'success');
  
      },error =>{
          console.log(error);
          swal('error al actualizar un dispositivo', error.error.mensaje,'error')
         }
        
        );
      


}

}


