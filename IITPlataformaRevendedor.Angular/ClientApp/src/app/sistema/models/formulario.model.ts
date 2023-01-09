import { ModuloBase } from "./modulo-base.model";

export enum AccionParaEjecutar {

    Ruta = 0,
    CuadroDeDialogo = 1,
    Ninguno = 3,

}

export class Formulario  {
    
    nombre : string ;
    ruta : string ; 
    icon : string ; 
    usarColorPrincipal:  boolean ;
    accionParaEjecutar : AccionParaEjecutar;
    modulos : ModuloBase[];

    constructor() {

        this.nombre = "";
        this.ruta = "";
        this.icon = "";
        this.usarColorPrincipal = false;
        this.accionParaEjecutar = AccionParaEjecutar.Ninguno;
       
    }
    
}