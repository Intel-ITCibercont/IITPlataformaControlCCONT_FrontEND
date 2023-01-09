import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { InternalServerComponent } from './components/internal-server/internal-server.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { RegistrarRevendorComponent } from './components/registrar-revendor/registrar-revendor.component';
import { LoginComponent } from './components/login/login.component';

const componentes = [ChangePasswordComponent ,
                     InternalServerComponent ,
                     LayoutComponent , 
                     LoginComponent , 
                     NotFoundComponent, 
                     UnderConstructionComponent,
                     RegistrarRevendorComponent];

const pipes = [];

const directives = [];

@NgModule({
  declarations: [
    componentes ,
    pipes,
    directives,
        
  ],
  imports: [
    SharedModule,
    PagesRoutingModule

  ],
  providers: [],
 
})
export class PaginasModule { 


}
