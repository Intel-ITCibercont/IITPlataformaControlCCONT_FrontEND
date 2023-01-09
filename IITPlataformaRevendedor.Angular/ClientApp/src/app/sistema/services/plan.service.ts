import { Injectable } from "@angular/core";
import { RepositoryService } from "src/app/core/services/repository.service";
import { Plan } from "../models/plan.model";

@Injectable()
export class PlanService {
  

  

  constructor(private repository: RepositoryService)
  {

  }

  private construirRuta(ruta: string): string {
    return `api/plan/${ruta}`;
  }

  listarActivo() {
 
    return this.repository.getData(this.construirRuta('listarActivo'));
  }

  guardarCambios(entidadAGuardar: Plan) {

    return this.repository.create(this.construirRuta('GuardarCambios') , entidadAGuardar);
  }
  

}