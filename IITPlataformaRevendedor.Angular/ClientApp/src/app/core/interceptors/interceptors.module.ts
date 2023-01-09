import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ExpiracionTokenInterceptor } from "./expiracion-token.interceptor";
import { TokenInterceptor } from "./token.interceptor";

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },

        {
            provide: HTTP_INTERCEPTORS,
            useClass: ExpiracionTokenInterceptor,
            multi: true,
        },
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: HttpResponseInterceptor,
        //   multi: true
        // }
    ]
})
export class InteceptorsModule { }
