import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BaseRepositoryService } from './base-repository.service';
import { environmentBP } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConsultaPersonaRepositoryService extends BaseRepositoryService {

  

  constructor(
     http: HttpClient
   )
    {
            let enviroment = environmentBP;
            super(http , enviroment );   
    }

 }
