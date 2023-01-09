import { Formulario } from './formulario.model';
export class Grupo {

    nombreGrupo : string ;
    listaFormularios : Formulario[] ;
    usarColorPrincipal : boolean;

    constructor() {
     
        this.nombreGrupo = "";
        this.listaFormularios = [];
        this.usarColorPrincipal = false;
    }
}