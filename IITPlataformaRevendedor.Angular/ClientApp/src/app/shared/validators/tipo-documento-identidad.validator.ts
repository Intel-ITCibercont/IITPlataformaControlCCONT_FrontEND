import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoDeDocumentoIdentidadHelper } from '../functions/tipo-documento-identidad.helpers';

// http://www2.sunat.gob.pe/pdt/pdtModulos/independientes/p695/TipoDoc.htm
export class TipoDeDocumentoIdentidadValidator {
   


    static RUC(control: AbstractControl): ValidationErrors | null {

      
        if (!control.value) {
            return null;
        }
        const value = control.value.trim();
        if (!TipoDeDocumentoIdentidadHelper.validarRUC(value)) {

            return { RUC: true };
        }
        else {
            return null
        }
    }

    static DNI(control: AbstractControl): ValidationErrors | null {


        

        if (!control.value) {
            return null;
        }

        const value = control.value.trim();

        if (!TipoDeDocumentoIdentidadHelper.validarDNI(value)) {

            return { DNI: true };
        }
        else {
            return null;
        }

      
    }
    static PAS(control: AbstractControl): ValidationErrors | null {

        if (!control.value) {
            return null;
        }
        const value = control.value.trim();
        if (!TipoDeDocumentoIdentidadHelper.validarPasaporte(value)) {

            return { pasaporte: true };
        }
        else {
            return null;
        }

    }
    static CE(control: AbstractControl): ValidationErrors | null {


        

        if (!control.value) {
            return null;
        }
        const value = control.value.trim();
        if (!TipoDeDocumentoIdentidadHelper.validarCE(value)) {

            return { carnetExtranjeria: true };
        }
        else {
            return null;
        }

    }
    static OTROS(control: AbstractControl): ValidationErrors | null {


        

        if (!control.value) {
            return null;
        }
        
        const value = control.value.trim();
     
        if (!TipoDeDocumentoIdentidadHelper.validarOtros(value)) {

            return { OtrosDocumentos: true };
        }
        else {
            return null;
        }

    }

  
}