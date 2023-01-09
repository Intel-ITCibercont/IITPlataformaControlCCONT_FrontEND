import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedSistemaModule } from '../shared/shared.module';
import { NavbarRevendorComponent } from './components/navbar-revendor/navbar-revendor.component';
import { RevendorRoutingModule } from './revendedor-routing.module';
import { RevendedorConfiguracionMarcaComponent } from './components/revendedor-configuracion-marca/revendedor-configuracion-marca.component';
import { EmpresaService } from './services/empresa.service';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { AsignarPlanEmpresaComponent } from './components/asignar-plan-empresa/asignar-plan-empresa.component';
import { EmpresaPlanService } from './services/empresa-plan.service';
import { PanelGestionEstadoCuentaComponent } from './components/panel-gestion-estado-cuenta/panel-gestion-estado-cuenta.component';
import { PanelGestionEmpresaComponent } from './components/panel-gestion-empresa/panel-gestion-empresa.component';
import { AngularDevExtremeModule } from '../../core/modules/devextreme-angular.module';
import { PlanService } from '../services/plan.service';
import { ReporteEmpresaComponent } from './components/reporte-empresa/reporte-empresa.component';
import { ReporteEmpresaPlanComponent } from './components/reporte-empresa-plan/reporte-empresa-plan.component';
import { ConfiguracionMarcaService } from './services/configuracion-marca.service';
import { DxProgressBarModule } from "devextreme-angular/ui/progress-bar";

const components = [NavbarRevendorComponent , 
                    PanelGestionEstadoCuentaComponent , 
                    PanelGestionEmpresaComponent ,
                    RevendedorConfiguracionMarcaComponent,
                    ReporteEmpresaComponent,
                    EmpresaComponent,
                    AsignarPlanEmpresaComponent ,
                    ReporteEmpresaPlanComponent]

@NgModule({
  
  declarations: [
    components
  ],
  imports: [SharedModule ,
            SharedSistemaModule,
            RevendorRoutingModule,
            AngularDevExtremeModule , 
            DxProgressBarModule],

  providers: [ConfiguracionMarcaService,
              EmpresaService ,
              EmpresaPlanService , PlanService],
 
})
export class RevendedorModule { 


}
