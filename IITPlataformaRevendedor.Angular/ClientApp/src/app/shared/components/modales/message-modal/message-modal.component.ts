import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  _contactoSoporte1 :string = '915062561 - 915062573';
  _mensajeAyuda : string = '¿Necesitas Ayuda?';
  _mensajeInformativo : string = 'Consultas y Soporte';

  _titulo: string = "";
  _arrayMensaje:string[] = [];

  constructor(
    public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.asignarData();
  }

  ngOnInit() {
  }

  asignarData() {
    if (this.data.titulo == undefined || this.data.titulo == null) {
      if (this.data.estado == true) {
        this._titulo = "CORRECTO";
      } else {
        this._titulo = "ERROR";
      }
    } else {
      this._titulo = this.data.titulo;
    }
    if (this.data.modulo == undefined || this.data.modulo == null) {
      
    }
    else {
      
    }
    if(this.data.arrayMensaje !== undefined){
      if(this.data.arrayMensaje.length > 0){
        this._arrayMensaje =  this.data.arrayMensaje;
      }
    }
  }

  public aceptar(): void {
    this.dialogRef.close(this.data.estado);
  }

  //#region Close modal
  public closeDialog() {
    this.dialogRef.close();
  }
  //#endregion Close modal

}
