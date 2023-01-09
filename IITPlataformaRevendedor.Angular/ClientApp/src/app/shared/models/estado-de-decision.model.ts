import { Mensaje } from "./mensaje.model"

export class EstadoDeDecision {

    status : boolean;
    valor : any;
    mensaje : Mensaje;
    
     constructor() {
        
        this.status = false;
        this.valor = null;
        this.mensaje = new Mensaje();

     }
}