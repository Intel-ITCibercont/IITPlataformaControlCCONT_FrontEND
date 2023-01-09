import { Component, Input, OnInit } from '@angular/core';
import { Formulario } from '../../models/formulario.model';

@Component({
  selector: 'app-panel-card',
  templateUrl: './panel-card.component.html',
  styleUrls: ['./panel-card.component.css']
})
export class PanelCardComponent implements OnInit {

  @Input() card: Formulario;
  @Input() colorPrincipalDelGrupo: boolean;
  @Input() usarColorDeItem: boolean;

  usarColorPrincipal : boolean ; 
  constructor() {
     
   

   }

  ngOnInit(): void {

    this.usarColorPrincipal =  this.usarColorDeItem? this.card.usarColorPrincipal : this.colorPrincipalDelGrupo; 

  }

}
