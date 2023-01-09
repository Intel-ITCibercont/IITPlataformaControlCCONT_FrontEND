import { AccionParaEjecutar } from "./formulario.model";

export class AccionRapida  {

    codigo : string ;
    nombre : string ;
    ruta : string ; 
    icon : string ; 
    toolTip: string;
    accionParaEjecutar : AccionParaEjecutar;
    
    constructor() {

        this.codigo ="";
        this.nombre = "";
        this.ruta = "";
        this.icon = "";
        this.toolTip = "";
        this.accionParaEjecutar = AccionParaEjecutar.Ninguno;
    }
    
}