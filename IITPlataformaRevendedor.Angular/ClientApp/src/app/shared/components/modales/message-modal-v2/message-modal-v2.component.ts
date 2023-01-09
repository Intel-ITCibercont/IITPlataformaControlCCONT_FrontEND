import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mensaje } from 'src/app/shared/models/mensaje.model';


@Component({
  selector: 'app-message-modal-v2',
  templateUrl: './message-modal-v2.component.html',
  styleUrls: ['./message-modal-v2.component.css']
})
export class MessageModalV2Component implements OnInit {

  _contactoSoporte1 :string = '915062561 - 915062573';
  _mensajeAyuda : string = '¿Necesitas Ayuda?';
  _mensajeInformativo : string = 'Consultas y Soporte';

  _mensajePieDialogo : string ; 
  _titulo: string = "";
  _mensaje:Mensaje = new Mensaje();

  constructor(
    public dialogRef: MatDialogRef<MessageModalV2Component>,
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
    this._mensaje = this.data.mensaje
   
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
