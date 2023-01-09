import { Environment } from "./enviroment-model";


export const environment : Environment = {
  production: true,
  urlAddress: 'http://142.93.8.76',
};
//#region url WS Buequeda RUC
export const environmentBE : Environment = {
  production: true,
  urlAddress: 'https://www.cibercont.org',
};
//#endregion


//#region url WS Busqueda Empresa
export const environmentBP :Environment =  {
  production: true,
  urlAddress: 'https://dniruc.apisperu.com',
};

