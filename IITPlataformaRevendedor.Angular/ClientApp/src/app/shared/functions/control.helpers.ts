/**
 * Cambia un input tipo number a text para poder seleccionarlo, y lo vuelve a devuelve al tipo number al final
 * @param event 
 */
export const seleccionarNumberControl = (event) => {
    const target = event.currentTarget;

    target.type = 'text';
    target.setSelectionRange(0, target.value.length);
    target.type = 'number';
}