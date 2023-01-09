import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})
export class MonedaPipe implements PipeTransform {

  transform(value: string): string {
    if (value == "PEN") {
      return 'S/';
    } else if (value == "USD") {
      return '$';
    } else {
      return value.toUpperCase();
    }
  }

}
