import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute , nos da la pos de leer params en la url 
import { DispositivoService } from '../../../services/dispositivo/dispositivo.service';
import { Dispositivo } from '../../../models/dispositivo.models';


@Component({
  selector: 'app-comandar-un-dispositivo',
  templateUrl: './comandar-un-dispositivo.component.html',
  styles: []
})

  export class ComandarUnDispositivoComponent implements OnInit {

    dispositivo: Dispositivo = new Dispositivo('','',0,0,'','','','','','','');

    constructor(

    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dispositivoService: DispositivoService
    ) { 

     

    }

  ngOnInit() {

   // obtenemos la ruta cuando entramos al componente
   this.activatedRoute.params.subscribe(params =>{
    let idDispositivo = params['id'] // es xque es lo declaramos en las ruta
    this.cargarDispositivo(idDispositivo);
     
  
  });
  }
  
  /*
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
 



  */
  cargarDispositivo(id: string){

    this.dispositivoService.cargarDispositivo(id)
    .subscribe((dispositivo: any) =>{
     
     //console.log('dispositivo cargado', dispositivo);
     this.dispositivo = dispositivo.dispositivo;

     //console.log('el nombre es ', this.dispositivo.nombre);
     //console.log('el nombre es ', this.dispositivo.lugar);
    })
  
  }

}
