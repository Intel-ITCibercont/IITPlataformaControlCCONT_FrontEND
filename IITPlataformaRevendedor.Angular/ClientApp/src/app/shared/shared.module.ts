import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularMaterialModule } from '../core/modules/angular-material.module';
import { FormHeaderV2Component } from './components/form-header-v2/form-header-v2.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { ListSharebuttonsComponent } from './components/list-share-buttons/list-share-buttons.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuSharedbuttonsComponent } from './components/menu-sharedbuttons/menu-sharedbuttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { CustomDecimalPipe } from './pipes/custom-decimal.pipe';
import { MonedaPipe } from './pipes/moneda.pipe';
import { PorcentajeInputComponent } from './components/custom-control/porcentaje-input/porcentaje-input.component';
import { PorcentajeOpcionesInputComponent } from './components/custom-control/porcentaje-opciones-input/porcentaje-opciones-input.component';
import { SeleccionButtonComponent } from './components/custom-control/seleccion-button/seleccion-button.component';
import { SeleccionRapidaInputComponent } from './components/custom-control/seleccion-rapida-input/seleccion-rapida-input.component';
import { SerieNumeroInputComponent } from './components/custom-control/serie-numero-input/serie-numero-input.component';
import { DecimalFormatterDirective } from './directives/decimal-format.directive';
import { NumberTypeDirective } from './directives/number.directive';
import { DecisionModalComponent } from './components/modales/decision-modal/decision-modal.component';
import { InputDecisionModalComponent } from './components/modales/input-decision-modal/input-decision-modal.component';
import { InputModalComponent } from './components/modales/input-modal/input-modal.component';
import { MessageModalComponent } from './components/modales/message-modal/message-modal.component';
import { MessageModalV2Component } from './components/modales/message-modal-v2/message-modal-v2.component';
import { ShareLinkModalComponent } from './components/modales/share-link-modal/share-link-modal.component';
import { SoporteFooterComponent } from './components/soporte-footer/soporte-footer.component';
import { PreviewPdfComponent } from './components/preview-pdf/preview-pdf.component';
import { AlertaComponent } from './components/alerta/alerta.component';
import { CargandoComponent } from './components/cargando/cargando.component';

const componentes = [ FormHeaderComponent ,
                      FormHeaderV2Component,                      
                      ListSharebuttonsComponent,
                      LoadingComponent ,
                      MenuSharedbuttonsComponent,
                      PorcentajeInputComponent,
                      PorcentajeOpcionesInputComponent,
                      SeleccionButtonComponent,
                      SeleccionRapidaInputComponent,
                      SerieNumeroInputComponent,
                      DecisionModalComponent,
                      InputDecisionModalComponent,
                      InputModalComponent,
                      MessageModalComponent,
                      MessageModalV2Component,
                      ShareLinkModalComponent,
                      SoporteFooterComponent,
                      PreviewPdfComponent ,
                      CargandoComponent,
                      AlertaComponent
                      
                    ];



const pipes = [
                CustomDecimalPipe, 
                MonedaPipe 
              ];



const directives = [DecimalFormatterDirective,
                    NumberTypeDirective
                  ];


@NgModule({

  declarations: [
    componentes,
    pipes,
    directives
  ],

  imports: [
    
    
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    ShareButtonsModule,
    ShareButtonModule,
    ShareIconsModule,
    PdfViewerModule,
    
    
    ],

  exports : [
    componentes,
    pipes,
    directives,
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule

  ],

  providers: [

  ],
 
})
export class SharedModule { 


}
