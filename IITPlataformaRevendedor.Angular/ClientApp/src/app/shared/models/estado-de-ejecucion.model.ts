import { Mensaje } from "./mensaje.model";

export class EstadoDeEjecucion {

    status : boolean
    valorObjeto : any
    mensaje : Mensaje
    
     constructor() {
        
        this.status = false;
        this.valorObjeto = null;
        this.mensaje = new Mensaje();

     }
}