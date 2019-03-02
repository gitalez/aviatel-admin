import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.models';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styles: []
})
export class HeaderAdminComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public usuarioService: UsuarioService,
    public storageService: StorageService,
    public route: Router
    ) { }

  ngOnInit() {

   
    // tengo el usuario , tengo su imagen 
    // esto lo aplico al html con el pipe Imagen 
    this.usuario = this.storageService.usuario;
    //console.log('nombre',this.usuario.nombre);
  }

  buscar(termino: string){

    this.route.navigate(['/busqueda',termino]);
    

  }
}
