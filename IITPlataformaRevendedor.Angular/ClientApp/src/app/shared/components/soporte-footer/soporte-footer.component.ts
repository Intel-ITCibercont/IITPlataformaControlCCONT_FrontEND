import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-soporte-footer',
  templateUrl: './soporte-footer.component.html',
  styleUrls: ['./soporte-footer.component.css']
})
export class SoporteFooterComponent implements OnInit {


@Input() mensajeAMostrar
@Input() numeroDeSoporte

  constructor() { }

  ngOnInit(): void {
  }

}
