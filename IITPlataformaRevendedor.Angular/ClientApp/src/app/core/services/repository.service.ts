import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryService } from './base-repository.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends BaseRepositoryService {

    constructor(
      http: HttpClient
    ) {

      let enviroment = environment;
      super(http , enviroment);
    }
  }
