import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { EstadoDeConsulta } from 'src/app/shared/models/estado-de-consulta.model';


@Component({
  selector: 'app-share-link-modal',
  templateUrl: './share-link-modal.component.html',
  styleUrls: ['./share-link-modal.component.css']
})
export class ShareLinkModalComponent implements OnInit {

  _contactoSoporte1 :string = '915062561 - 915062573';
  _mensajeAyuda : string = '¿Necesitas Ayuda?';
  _mensajeInformativo : string = 'Consultas y Soporte';
  sharelink : string = "";
  
  constructor(
  public dialogRef: MatDialogRef<ShareLinkModalComponent>,
  public deviceDetectorService : DeviceDetectorService,
  @Inject(MAT_DIALOG_DATA) public data: EstadoDeConsulta<string>
  ) { 
      
    this. sharelink = data.valorObjeto;
  }

  ngOnInit() {
  }

  public aceptar(): void{
    this.data.mensaje.mensajeGenerado
    this.dialogRef.close(this.data.status);
  }
  closeDialog() {

    this.dialogRef.close();
  }
}
