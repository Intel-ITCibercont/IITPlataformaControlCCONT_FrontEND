export const cadenaEsVacia = (cadena: string): boolean => {
    if (!cadena) {
        return true;
    }
    else {
        cadena = cadena.trim();
        if (cadena === "") {
            return true;
        }
        else {
            return false;
        }
    }
}

export const vacioONullACadena = (cadena: string): string => {
    if (!cadena) {
        return "";
    }
    else {
        cadena = cadena.trim();
        if (cadena === "") {
            return "";
        }
        else {
            return cadena;
        }
    }
}

const stringEsNumero = (value: any) => isNaN(Number(value)) === false;

/**Esta funcion nos servira para obtener los arrays de los enumerados de cualquier entidad */
export const arrayEnum = (objeto: any): any[] => {

    return Object.keys(objeto)
        .filter(stringEsNumero)
        .map(key => objeto[key]);
}

export const llaveValorArray = (array: string[]): any[] => {

    let ArrayADevolver: any[] = [];

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        ArrayADevolver.push({
            llave: index,
            valor: element
        })
    }

    return ArrayADevolver;
}

/**Retornara el valor de un enumerado en formato string acorde al indice enviado
 * @param indice valor numerico del enumerado
 * @param enumerado objeto enumerado
 */
export const obtenerNombreEstado = (indice: number, enumerado: any): string => {
    let array: any[] = llaveValorArray(arrayEnum(enumerado));
    return array.find(i => i.llave == indice).valor;
}

/**Obtiene "solo los numeros" de una cadena de caracteres (para verificacion de documentos de identidad de solo numeros) */
export const filtrarSoloNumerosDeCadena = (cadena: string) => {
    let array = cadena.trim().split('');
    let nuevoArray: string[] = [];
    //console.log("array: ", array);

    array.forEach(digito => {
        if (digito == '1' || digito == '2' || digito == '3' || digito == '4' || digito == '5' || digito == '6' || digito == '7' || digito == '8' || digito == '9' || digito == '0') {
            nuevoArray.push(digito);
        }
    });
    //console.log("nuevoArray: ", nuevoArray);

    return nuevoArray.join('');
}