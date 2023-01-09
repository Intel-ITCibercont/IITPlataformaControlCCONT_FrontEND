import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccionParaEjecutar, Formulario } from 'src/app/sistema/models/formulario.model';
import { RevendedorConfiguracionMarcaComponent } from '../revendedor-configuracion-marca/revendedor-configuracion-marca.component';
import { EmpresaComponent } from '../empresa/empresa.component';

@Component({
  selector: 'app-panel-gestion-empresa',
  templateUrl: './panel-gestion-empresa.component.html',
  styleUrls: ['./panel-gestion-empresa.component.css']
})
export class PanelGestionEmpresaComponent implements OnInit {
 
  public listaFormularios : Formulario[] = [
    {
      nombre: 'REGISTRAR NUEVA EMPRESA',
      icon: 'fa fa-building',
      usarColorPrincipal: false,
      ruta: "",
      accionParaEjecutar : AccionParaEjecutar.CuadroDeDialogo, 
      modulos : []
    },
    {
      nombre: 'CONFIGURACIÓN DE LA MARCA',
      icon: 'fa fa-paint-brush',
      usarColorPrincipal: false,
      ruta: "/sistema/revendor/configuracion-marca",
      accionParaEjecutar : AccionParaEjecutar.CuadroDeDialogo, 
      modulos : []
    },

    
   
  ];

  public listaReportes : Formulario[] =  [
   
    {
      nombre: 'REPORTE DE EMPRESAS',
      icon: 'fa fa-file-text',
      usarColorPrincipal: true,
      ruta: "/sistema/revendor/reporte-empresa",
      accionParaEjecutar : AccionParaEjecutar.Ruta, 
      modulos : []
    }, 

     
    {
      nombre: 'REPORTE DE PLANES',
      icon: 'fa fa-file-text',
      usarColorPrincipal: true,
      ruta: "/sistema/revendor/reporte-empresa-plan",
      accionParaEjecutar : AccionParaEjecutar.Ruta, 
      modulos : []
    }, 
   
  ];


  constructor(private router: Router ,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirFormulario(formulario : Formulario) {

    if (formulario.accionParaEjecutar == AccionParaEjecutar.Ruta) 
    {
      this.router.navigate([formulario.ruta]);
    }
    else if (formulario.accionParaEjecutar == AccionParaEjecutar.CuadroDeDialogo)  {


      switch (formulario.nombre) {
        case "REGISTRAR NUEVA EMPRESA":
          this.abrirRegistarEmpresa();
          break;
      
        
      }
      switch (formulario.nombre) {
        case "CONFIGURACIÓN DE LA MARCA":
          this.abrirConfiguracionDeMarca();
          break;
      
        
      }

    }

  }
  abrirRegistarEmpresa() {
    this.dialog.open(EmpresaComponent, {
      disableClose: false,
      panelClass: 'myapp-no-padding-dialog',
      width: '600px',
   
    });
  }
  abrirConfiguracionDeMarca() {


    this.dialog.open(RevendedorConfiguracionMarcaComponent, {
      disableClose: false,
      panelClass: 'myapp-no-padding-dialog',
      width: '350px',
   
    });
  }

}
