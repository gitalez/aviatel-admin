import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



import { 
  SettingsService, 
  SidebarService,
  UsuarioService,
  StorageService,
  LoginGuard,
  AdminGuard,
  VerificaTokenGuard,
  WebsocketService,
  ChatService,
  DispositivoService,
  RecuperarPassService
} from './service.index';



@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    HttpClientModule
  ],
  
providers: [
  SettingsService,
  SidebarService,
  UsuarioService,
  StorageService,
  LoginGuard,
  AdminGuard,
  VerificaTokenGuard,
  ModalUploadService,
  WebsocketService,
  ChatService,
  DispositivoService,
  RecuperarPassService
  
]

})
export class ServiceModule { }
