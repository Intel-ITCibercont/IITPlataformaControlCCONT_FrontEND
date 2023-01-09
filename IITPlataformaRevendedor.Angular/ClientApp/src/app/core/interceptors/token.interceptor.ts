import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private localstorageService: LocalStorageService,
    private authService: AuthService,

  ) {
    // console.log("llego al interceptor");
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const request = this.addHeadersCambioFacil(req);

    return next.handle(request);
  }

  addHeadersCambioFacil = (req: HttpRequest<any>): HttpRequest<any> => {

    if (req.url.toString().includes(environment.urlAddress)) {

      // console.log("CON HEADER");
      let headers = [];

      // Leer token del localstorage
      let tokenLocalStorage = this.localstorageService.get(this.authService.obtenerKeyToken());

      headers.push({ name: 'Authorization', value: `Bearer ${tokenLocalStorage}` });

      try {
        headers.forEach(header => {
          req = this.setHeader(req, header);
        });

      } catch (e) {
        /* console.error('ocurrió un error al crear los request headers', e) */
      }
      // console.log(req);
      return req;

    }
    else {
      /* console.log('Sin header a un externo api req',req); */
      return req;
    }


  }

  private setHeader = (req: HttpRequest<any>, header: { name: string, value: string }): HttpRequest<any> => {

    if (req.headers.has(header.name)) {
      return req;
    }

    return req.clone({
      headers: req.headers.append(header.name, header.value)
    });

  }

}
