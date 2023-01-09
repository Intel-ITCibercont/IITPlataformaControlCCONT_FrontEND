// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./enviroment-model";






export const environment : Environment = {
  production: false,
  urlAddress: 'http://localhost:5002',
};
//#region url WS Buequeda RUC
export const environmentBE : Environment = {
  production: false,
  urlAddress: 'https://www.cibercont.org',
};
//#endregion


//#region url WS Busqueda Empresa
export const environmentBP :Environment =  {
  production: false,
  urlAddress: 'https://dniruc.apisperu.com',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
