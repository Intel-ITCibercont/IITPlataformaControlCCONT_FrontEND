import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { AccionAuxiliar } from '../../models/accion-auxiliar.model';


@Component({
  selector: 'app-form-header-v2',
  templateUrl: './form-header-v2.component.html',
  styleUrls: ['./form-header-v2.component.css']
})
export class FormHeaderV2Component implements OnInit {
  @Input() title = 'Aqui va el título de la cabecera';
  @Input() icon;
  @Input() dialogMode: boolean = true;
  @Input() accionesAuxiliares : AccionAuxiliar[] | undefined;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

 innerWidth : number | undefined
 @HostListener('window:resize', ['$event'])
 onResize(event) {
   this.innerWidth = window.innerWidth;
  // console.log(this.innerWidth);
 }
  

  constructor()
  { 
   
  }
  ngOnInit() {
  }
  


  //#region Funcion que permite cerrar la ventana
  public closeWindow(){
    this.closeDialog.emit(true);
    // let prueba:MatDialogRef<this.component>
  }
  //#endregion Funcion que permite cerrar la ventana

}
