import { Usuario } from './usuario.models';
export class Dispositivo {

    constructor(
  
      public nombre: string,
      public tipo: string,
      public lat: number,
      public lng: number,
      public ssid: string,
      public passwordRouter: string,
      public mac: string,
      public estado: string,
      public hogar: string,
      public sector: string,
      public lugar: string,
      public descripcion?: string,
      public esVerdadero?: boolean,
      public creadoEl?: Date,
      public usuario?:Usuario,
      public correo?:string,
      public _id?:string,
      public imagen?:string,
      public sala?:string,
      public idsocket?:string,
      public estado_posible?:string,
      public progreso?:number,
      public cortesia?:string,
      public fotocel?:string,
      public canal1?:string,
      public canal2?:string,
      public canal3?:string
    ) {}
  }
