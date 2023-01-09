import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccionAuxiliar } from 'src/app/shared/models/accion-auxiliar.model';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-seleccion-button',
  templateUrl: './seleccion-button.component.html',
  styleUrls: ['./seleccion-button.component.css']
})
export class SeleccionButtonComponent implements OnInit , OnChanges {


  opciones : FormControl = new FormControl( null, []);
  @Input() listaDeOpciones : AccionAuxiliar[] =[];
  @Input() label : string ="";
  @Input() iconoBoton : string ="";


  

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes.listaDeOpciones) {

      if (this.listaDeOpciones != null) {
        if(this.listaDeOpciones.length >0){
          this.opciones.setValue(this.listaDeOpciones[0]);
        }
       }
    }

    if (changes.label) {
      
    }

  }

  ngOnInit(): void {

    this.suscripciones();

  }
  suscripciones() {
    
    this.opciones.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value:AccionAuxiliar) => {
            //console.log('pipe', value);
            if(value){
                value.accion();
            }
    } );
  }

  ejecutarAccionActual(event) {
    event.stopPropagation();

    if(this.opciones) {
      //console.log('stopPropagation',this.opciones.value);
      this.opciones.value.accion();

    }

  }

 

}
