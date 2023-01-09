export const generarCodigo = (): string => {

  let codigoADevolver: string = "";

  let fechaActual = new Date();

  let anho = fechaActual.getFullYear();
  let mes = ((fechaActual.getMonth() + 1) < 10) ? `0${(fechaActual.getMonth() + 1)}` : (fechaActual.getMonth() + 1);
  let dia = (fechaActual.getDate() < 10) ? `0${fechaActual.getDate()}` : fechaActual.getDate();
  let hora = (fechaActual.getHours() < 10) ? `0${fechaActual.getHours()}` : fechaActual.getHours();
  let minutos = (fechaActual.getMinutes() < 10) ? `0${fechaActual.getMinutes()}` : fechaActual.getMinutes();
  let segundos = (fechaActual.getSeconds() < 10) ? `0${fechaActual.getSeconds()}` : fechaActual.getSeconds();

  let milisegundos = fechaActual.getMilliseconds();

  if (milisegundos < 10) {
    var milisegundosConFormato = ("00" + milisegundos);
  }
  else if (milisegundos >= 10 && milisegundos <= 99) {
    var milisegundosConFormato = ("0" + milisegundos);
  }
  else {
    var milisegundosConFormato = milisegundos.toString();
  }

  codigoADevolver = `${anho}${mes}${dia}${hora}${minutos}${segundos}${milisegundosConFormato}`;
  return codigoADevolver;

}

export const letraRandom = (cantidadCaracteres: number): string => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < cantidadCaracteres; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


// export const generarNombrePrecuenta = (): string => {
//   let nombreADevolver: string = "";

//   let fechaActual = new Date();

//   let anho = fechaActual.getFullYear();
//   let mes = ((fechaActual.getMonth()+1) < 10)? `0${(fechaActual.getMonth()+1)}`:(fechaActual.getMonth()+1);
//   let dia = (fechaActual.getDate() < 10)? `0${fechaActual.getDate()}`:fechaActual.getDate();
//   let hora = (fechaActual.getHours() < 10)? `0${fechaActual.getHours()}`:fechaActual.getHours();
//   let minutos = (fechaActual.getMinutes() < 10)? `0${fechaActual.getMinutes()}`:fechaActual.getMinutes();
//   let segundos = (fechaActual.getSeconds() < 10)? `0${fechaActual.getSeconds()}`:fechaActual.getSeconds();


//   nombreADevolver = `${anho}-${mes}-${dia} ■ ${hora}h:${minutos}m:${segundos}s`;
//   return nombreADevolver;
// }
