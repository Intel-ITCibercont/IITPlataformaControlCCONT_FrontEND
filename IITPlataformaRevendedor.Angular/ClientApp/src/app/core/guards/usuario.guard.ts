import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { TipoDeUsuario, UserFront } from '../models/user-front.model';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, CanActivateChild, CanLoad {

    subs: SubSink = new SubSink();
    _estaLogeado: boolean;

    constructor(
        private authService: AuthService,
        private router: Router,
        
        private route: ActivatedRoute,
    ) {
     
        this.subs.add(
            this.authService.estaLogeadoChanged$
                .subscribe((estaLogeado: boolean) => {
                   
                    this._estaLogeado = estaLogeado ;
                }));

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          
            return new Promise((resolve) => {
                if (!this._estaLogeado) {

                  this.router.navigate(['/login']);
                  resolve(false);
                } else {
                  
                  resolve(true);
                }
              });
    }

    canActivateChild(
        
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }
}
