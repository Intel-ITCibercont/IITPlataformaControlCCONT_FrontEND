import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // selector: './styles/estilos-paginas-error.css',
  selector: '../../../styles/estilos-paginas-error.css',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private router: Router,    
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  irAInicio(){    
    this.router.navigate(['../sistema/inicio'], { relativeTo: this.route });
  }

}
