import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/service.index';
import { StorageService } from '../../services/storage/storage.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styles: []
})
export class SidebarAdminComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public sidebarService: SidebarService,
    public usuarioService: UsuarioService,
    public storageService: StorageService) { }

  ngOnInit() {

     // tengo el usuario , tengo su imagen 
    // esto lo aplico al html con el pipe Imagen 
    this.usuario = this.storageService.usuario;
    this.sidebarService.cargarMenu();
  }

}
