export enum Meses {
  Jan = '01',
  Feb = '02',
  Mar = '03',
  Apr = '04',
  May = '05',
  Jun = '06',
  Jul = '07',
  Aug = '08',
  Sep = '09',
  Oct = '10',
  Nov = '11',
  Dec = '12'
}

// Convierte la fecha del MAT-DATE-INPUT (string ) a dd-MMMM-yyyy (string)
export const formatearFecha = (fecha: string): string => {
  let date = fecha.split(' ');

  return [date[2], obtenerNumeroDeMes(date[1]), date[3]].join('-');
};
export const setPeruDateTime = (fechaActual: Date): number => {

  return fechaActual.setHours(fechaActual.getHours() - 5);
}
export const addDays = (date: Date, dias: number): Date => {


  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + dias);


  return newDate;
}

export const addHours = (date: Date, hours: number): Date => {

  let newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);

  return newDate;
}

export const setLocalHour = (date: Date): Date => {

  let newDate = new Date(date);
  newDate.setHours(new Date().getHours());

  return newDate;
}


const obtenerNumeroDeMes = (mes: string): string => {
  switch (mes) {
    case "Jan":
      return '01'
    case "Feb":
      return '02'
    case "Mar":
      return '03'
    case "Apr":
      return '04'
    case "May":
      return '05'
    case "Jun":
      return '06'
    case "Jul":
      return '07'
    case "Aug":
      return '08'
    case "Sep":
      return '09'
    case "Oct":
      return '10'
    case "Nov":
      return '11'
    case "Dec":
      return '12'
    default:
      return "00";
  }
}
