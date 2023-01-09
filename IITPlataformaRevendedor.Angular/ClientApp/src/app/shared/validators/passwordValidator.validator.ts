import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidator {

    static verificarPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('contrasenhaNueva').value;
        let confirmPass = group.get('contrasenhaNuevaConfirmacion').value
        return pass === confirmPass ? null : { notSame: true }
    }

    // static Son(control: AbstractControl): ValidationErrors | null {

    //      const value = control.value;

    //      if (!value) {
    //          return null;
    //      }

    //      if (Number.parseFloat(value) == Number.parseInt(value) && !isNaN(value)) {
    //          return null;
    //      } else {
    //          return { EsEntero: true }
    //      }
    //  }

    //  static soloNumber(control: AbstractControl): ValidationErrors | null {

    //      const value = control.value;
    //      // console.log('en solo number', control);

    //      if (!value) {
    //          return null;
    //      }

    //      if(esNumero(value)){
    //          return { soloNumber: true}
    //      }
    //      else{
    //          return null
    //      }
    //  }


}
