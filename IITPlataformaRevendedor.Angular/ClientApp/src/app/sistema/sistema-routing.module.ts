import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { UsuarioGuard } from '../core/guards/usuario.guard';



const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'revendor',
    pathMatch: 'full',
  },
  {
    path: 'revendor',
    canActivate : [UsuarioGuard],
    loadChildren: () => import('./revendedor/revendedor.module').then(m => m.RevendedorModule)
  },
  {
    path: 'user',
    canActivate : [UsuarioGuard],
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },
  // el orden de las rutas es importante,
  // si algo no matchea una ruta no seguira a la siguiente, por lo que el notfound deberia ser la ultima ruta, siempre */
  { 
    path: '**', 
    pathMatch: 'full', 
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
