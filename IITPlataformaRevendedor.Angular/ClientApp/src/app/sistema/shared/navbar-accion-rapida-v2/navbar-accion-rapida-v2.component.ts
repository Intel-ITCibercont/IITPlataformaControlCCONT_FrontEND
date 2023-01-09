import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-accion-rapida-v2',
  templateUrl: './navbar-accion-rapida-v2.component.html',
  styleUrls: ['./navbar-accion-rapida-v2.component.css']
})
export class NavbarAccionRapidaV2Component implements OnInit {

  //#region Variables publicas
  @Input() accionRapida: any;
  //#endregion Variables publicas

  //#region LifeCycle Methods - Angular
  constructor( private router :Router ) { }

  ngOnInit(): void {
  }
  //#endregion LifeCycle Methods - Angular

  navegar(ruta ){

    this.router.navigate([ruta]);
  }
}
