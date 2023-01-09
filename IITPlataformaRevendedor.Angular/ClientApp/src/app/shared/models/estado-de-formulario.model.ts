import { Mensaje } from "./mensaje.model"

export class EstadoDeFormulario {

   status: boolean;
   mensaje: Mensaje;

   constructor() {
      this.status = false;
      this.mensaje = new Mensaje();
   }

}