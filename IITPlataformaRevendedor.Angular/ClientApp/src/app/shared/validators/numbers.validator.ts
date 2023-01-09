
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { esNumero } from '../../core/helpers/number.helpers';

export class NumberValidator {

    static soloNumeroEntero: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const valor = control.value;

        if (!valor) {
            return null;
        }

        return !esNumero(valor) ? { esNumero: true } : null;

    }

}