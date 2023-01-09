import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DecisionModalComponent } from "src/app/shared/components/modales/decision-modal/decision-modal.component";
import { InputDecisionModalComponent } from "../components/modales/input-decision-modal/input-decision-modal.component";
import { InputModalComponent } from "../components/modales/input-modal/input-modal.component";
import { MessageModalV2Component } from "../components/modales/message-modal-v2/message-modal-v2.component";
import { MessageModalComponent } from "../components/modales/message-modal/message-modal.component";
import { PreviewPdfComponent } from "../components/preview-pdf/preview-pdf.component";
import { Mensaje } from "../models/mensaje.model";


@Injectable({
  providedIn: 'root'
})
export class SharedModalService {
  

  constructor(
    private dialog: MatDialog
  ) {

  }

  mostrarMessageModal(mensajeAMostrar: string, operacionExitosa: boolean, titulo? : string) {
    return this.dialog.open(MessageModalComponent, {
      disableClose: false,
      panelClass: 'ccont-message-dialog',
      data: {
        mensaje: mensajeAMostrar,
        estado: operacionExitosa,
        titulo: titulo,
       
      }
    })
  }

  mostrarMessageModalV2(mensajeAMostrar: Mensaje, operacionExitosa: boolean, mensajePieDialogo?: string,  titulo?: string  ) {
    return this.dialog.open(MessageModalV2Component, {
      disableClose: false,
      panelClass: 'ccont-message-dialog',
      data: {
        mensaje: mensajeAMostrar,
        estado: operacionExitosa,
        titulo: titulo,
}
    })
  }

  mostrarDecisioneModal(mensajeAMostrar: string, decisionBinaria?: boolean) {

    return this.dialog.open(DecisionModalComponent, {
      disableClose: true,
      panelClass: 'ccont-message-dialog',
      maxHeight: '10%',
      data: {
        mensaje: `${mensajeAMostrar}`,
        decisionBinaria: decisionBinaria
      }
    })
  }

  abrirPreviewPDF(base64String: string) {

    return this.dialog.open(PreviewPdfComponent, {
      disableClose: false,
      panelClass: 'myapp-no-padding-dialog',
      width: '100%',
      maxWidth: '100vw',
      minHeight: '100vh',
      height: 'auto',
      data: base64String,
    });

  }
  
  mostrarInputDecisionModal(label: string, mensaje: string, length: number) {

    return this.dialog.open(InputDecisionModalComponent, {
      disableClose: false,
      panelClass: 'myapp-no-padding-dialog',
      width :'400px',
      data: {
        label: label,
        mensaje: mensaje,
        length: length
      }
    });
  }

  mostrarInputModal(label: string, placeholder: string, length: number) {

    return this.dialog.open(InputModalComponent, {
      disableClose: false,
      panelClass: 'myapp-no-padding-dialog',
      data: {
        label: label,
        placeholder: placeholder,
        length: length
      }
    });
  }

}