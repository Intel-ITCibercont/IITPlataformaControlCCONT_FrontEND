import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { SubSink } from "subsink";
import { AuthService } from "../services/auth.service";
import { tap } from 'rxjs/operators';
import { cadenaEsVacia } from "../helpers/string.helpers";
import { UserFront } from "../models/user-front.model";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class ExpiracionTokenInterceptor implements HttpInterceptor {

    subs: SubSink = new SubSink();

    token: string = "";
    helper: JwtHelperService | undefined;

    decodedToken: any;
    expirationDate: Date|undefined;
    isExpired: boolean|undefined;

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
    ) {
        this.subs.add(
            this.authService.usuarioChanged$
                .subscribe((usuario: UserFront) => {
                    // console.log("USUARIO CAMBIO EXPIRATION: ", usuario);
                    this.helper = new JwtHelperService();
                    this.token = usuario.token;
                })
        )
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("INTERCEPTOR EXPIRATION");
        request = request.clone();
        
        return next.handle(request).pipe(
            tap(req => {
                // this.decodedToken = this.helper.decodeToken(this.token);
                // this.expirationDate = this.helper.getTokenExpirationDate(this.token);
                this.isExpired = this.helper?.isTokenExpired(this.token);

                if (!cadenaEsVacia(this.token)) {
                    if (this.isExpired) {
                        this.openSnackBar();
                        setTimeout(() => {
                            this.authService.logout();
                        }, 3000);
                    }
                }
            })
        );
    }


    openSnackBar() {
        this.snackBar.open('Sesión expirada, Inicie sesión nuevamente', 'Aceptar', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
        }).onAction().subscribe(action => {
            // this.authService.logout();
        });
    }
    closeSnackBar() {
        this.snackBar.dismiss();
    }

}
