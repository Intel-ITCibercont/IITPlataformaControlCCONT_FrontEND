
import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { EstadoDeDecision } from 'src/app/shared/models/estado-de-decision.model';


@Component({
  selector: 'app-input-decision-modal.component',
  templateUrl: './input-decision-modal.component.html',
  styleUrls: ['./input-decision-modal.component.css']
})
export class InputDecisionModalComponent implements OnInit  , AfterViewInit{

    
  _contactoSoporte1 :string = '915062561 - 915062573';
  _mensajeAyuda : string = '¿Necesitas Ayuda?';
  _mensajeInformativo : string = 'Consultas y Soporte';
  
  public resultadoDeDecision: EstadoDeDecision = new EstadoDeDecision();
  @ViewChild("inputMotivo") inputMotivo: ElementRef;
  motivoDeDecision : FormControl = new FormControl('ERROR EN LA TOMA DE PEDIDO' , [Validators.required]);
  constructor(public dialogRef: MatDialogRef<InputDecisionModalComponent>,
              private dialog : MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngAfterViewInit(): void {
    
    setTimeout(() => {
      
      this.inputMotivo.nativeElement.select();
      
    }, 400);

  }

  ngOnInit() {
  

  }
  public aceptar(): void{

    this.resultadoDeDecision.status = true;
    if (this.motivoDeDecision.valid) {

      this.resultadoDeDecision.valor = this.motivoDeDecision.value?this.motivoDeDecision.value:"" ;
      this.close();
    }
    else {

       this.dialog.open(MessageModalComponent, {
        disableClose: false,
        panelClass: 'ccont-message-dialog',
        data: {
          mensaje: "Formulario invalido, verifique los campos marcados en rojo.",
          estado: false
          
        }
      });

    }
  }


  //#region Close mmodal
  public closeModal(){

    this.close();

  }

  close() {

    this.dialogRef.close(this.resultadoDeDecision);


  }
  //#endregion Close modal
}
