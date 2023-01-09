import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { PanelUsuarioComponent } from './components/panel-usuario/panel-usuario.component';



const routes: Routes = [
  
  {
    path: '',
    component : NavbarUserComponent,
    children : [

        {
          path: '',
          redirectTo: 'panel',
          pathMatch: 'full',
        },
        {
          path: 'panel',
          component: PanelUsuarioComponent
        },

    ]
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
