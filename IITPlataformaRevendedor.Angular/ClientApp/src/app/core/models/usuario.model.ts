
export class Usuario  {

     codigo:string ;
     nombre:string ;
     permisos:string ;
     tipoDeUsuario:string ;
     correoElectronico:string ;
     validado:boolean ;
     haCambiadoContrasenha:boolean ;
    
     constructor() {

        this.codigo = "";
        this.nombre = "";
        this.permisos = "";
        this.tipoDeUsuario = "";
        this.correoElectronico = "";
        this.validado = false;
        this.haCambiadoContrasenha =false;
        
     }
        
}