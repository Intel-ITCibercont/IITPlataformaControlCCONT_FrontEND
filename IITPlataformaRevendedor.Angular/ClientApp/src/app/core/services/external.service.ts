import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, } from 'rxjs/operators';
import { PersonaExternal } from '../models/persona-external.model';
import { ConsultaEmpresaRepositoryService } from './consulta-empresa-repository.service';
import { cadenaEsVacia } from '../helpers/string.helpers';
import { EstadoDeConsulta } from 'src/app/shared/models/estado-de-consulta.model';
import { ConsultaPersonaRepositoryService } from './consulta-persona-repository.service';
import { EmpresaExternal } from '../models/empresa-external.model';



@Injectable({
    providedIn: 'root'
})
export class ExternalService {

    
    constructor(
          
        private repositoryEmpresa: ConsultaEmpresaRepositoryService,
        private repositoryPersona: ConsultaPersonaRepositoryService,

    ) {


    }
   
  
    private construirRutaBuscarEmpresa(ruc: string) {
   
        return `api/BuscarEmpresa/${ruc}`;
    }

    public buscarEmpresa(ruc: string) {

                return this.repositoryEmpresa.getData(this.construirRutaBuscarEmpresa(ruc))
                    .pipe(map((respuesta: any) => {
                       

                        let estadoDeConsulta = new EstadoDeConsulta<EmpresaExternal>();
                        
                        estadoDeConsulta.valorObjeto = respuesta.value;
                        estadoDeConsulta.valorObjeto.direccion = cadenaEsVacia( estadoDeConsulta.valorObjeto.direccion)? '-':  estadoDeConsulta.valorObjeto.direccion;
        
                        return estadoDeConsulta;
        
                }
            )
        )
    }

    private construirRutaBuscarPersona(dni: string) {

        return `api/v1/dni/${dni}`;
    }
    
    public buscarPersona(dni: string) {

        let parametros = new HttpParams().append('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNpYmVyY29udC5kYW5pZWwucnZAZ21haWwuY29tIn0.MPJdkzJ9BAbCD9LLTj4romKpkZA58C_7PjO9ALS5W9U");

        return this.repositoryPersona
            .getData(this.construirRutaBuscarPersona(dni),parametros  )
            .pipe(map(
                (respuesta: PersonaExternal) => {


                 
                    if (respuesta.apellidoPaterno) {

                     
                        let estadoDeConsulta = new EstadoDeConsulta<PersonaExternal>();
                        estadoDeConsulta.status = true;
                        estadoDeConsulta.valorObjeto = new PersonaExternal();
                        estadoDeConsulta.mensaje.mensajeGenerado = "DNI encontrado.";
                        estadoDeConsulta.valorObjeto.dni = respuesta.dni;
                        estadoDeConsulta.valorObjeto.nombresCompletos = `${respuesta.apellidoPaterno} ${respuesta.apellidoMaterno} ${respuesta.nombres}`;
                        estadoDeConsulta.valorObjeto.direccion = '-';
                       
                        return estadoDeConsulta;
                    }
                    else {

                        let estadoDeConsulta = new EstadoDeConsulta<PersonaExternal>();
                        estadoDeConsulta.status = false;
                        estadoDeConsulta.valorObjeto = new PersonaExternal();
                        estadoDeConsulta.mensaje.mensajeGenerado = "No existe el DNI especificado.";

                        return estadoDeConsulta;
                    }
                }
            )
            );
    }
   
}