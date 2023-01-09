import { EnumKeyPair } from "../models/enum-key-pair.model";


/**Enumerable para poder trabajar con los detalles de pedido, precuenta, almacen, compra, planilla,etc */
export enum AtributoDetalle {
    Cantidad = 0,
    PrecioUnitario = 1,
    DescuentoUnitario = 2,
    PorcentajeDeDescuento = 3,
    PrecioTotal = 4,
    Peso = 5,
    Ingreso = 6,
    Descuento = 7,
    Neto = 8,
}

export enum ModoRegistroPerfil {
    Inicial = 0,
    Nuevo = 1,
}

export function getValueByKey(enumerable: any, key: any): string {

    let value: string = "";
    console.log(Object.entries(enumerable));

    Object.entries(enumerable).forEach((x: any[]) => {
        if (x[0] == key) {
            value = x[1] as string;
        }
    });

    return value;
}

export function getEnumKeyPairArray(enumerable: any): EnumKeyPair[] {

    let enumKeyPairArray: EnumKeyPair[] = [];

    Object.entries(enumerable).forEach((x: any[]) => {

        if (!isNaN(Number(x[0]))) {
            enumKeyPairArray.push(new EnumKeyPair(x[0], x[1]))
        }
    });

    return enumKeyPairArray;
}

// export function convertirStringAEnum(enumerable: any): EnumKeyPair[]




