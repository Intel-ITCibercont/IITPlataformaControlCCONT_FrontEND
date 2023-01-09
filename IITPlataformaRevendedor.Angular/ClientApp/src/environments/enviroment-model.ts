import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Environment {
    production : boolean;
    urlAddress : string;
    constructor() {
  
    this.production = false;
    this.urlAddress = "";
        
    }
      
  
  }