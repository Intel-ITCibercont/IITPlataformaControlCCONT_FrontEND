export enum TipoDeUsuario { SuperUsuario = 0, Revendedor = 1 }

export class UserFront{
    
     codigo  : string;
     nombre  : string;
     permisos  : string;
     tipoDeUsuario  : TipoDeUsuario;
     correoElectronico  : string;
     validado : boolean;
     haCambiadoContrasenha : boolean;
     token  : string;

   constructor ()
    {
        this.codigo = "";
        this.nombre = "";
        this.permisos = "";
        this.tipoDeUsuario = TipoDeUsuario.Revendedor;
        this.correoElectronico = "";
        this.validado = false;
        this.haCambiadoContrasenha = false;
        this.token = "";
    }
}