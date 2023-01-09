import { AccionRapida } from "./accion-rapida.model";
import { Grupo } from "./grupo.model";
import { ModuloBase } from "./modulo-base.model";



export class Modulo {

    codigo : string ;
    nombre : string ;
    listaAccesosRapidas?: AccionRapida[];
    listaDeGrupos: Grupo[];
    moduloBase? :ModuloBase ;
    ruta : string;
    icon :string;
   
    constructor() {

        this.codigo ="";
        this.nombre ="";
        this.listaAccesosRapidas = [];
        this.listaDeGrupos =[];
        this.moduloBase = ModuloBase.Ninguno;
        this.ruta = "";
        this.icon ="";
       
    }
}

