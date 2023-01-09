import { esNumero } from "./number.helpers";
import { cadenaEsVacia } from './string.helpers';


export class TipoDeDocumentoIdentidadHelper {

    static validarDNI(value : string) : boolean{

        if (!cadenaEsVacia(value)){


        }
        
        const isNumber = esNumero(value);
        const length = value.length == 8 ? true : false;
        const dniValid = isNumber && length;
    
        return  dniValid;
    }

    static validarRUC(value : string) : boolean{

        if (!cadenaEsVacia(value)){

            let validacionLogicaRUC = true;
            const isNumber = esNumero(value);
            const length = value.length == 11 ? true : false;
            const rucValid = isNumber && length && validacionLogicaRUC;
            
            //console.log('isNumber' , isNumber);
            //console.log( 'length'  , length);
            //console.log( 'rucValid',rucValid);

            return rucValid;
        }
        else 
        {


            return true;
        }  

       
    
        
    }


    static validarPasaporte(value : string) : boolean{

        if (!cadenaEsVacia(value)){

            const isNumber = esNumero(value);
            const length = value.length == 12 ? true : false;
            const pasaporteValid = isNumber && length;
        
            return pasaporteValid;
        }
        else {


            return true;

            

        }
      
    }

    static validarCE(value : string) : boolean{

        if (!cadenaEsVacia(value)){
            const isNumber = esNumero(value);
            const length = value.length == 12 ? true : false;
            const pasaporteValid = isNumber && length;
        
            return pasaporteValid;

        }
        else {

            return true;

        } 
       
    }

    static validarOtros(value : string) : boolean{

        if (!cadenaEsVacia(value)){

            const isNumber = esNumero(value);
            const length = value.length <= 20 ? true : false;
            const otrosValid = isNumber && length;
        
            return otrosValid;
        }
       else {
        
        return true;

       }
    }

}
 
