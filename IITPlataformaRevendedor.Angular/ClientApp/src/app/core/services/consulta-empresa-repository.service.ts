import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BaseRepositoryService } from './base-repository.service';
import { environmentBE } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConsultaEmpresaRepositoryService extends BaseRepositoryService {

  

  constructor(
     http: HttpClient
   )
    {
            let enviroment = environmentBE;
            super(http , enviroment );   
    }

    

 }
