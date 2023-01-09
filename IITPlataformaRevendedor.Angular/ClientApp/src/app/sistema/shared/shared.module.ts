
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarAccionRapidaV2Component } from './navbar-accion-rapida-v2/navbar-accion-rapida-v2.component';
import { NavbarItemV2Component } from './navbar-item-v2/navbar-item-v2.component';
import { PanelCardComponent } from './panel-card/panel-card.component';

const componentes = [ NavbarAccionRapidaV2Component ,
                      NavbarItemV2Component,
                      PanelCardComponent ];
const pipes = [];
const directives = [ ];


@NgModule({

  declarations: [
    componentes,
    pipes,
    directives
  ],

  imports: [
    SharedModule
    ],

  exports : [
    componentes
  ],

  providers: [],
 
})
export class SharedSistemaModule { 


}
