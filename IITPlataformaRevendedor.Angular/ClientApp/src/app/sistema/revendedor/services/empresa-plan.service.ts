import { Injectable } from "@angular/core";
import { RepositoryService } from '../../../core/services/repository.service';
import { HttpParams } from '@angular/common/http';
import { EmpresaPlan } from "../models/empresa-plan.model";

@Injectable()
export class EmpresaPlanService {

  
  constructor(private repository: RepositoryService)
  {

  }

  private construirRuta(ruta: string): string {
    return `api/empresaplan/${ruta}`;
  }

  cambiarEstadoActivo(codigo : string) {
    let httpParams = new HttpParams().append('codigo',codigo);
    return this.repository.update(this.construirRuta('cambiarEstadoActivo') , null  ,httpParams);
  }

  cambiarEstadoNoActivo(codigo : string) {
    let httpParams = new HttpParams().append('codigo',codigo);
    return this.repository.update(this.construirRuta('cambiarEstadoNoActivo') , null, httpParams);
  }


  crearPlan(entidadAGuardar: EmpresaPlan) {
    return this.repository.create(this.construirRuta('CrearPlan') , entidadAGuardar);
  }

  actualizarPlan(entidadAGuardar: EmpresaPlan) {
    return this.repository.update(this.construirRuta('ActualizarPlan') , entidadAGuardar);
  }

  buscarPorCodigo(codigo: string) {

    let httpParams = new HttpParams().append('codigo',codigo);
    return this.repository.getData(this.construirRuta('buscarPorCodigo'),httpParams);
 
  }

  buscaPorCodigoEmpresaYCodigoPlan(codigoPlan: string, codigoEmpresa: string) {
   
    let httpParams = new HttpParams().append('codigoEmpresa',codigoEmpresa)
                                     .append('codigoPlan', codigoPlan);

    return this.repository.getData(this.construirRuta('buscarPorCodigoPlanYCodigoEmpresa'),httpParams);
  
  }

  reporteEmpresaPlan(fechaInferior : string , fechaSuperior : string) {
   
    let httpParams = new HttpParams().append('fechaInferior',fechaInferior)
                                     .append('fechaSuperior', fechaSuperior);

    return this.repository.getData(this.construirRuta('reporteEmpresaPlan'),httpParams);

  }

}