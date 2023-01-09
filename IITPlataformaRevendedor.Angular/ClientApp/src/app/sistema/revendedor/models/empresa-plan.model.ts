


export enum Estado  {

    NoActivado = 0,
    Activado = 1
}

export class EmpresaPlan {

    codigo: string;
    codigoEmpresa: string;
    codigoPlan: string;
    estado: Estado;
    cantidadDispositivo: number;
    cantidadDispositoMaximo: number;
   
    constructor() {
       

            this.codigo = "";
            this.codigoEmpresa = "";
            this.codigoPlan = "";
            this.estado = Estado.Activado;
            this.cantidadDispositivo = 0;
            this.cantidadDispositoMaximo = 0;
      
    }

}