import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CryptoService } from './crypto.service';
import { SubSink } from 'subsink';
import {  UserFront } from '../models/user-front.model';
import { RevendedorUser } from '../models/revendedor.model';
import { RepositoryService } from './repository.service';



@Injectable({
  providedIn: 'root'
})
export class RevendedorService {

  subs: SubSink = new SubSink;

  private _usuarioActual: UserFront = new UserFront();
  private usuarioSubject$ = new BehaviorSubject<UserFront>(this._usuarioActual);
  public usuarioChanged$ = this.usuarioSubject$.asObservable();

  private estaLogeado$ = new BehaviorSubject<boolean>(false);
  public estaLogeadoChanged$ = this.estaLogeado$.asObservable();
  
  

  constructor(
    private repository: RepositoryService,
    private cryptoService: CryptoService
  ) {
    
  }

  private construirRuta(ruta: string): string {
    return `api/revendedoruser/${ruta}`;
  }

  public registrar(revendedorUser: RevendedorUser) {
    revendedorUser = { ...revendedorUser, password: this.cryptoService.encriptarParaBack(revendedorUser.password) };
  
    return this.repository.create(this.construirRuta('registrar'), revendedorUser);
  }
}
