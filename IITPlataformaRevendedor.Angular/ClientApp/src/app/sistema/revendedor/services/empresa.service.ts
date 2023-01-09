import { Injectable } from "@angular/core";
import { RepositoryService } from '../../../core/services/repository.service';
import { HttpParams } from '@angular/common/http';
import { Empresa } from '../models/empresa.model';

@Injectable()
export class EmpresaService {
 

  
  constructor(private repository: RepositoryService)
  {

  }

  private construirRuta(ruta: string): string {
    return `api/empresa/${ruta}`;
  }

  quitarConexion(codigo: string) {
    let httpParams = new HttpParams().append('codigo',codigo);
    return this.repository.update(this.construirRuta('quitarConexion') , null ,httpParams);
  }

  activarConexion(codigo: string) {
    let httpParams = new HttpParams().append('codigo',codigo);
    return this.repository.update(this.construirRuta('activarConexion') , null , httpParams);
  }


  crear(entidadAGuardar: Empresa) {
    return this.repository.create(this.construirRuta('Crear') , entidadAGuardar);
  }

  modificar(entidadAGuardar: Empresa) {
    
    return this.repository.create(this.construirRuta('Modificar') , entidadAGuardar);
  }


  buscarPorCodigo(codigo: string) {

    let httpParams = new HttpParams().append('codigo',codigo);
    return this.repository.getData(this.construirRuta('buscarPorCodigo'),httpParams);
 
  }

  reporteEntidad(fechaInferior: string , fechaSuperior : string ) {

    let httpParams = new HttpParams().append('fechaInferior',fechaInferior)
                                      .append('fechaSuperior',fechaSuperior);
    

    return this.repository.getData(this.construirRuta('reporteEntidad'),httpParams);
 
  }
  
  

}