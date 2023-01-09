import { RiskConsultingResponse } from "../models/risk-consulting.model";

export const obtenerListasDeRiesgo = (response: RiskConsultingResponse): string => {

    let cadenaADevolver = `${response.numConsulta}|`;

    if (response.listas.length > 0) {

        response.listas.forEach(lista => {
            cadenaADevolver = cadenaADevolver + lista.idTipoLista + ','
        });

    }

    return cadenaADevolver;
}