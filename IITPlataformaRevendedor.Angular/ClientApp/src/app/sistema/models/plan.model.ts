import { Modulo } from "./modulo.model";
import { Usuario } from '../../core/models/usuario.model';

export enum Estado {
    Activo =0,
    NoActivo = 1,

}

export class Plan {

    codigo : string ;
    nombre : string ; 
    estado : Estado;
    monto : number;
    usuario : Usuario;
    fechaDeRegistro : Date;
    listaModulos : Modulo[] ; 
  
     constructor() {
         this.codigo ="";
         this.nombre ="";
         this.monto = 0;
         this.estado = Estado.Activo;
         this.usuario = new Usuario();
         this.fechaDeRegistro = new Date();
         this.listaModulos = [];
        
     }
 
 }