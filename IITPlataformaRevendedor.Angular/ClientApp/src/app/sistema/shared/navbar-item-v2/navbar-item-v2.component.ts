import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccionRapida } from '../../models/accion-rapida.model';
import { Modulo } from '../../models/modulo.model';


@Component({
  selector: 'app-navbar-item-v2',
  templateUrl: './navbar-item-v2.component.html',
  styleUrls: ['./navbar-item-v2.component.css']
})
export class NavbarItemV2Component implements OnInit {

  @Input() option: Modulo;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navegar(ruta : string ){
    this.router.navigate([ruta]);

  }


}
