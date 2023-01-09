import { Mensaje } from "./mensaje.model"

export class EstadoDeConsulta<T> {

   status: boolean;
   valorObjeto: T;
   mensaje: Mensaje;

   constructor() {
      this.status = false;
      this.valorObjeto = null!;
      this.mensaje = new Mensaje();
   }

}