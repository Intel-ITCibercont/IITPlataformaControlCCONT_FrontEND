export enum  Estado { Activo = 0, 
                      NoActivo = 1 
                    }

export class RevendedorUser {

    numeroDocumento : string;
    razonSocial : string;
    nombreComercial : string;
    correoelectronico : string;
    telefonoDeContacto : string;
    estado : Estado;
    password : string ;

    constructor() {
       
        this.numeroDocumento = "";
        this.razonSocial = "";
        this.nombreComercial = "";
        this.correoelectronico = "";
        this.telefonoDeContacto = "";
        this.estado = Estado.Activo;
        this.password = "";
    }
}