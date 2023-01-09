import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.css']
})
export class CargandoComponent implements OnInit { 

  // Si no le envio ninguno de estos dos inputs por defecto tendra la escala x2 y mostrara texto
 @Input() escala = 'x2';
 @Input() mostrarTexto = true;

  constructor() { }

  ngOnInit() {
    if (this.escala === 'x1' || this.escala === 'x2' || this.escala === 'x3' || this.escala === 'x4' || this.escala === 'x5') {
      // si llegan con los tamaños como debe ser los asignara normalmente
    } else {
      // si envian cualquier cosa que no sea x1,x2,x3,x4,x5 entonces asignara la escala por defecto
      this.escala = 'x2';
    }
    // cuando ya se inicie tomara el valor enviado desde el componente padre (ejm: x5)
    // console.log("EN ONINIT", this.escala);
    }
  }
