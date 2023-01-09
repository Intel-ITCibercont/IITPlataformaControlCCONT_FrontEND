import { Injectable } from "@angular/core";
import * as es6printJS from "print-js";
import { saveAs as importedSaveAs } from "file-saver";
import { DeviceDetectorService } from "ngx-device-detector";
import { convertirBase64toBytes } from "../../core/helpers/file.helpers";
import { generarCodigo } from "../../core/helpers/other.helpers";

@Injectable({
  providedIn: 'root'

})
export class ExportacionBaseService {

  

  constructor(private deviceService: DeviceDetectorService) {

    
  }

  public printBase(base64File: string , fileName = generarCodigo()) {

    if (this.deviceService.isDesktop()) {

      es6printJS({ printable: base64File, type: 'pdf', base64: true })
    }
    else if (this.deviceService.isMobile()) {
      // console.log('A mobile');
      const prevFrames = document.querySelectorAll('iframe[name="pdf-frame"]');
      if (prevFrames.length) {
        prevFrames.forEach((item) => item.remove());
      }
      let blob = convertirBase64toBytes(base64File, "application/pdf")

      const objectURl = URL.createObjectURL(blob);

      var pestaña = window.open(objectURl, '_blank');
      pestaña?.print();

    }
  }


  public exportEXCEL(data: any, filename: string = generarCodigo()) {

      importedSaveAs(data, filename);
  }

  public exportPDF(base64File: string, filename: string = generarCodigo()) {
 
      let blob = convertirBase64toBytes(base64File, 'application/pdf');
      importedSaveAs(blob, filename);
  }
  public exportZIP(base64File: string, filename: string = generarCodigo()) {
 
    let blob = convertirBase64toBytes(base64File, 'application/zip');
    importedSaveAs(blob, filename);  
  }
  
 

}
