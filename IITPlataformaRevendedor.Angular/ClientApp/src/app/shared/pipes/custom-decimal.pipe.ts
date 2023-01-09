import { Pipe, PipeTransform } from "@angular/core";
const PADDING = "000000";
@Pipe({ name: "CustomDecimalPipe" })
export class CustomDecimalPipe implements PipeTransform {

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;

  constructor() {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR = ".";
    this.THOUSANDS_SEPARATOR = ",";
  }

  transform(value: number | string, fractionSize: number = 3): string | undefined {

  


      let [integer, fraction = ""] = (value || "").toString()
        .split(this.DECIMAL_SEPARATOR);

      //  console.log(integer);
      //  console.log(fraction);

      if (fractionSize > 0) {

        fraction = this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
        // console.log(fraction);
      }



      //integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

      return integer + fraction;
   

  }

  parse(value: string, fractionSize: number = 3): string {
    let [integer, fraction = ""] = (value || "").split(this.DECIMAL_SEPARATOR);

    //integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    return integer + fraction;
  }

}