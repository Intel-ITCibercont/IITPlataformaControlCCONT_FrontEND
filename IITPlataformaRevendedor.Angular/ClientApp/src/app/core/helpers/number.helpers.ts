// Pasa el número a letras '10' => 'DIEZ'. Se debe enviar el número en tipo de dato cadena.
export const pasarNumeroALetras = (numeroEnString: string): string => {
    let res, dec: string = "";
    let entero: number;
    let decimales: number;
    let nro: number;

    try {
        nro = parseFloat(numeroEnString);
    }
    catch
    {

        return "";
    }

    entero = Math.floor(nro);
    decimales = Math.round((nro - entero) * 100);
    if (decimales > 0) {
        dec = " CON " + decimales.toString() + "/100";
    }
    else {
        dec = " CON " + "00/100";
    }

    res = numeroALetras(entero) + dec;
    return res;
}
//función que pasa a letras la parte entera de un número es usado por la función 'pasarNumeroALetras'
const numeroALetras = (numeroAConvertir: number): string => {
    ////console.log('numero a convertir', numeroAConvertir);
    let Num2Text: string = "";
    numeroAConvertir = Math.floor(numeroAConvertir);

    if (numeroAConvertir == 0) Num2Text = "CERO";
    else if (numeroAConvertir == 1) Num2Text = "UNO";

    else if (numeroAConvertir == 2) Num2Text = "DOS";
    else if (numeroAConvertir == 3) Num2Text = "TRES";
    else if (numeroAConvertir == 4) Num2Text = "CUATRO";
    else if (numeroAConvertir == 5) Num2Text = "CINCO";
    else if (numeroAConvertir == 6) Num2Text = "SEIS";
    else if (numeroAConvertir == 7) Num2Text = "SIETE";
    else if (numeroAConvertir == 8) Num2Text = "OCHO";
    else if (numeroAConvertir == 9) Num2Text = "NUEVE";
    else if (numeroAConvertir == 10) Num2Text = "DIEZ";
    else if (numeroAConvertir == 11) Num2Text = "ONCE";
    else if (numeroAConvertir == 12) Num2Text = "DOCE";
    else if (numeroAConvertir == 13) Num2Text = "TRECE";
    else if (numeroAConvertir == 14) Num2Text = "CATORCE";
    else if (numeroAConvertir == 15) Num2Text = "QUINCE";
    else if (numeroAConvertir < 20) Num2Text = "DIECI" + numeroALetras(numeroAConvertir - 10);
    else if (numeroAConvertir == 20) Num2Text = "VEINTE";
    else if (numeroAConvertir < 30) Num2Text = "VEINTI" + numeroALetras(numeroAConvertir - 20);
    else if (numeroAConvertir == 30) Num2Text = "TREINTA";
    else if (numeroAConvertir == 40) Num2Text = "CUARENTA";
    else if (numeroAConvertir == 50) Num2Text = "CINCUENTA";
    else if (numeroAConvertir == 60) Num2Text = "SESENTA";
    else if (numeroAConvertir == 70) Num2Text = "SETENTA";
    else if (numeroAConvertir == 80) Num2Text = "OCHENTA";
    else if (numeroAConvertir == 90) Num2Text = "NOVENTA";

    else if (numeroAConvertir < 100) Num2Text = numeroALetras(Math.floor(numeroAConvertir / 10) * 10) + " Y " + numeroALetras(numeroAConvertir % 10);
    else if (numeroAConvertir == 100) Num2Text = "CIEN";
    else if (numeroAConvertir < 200) Num2Text = "CIENTO " + numeroALetras(numeroAConvertir - 100);
    else if ((numeroAConvertir == 200) || (numeroAConvertir == 300) || (numeroAConvertir == 400) || (numeroAConvertir == 600) || (numeroAConvertir == 800)) Num2Text = numeroALetras(Math.floor(numeroAConvertir / 100)) + "CIENTOS";

    else if (numeroAConvertir == 500) Num2Text = "QUINIENTOS";
    else if (numeroAConvertir == 700) Num2Text = "SETECIENTOS";
    else if (numeroAConvertir == 900) Num2Text = "NOVECIENTOS";
    else if (numeroAConvertir < 1000) Num2Text = numeroALetras(Math.floor(numeroAConvertir / 100) * 100) + " " + numeroALetras(numeroAConvertir % 100);
    else if (numeroAConvertir == 1000) Num2Text = "MIL";
    else if (numeroAConvertir < 2000) Num2Text = "MIL " + numeroALetras(numeroAConvertir % 1000);
    else if (numeroAConvertir < 1000000) {
        Num2Text = numeroALetras(Math.floor(numeroAConvertir / 1000)) + " MIL";
        if ((numeroAConvertir % 1000) > 0) Num2Text = Num2Text + " " + numeroALetras(numeroAConvertir % 1000);
    }

    else if (numeroAConvertir == 1000000) Num2Text = "UN MILLON";
    else if (numeroAConvertir < 2000000) Num2Text = "UN MILLON " + numeroALetras(numeroAConvertir % 1000000);
    else if (numeroAConvertir < 1000000000000) {
        Num2Text = numeroALetras(Math.floor(numeroAConvertir / 1000000)) + " MILLONES ";
        if ((numeroAConvertir - Math.floor(numeroAConvertir / 1000000) * 1000000) > 0) Num2Text = Num2Text + " " + numeroALetras(numeroAConvertir - Math.floor(numeroAConvertir / 1000000) * 1000000);
    }
    else if (numeroAConvertir == 1000000000000) Num2Text = "UN BILLON";
    else if (numeroAConvertir < 2000000000000) Num2Text = "UN BILLON " + numeroALetras(numeroAConvertir - Math.floor(numeroAConvertir / 1000000000000) * 1000000000000);
    else {
        Num2Text = numeroALetras(Math.floor(numeroAConvertir / 1000000000000)) + " BILLONES";
        if ((numeroAConvertir - Math.floor(numeroAConvertir / 1000000000000) * 1000000000000) > 0) Num2Text = Num2Text + " " + numeroALetras(numeroAConvertir - Math.floor(numeroAConvertir / 1000000000000) * 1000000000000);
    }

    return Num2Text;
}

export const controlAFloat = (valor: any): number => {
    // console.log('en helpers', valor)
    try {
        // console.log('en el try')
        return Number.parseFloat(valor);
    } catch {
        // console.log('entra al catch');
        return 0;
    }
}

export const numeroConFormato = (valor: any, precision: number = 2) => {
    try {
        return Number.parseFloat(valor.toString()).toFixed(precision);
    } catch (error) {
        return Number.parseFloat(('0')).toFixed(precision);
    }
}

/**
 * Verifica si un numero es entero positivo (sirve basicamente para verificar numeros de documento que solo tengan numeros) 
 * - Para que funciona optimamente de preferencia enviar especificamente una cadena como parametro
 * */
export const esNumero = (cadena: string) => {
    // console.log("cadena: ", cadena);
    let valorADevolver: boolean = true;

    let array = cadena.trim().split('');
    //console.log("array: ", array);

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element == '1' || element == '2' || element == '3' || element == '4' || element == '5' || element == '6' || element == '7' || element == '8' || element == '9' || element == '0') {
            //console.log("numero: ", element);
        } else {
            //console.log("NO numero: ", element);
            valorADevolver = false;
            break;
        }
    }

    return valorADevolver;
}