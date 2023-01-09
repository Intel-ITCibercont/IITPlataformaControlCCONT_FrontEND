import { Component, Inject, OnInit } from '@angular/core';
import { PDFDocumentProxy } from "ng2-pdf-viewer";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExportacionBaseService } from '../../services/exportacion-base.service';
import { base64ToArrayBuffer } from '../../functions/file.helpers';


@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css']
})
export class PreviewPdfComponent implements OnInit {

  zoomAmt: number = 0.2;
  zoomMax: number = 2;
  zoomMin: number = 0.2;
  zoom = 0.5;
  
  pageVariable = 1;
  fileName = "test-document.pdf";
  zoomScale = "page-width"; 
  pdf: PDFDocumentProxy | undefined; 
  documentDefinition: object|undefined;
  generatedPDF: any;
  
  pdfData : string;
  pdfSrc : any; 
  
  constructor(private exportacionBaseService :ExportacionBaseService,
              private dialogRef :MatDialogRef<PreviewPdfComponent>,
              @Inject(MAT_DIALOG_DATA) data ,
              ) { 
                
                this.pdfData =data;
                this.pdfSrc =  base64ToArrayBuffer(data);

              }

  ngOnInit(): void {
    
   
  }

  setZoom(type: string): void {
    
    if (type === "increment") {
      this.zoom += this.zoomAmt;
    } else if (type === "decrement") {
      this.zoom -= this.zoomAmt;
    }
  }

  download(): void {

    this.exportacionBaseService.exportPDF(this.pdfData ,this.fileName );
  }
 
  print(): void {
   
    this.exportacionBaseService.printBase(this.pdfData) ;
   
  }
 
  public closeWindow(){
    
    this.dialogRef.close();
   
  }
  
}
