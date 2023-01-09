import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent implements OnInit {
  @Input() title = 'Aqui va el título de la cabecera';
  @Input() icon;
  @Input() dialogMode: boolean = true;

  @Input() acciones: [] | undefined;
  @Input() component: ComponentType<any> | undefined;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();


  

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
