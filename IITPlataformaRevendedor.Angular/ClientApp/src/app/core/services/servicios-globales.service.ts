import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
@Injectable({
    providedIn: 'root'
  })
export class ServiciosGlobalesService {

   

    constructor(private localStorageService :LocalStorageService) {
     


    }


}
    
  
