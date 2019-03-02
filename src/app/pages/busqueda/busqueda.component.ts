import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient, HttpHeaders} from '@angular/common/http'; // hay que proveerlo en el service.module como un httpClientModule
import { StorageService } from '../../services/storage/storage.service';
import { Usuario } from '../../models/usuario.models';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];

  hayUsuario: boolean = false;



  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public storageservice: StorageService
    ) { 

    activatedRoute.params
    .subscribe(params =>{

      let termino = params['termino']; // 'termino' es lo que esta declarado en el routing
      //console.log(termino);
      this.buscar(termino);
    })
  }

  ngOnInit() {
  }

  // no creamos un servicio , lo hacemos desde aqui 

  buscar(termino: string){


    let url = URL_SERVICIOS + "/busquedas/todo/" + termino;

    let encabezado = new HttpHeaders({

      "content-Type": "application/json",
      "Authorization": this.storageservice.token
    });

    return this.http
      .get(url, { headers: encabezado })
      .subscribe((resp: any) =>{
        console.log(resp);
 
        //console.log(resp.usuarios.length);
        if (resp.usuarios.length === 0){
          this.hayUsuario = false;
        }else{
          this.usuarios = resp.usuarios;
          this.hayUsuario = true;
       
        }

      })

  }
}
