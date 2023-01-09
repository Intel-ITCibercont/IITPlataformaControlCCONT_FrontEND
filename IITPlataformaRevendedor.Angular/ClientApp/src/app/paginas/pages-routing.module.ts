import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { PagesGuard } from '../core/guards/pages.guard';
import { RegistrarRevendorComponent } from './components/registrar-revendor/registrar-revendor.component';
import { LoginComponent } from './components/login/login.component';
import { InternalServerComponent } from './components/internal-server/internal-server.component';


const routes: Routes = [ 
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
     /*  {
        path: 'home',
        loadChildren: () => import('../Pages/portada-page/portada.module').then(m => m.PortadaModule)
      }, */
    /*   {
        path: 'contacto',
        loadChildren: () => import('../Pages/contact-page/contact.module').then(m => m.ContactModule)
      }, */
      {
        path: 'login',
        canActivate : [PagesGuard],
        component: LoginComponent
      },
      {
        path: 'registrar-revendedor',
        component: RegistrarRevendorComponent
      },
           { 
        path: 'under-construction',
        component: UnderConstructionComponent
      },
      { 
        path: '404',
        component: NotFoundComponent
      },
      { 
        path: '500',
        component: InternalServerComponent
      },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
