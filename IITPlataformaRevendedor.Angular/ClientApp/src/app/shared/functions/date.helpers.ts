
// Convierte la fecha del MAT-DATE-INPUT (string ) a dd-MMMM-yyyy (string)
export const formatearFecha = (fecha: string): string => {
  const MONTHS = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  },
    date = fecha.split(' ');

  return [date[2], MONTHS[date[1]], date[3]].join('-');
};
export const setPeruDateTime = (fechaActual: Date) : number => {

   return fechaActual.setHours(fechaActual.getHours() - 5);
}
export const addDays = (date: Date ,  dias : number) : Date => {


  let newDate = new Date(date);
  newDate.setDate(newDate.getDate()+ dias);


  return newDate;
}

export const addHours = (date: Date ,  hours : number) : Date => {

  let newDate = new Date(date);
  newDate.setHours(newDate.getHours()+ hours);

  return newDate;
}

export const setLocalHour = (date: Date ) : Date => {

  let newDate = new Date(date);
  newDate.setHours(new Date().getHours());

  return newDate;
}

export const retrocedeDias = ( date: Date, dias: number): Date =>{
  let newDate = new Date();
  let dia = date.getDate();
  let mes = date.getMonth();
  let anho = date.getFullYear();
  if(dia < dias){
    //Entra cuando retrocede un mes anterior
    if(mes - 1 == 0){
      //Entra cuando debe retrocider un año
      newDate.setFullYear(anho -1);
      newDate.setMonth(mes - 1);
      newDate.setMonth(12);
    }
    else{
      newDate.setMonth(mes - 1);
    }
    newDate.setDate(dias-dia);
  }
  else{
    newDate.setDate(dia-dias);
    newDate.setMonth(mes);
    newDate.setFullYear(anho);
  }
  //console.log('fecha que retorna', newDate);
  return newDate;
}

