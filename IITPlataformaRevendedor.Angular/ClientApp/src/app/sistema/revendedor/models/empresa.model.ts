export enum Estado  {

    NoActivado = 0,
    Activado = 1
}

export class Empresa {

    codigo : string;
    ruc: string;
    razonSocial: string;
    nombreComercial: string;
    tipoDeDocumentoDeIdentidad_empresa: string;
    codigoDeUbigeo: string;
    direccionDetallada: string;
    urbanizacion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    estado?:Estado;
    codigoRevendedor : string;

    constructor() {
        
        this.codigo = "";
        this.ruc = "";
        this.razonSocial = "";
        this.nombreComercial = "";
        this.tipoDeDocumentoDeIdentidad_empresa = "6";
        this.codigoDeUbigeo = "";
        this.urbanizacion = "";
        this.departamento = "";
        this.provincia = "";
        this.distrito = "";
        this.estado =Estado.Activado;
        this.codigoRevendedor = "";
      
    }

}