import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoDeFormulario } from '../../../models/estado-de-formulario.model';

@Component({
  selector: 'app-decision-modal',
  templateUrl: './decision-modal.component.html',
  styleUrls: ['./decision-modal.component.css']
})
export class DecisionModalComponent implements OnInit {
  
    
  _contactoSoporte1 :string = '915062561 - 915062573';
  _mensajeAyuda : string = '¿Necesitas Ayuda?';
  _mensajeInformativo : string = 'Consultas y Soporte';
  
  public decision: EstadoDeFormulario = new EstadoDeFormulario();
  public decisionBinaria: boolean = false;

  constructor(public dialogRef: MatDialogRef<DecisionModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
   // console.log(this.data);
   this.asignacionDeData();
  }

  //#region Asignación de data
  public asignacionDeData(){
    this.decisionBinaria = this.data.decisionBinaria;
  }
  //#endregion Asignación de data
  public aceptar(): void{
    this.decision.status = true;
    this.dialogRef.close(this.decision);
  }
  public cancelar(): void{
    this.decision.status = false;
    this.dialogRef.close(this.decision);
  }

  //#region Close mmodal
  public closeModal(){
    this.dialogRef.close(this.decision);
  }
  //#endregion Close modal
}
