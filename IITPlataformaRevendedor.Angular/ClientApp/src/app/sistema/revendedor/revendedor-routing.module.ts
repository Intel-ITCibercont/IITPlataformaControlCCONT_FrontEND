import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { NavbarRevendorComponent } from './components/navbar-revendor/navbar-revendor.component';
import { PanelGestionEmpresaComponent } from './components/panel-gestion-empresa/panel-gestion-empresa.component';
import { PanelGestionEstadoCuentaComponent } from './components/panel-gestion-estado-cuenta/panel-gestion-estado-cuenta.component';
import { ReporteEmpresaPlanComponent } from './components/reporte-empresa-plan/reporte-empresa-plan.component';
import { ReporteEmpresaComponent } from './components/reporte-empresa/reporte-empresa.component';


const routes: Routes = [
  
  {
    path: '',
    component : NavbarRevendorComponent,
    children : [

        {
          path: '',
          redirectTo: 'panel-gestion-empresa',
          pathMatch: 'full',
        },

        {
          path: 'plan-empresa',
          component: EmpresaComponent
        },
        {
          path: 'panel-gestion-empresa',
          component: PanelGestionEmpresaComponent
        },
        {
          path: 'panel-gestion-estado-cuenta',
          component: PanelGestionEstadoCuentaComponent
        },
        {
          path: 'reporte-empresa',
          component: ReporteEmpresaComponent
        },

        {
          path: 'reporte-empresa-plan',
          component: ReporteEmpresaPlanComponent
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevendorRoutingModule { }
