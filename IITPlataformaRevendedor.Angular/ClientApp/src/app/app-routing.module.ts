import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';



const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule)
  },
  {
    path: 'sistema',
    loadChildren: () => import('./sistema/sistema.module').then(m => m.SistemaModule)
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
