import { Injectable } from "@angular/core";
import { RepositoryService } from '../../../core/services/repository.service';
import { ConfiguracionMarca } from "../models/configuracion-marca.model";
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ConfiguracionMarcaService {
  
  constructor(private repository: RepositoryService)
  {

  }

  private construirRuta(ruta: string): string {
    return `api/configuracionmarca/${ruta}`;
  }

  buscarPorRevendedor(codigoUsuario: string) {
    console.log('codigoUsuario',codigoUsuario);
    let httpParams = new HttpParams().append('codigoUsuario',codigoUsuario);

    return this.repository.getData(this.construirRuta('buscarPorRevendedor'),httpParams);
  }

  guardarCambios(entidadAGuardar: ConfiguracionMarca) {
    return this.repository.create(this.construirRuta('GuardarCambios') , entidadAGuardar);
  }
  

}