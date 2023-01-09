import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { formatearFecha } from 'src/app/core/helpers/date.helpers';
import { generarCodigoCaracteres } from 'src/app/shared/functions/other.helpers';
import { EstadoDeFormulario } from 'src/app/shared/models/estado-de-formulario.model';
import { SharedModalService } from 'src/app/shared/services/shared-modal.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { SubSink } from 'subsink';
import { ReporteEmpresa } from '../../models/reporte-empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { AsignarPlanEmpresaComponent } from '../asignar-plan-empresa/asignar-plan-empresa.component';
import { EmpresaComponent } from '../empresa/empresa.component';

@Component({
  selector: 'app-reporte-empresa',
  templateUrl: './reporte-empresa.component.html',
  styleUrls: ['./reporte-empresa.component.css']
})
export class ReporteEmpresaComponent implements OnInit {

  private subs: SubSink = new SubSink();

  //#region Atributos privados
  private nombreReporte : string = 'ReporteEmpresa';
  public listaDeReporte :ReporteEmpresa[] = [];
  //#endregion
  //#region Pestañas
  public showFiltros = true;
  public showAgrupaciones = false;
  public showBotones = false;
  public showImprimible = false;
  //#endregion

  //#region  Valores Filtros
  public valueFiltroN1 = 'None';
  public valueFiltroN2 = 'None';

  //Columnas de configuracion de reporte
  public columnasPorDefecto : any[] = [
    { dataField: 'acciones' , width: 120, cellTemplate:"cellTemplateDetalle" ,  allowResizing: true, visible: true, allowExporting: true, caption: ' ', groupIndex: -1, visibleIndex: 1 },    
    { dataField: 'codigo' , width: 100, dataType: 'string', allowResizing: true, visible: false, allowExporting: true, caption: 'Código', groupIndex: -1, visibleIndex: 2 },
    { dataField: 'ruc' , width: 100, dataType: 'string', allowResizing: true, visible: true, allowExporting: true, caption: 'RUC', groupIndex: -1, visibleIndex: 3 },
    { dataField: 'razonSocial' , width: 250, dataType: 'string', allowResizing: true, visible: true, allowExporting: true, caption: 'Razón Social', groupIndex: -1, visibleIndex: 4 },
    { dataField: 'nombreComercial' , width: 150, dataType: 'string', allowResizing: true, visible: true, allowExporting: true, caption: 'Nombre Comercial', groupIndex: -1, visibleIndex: 5 },
    { dataField: 'codigoDeUbigeo' , width: 100, dataType: 'string', allowResizing: true, visible: false, allowExporting: true, caption: 'Ubigeo', groupIndex: -1, visibleIndex: 7 },
    { dataField: 'direccionDetallada' , width: 250, dataType: 'string', allowResizing: true, visible: true, allowExporting: true, caption: 'Dirección', groupIndex: -1, visibleIndex: 8 },
    { dataField: 'urbanizacion' , width: 250, dataType: 'string', allowResizing: true, visible: true, allowExporting: true, caption: 'Urbanización', groupIndex: -1, visibleIndex: 9 },
    
    { dataField: 'estado' , width: 100, dataType: 'string', allowResizing: true, visible: false, allowExporting: true, caption: 'Estado', groupIndex: -1, visibleIndex: 14 },
    { dataField: 'estadoDeConexion' , width: 100, dataType: 'string', allowResizing: true, visible: false, allowExporting: true, caption: 'Estado Conexión', groupIndex: -1, visibleIndex: 15 },
    { dataField: 'fechaDeRegistro' , width: 120,  dataType: 'date', format: 'dd-MM-yyyy', allowResizing: true, visible: true, allowExporting: true, caption: 'Fecha Registro', groupIndex: -1, visibleIndex: 16 },
    { dataField: 'planSuscrito' , width: 100,  dataType: 'number',  allowResizing: true, visible: true, allowExporting: true, caption: 'Planes Activos', groupIndex: -1, visibleIndex: 17 }
    
  ];
  //#endregion

  //#region Variables de agrupacion
  // Primera agrupación
  public primera_agrupacion: any = [

    { value: 'codigo' , nombre: 'Código'},
    { value: 'ruc' , nombre: 'RUC'},
    { value: 'razonSocial' , nombre: 'Razón Social'},
    { value: 'nombreComercial' , nombre: 'Nombre Comercial'},
    { value: 'codigoDeUbigeo' , nombre: 'Ubigeo'},
    { value: 'direccionDetallada' , nombre: 'Dirección'},
    { value: 'urbanizacion' , nombre: 'Urbanización'},
    { value: 'estado' , nombre: 'Estado'},
    { value: 'estadoDeConexion' , nombre: 'Estado Conexión'},
    { value: 'fechaDeRegistro' , nombre: 'Fecha Registro'},
    { value: 'planSuscrito' , nombre: 'Planes'}

  ];

  // Segunda agrupación depende del primera agrupación
  public segunda_agrupacion: any = [];
  // Opciones para mostrar datos del reporte
/*   public mostrarDatosReporte: any[] = [
    { value: 'Todo', nombre: 'Todo' },
    { value: 'ReporteInterno', nombre: 'Reporte Interno' },
    { value: 'ReporteSunat', nombre: 'Reporte Sunat' },
    { value: 'SoloAnulados', nombre: 'Solo comprobantes anulados' },
    { value: 'PendientePorCobrar', nombre: 'Pendientes Cobrar' },
    { value: 'PendientesEnvioSunat', nombre: 'Pendientes Envio Sunat' }
  ]; */
  public gruposDesplegados = true;
  //#endregion

  //#region SubComponentes
  @ViewChild(DxDataGridComponent) reporte: DxDataGridComponent;
  public formularioBusqueda: FormGroup;
  //#endregion

  tipoDeCambioDelDia:number;
 
  //#region Constructor
  matDialogRef = null;
  matData = null;
  fechaI: Date = new Date( 1990, 10 , 1);
  fechaF: Date = new Date();
  readonlyBusqueda = false;
  fechaMinReporteXUsuario:Date;
  public filtrarXUsuario: boolean = false;
  
  constructor(
    private dialog: MatDialog,
    private spinner: SpinnerService,
    private sharedModalService: SharedModalService,
    private empresaService : EmpresaService ,
    
    ) 
  {

  }
 
  ngOnInit() {

    this.agregarSuscripciones();


    this.formularioBusqueda = new FormGroup({
      fechaInferior: new FormControl(this.fechaI, [Validators.required]),
      fechaSuperior: new FormControl(this.fechaF, [Validators.required]),
     
    });

      this.realizarBusqueda();
 
  }
  
  verDetalle (codigo : string) {

    this.dialog.open(EmpresaComponent, {
      disableClose: false,
      panelClass: 'myapp-no-padding-dialog',
      width: '600px',
      data : {
        codigo : codigo
      }
    }).afterClosed().subscribe((estadoDeFormulario : EstadoDeFormulario)=> {

        if(estadoDeFormulario.status){
            
            this.realizarBusqueda();
        }

    });
  }

  abrirFormularioRegistrarPlan(codigo : string) {
  

    return this.dialog.open(AsignarPlanEmpresaComponent, {

      disableClose: true,
      panelClass: 'myapp-no-padding-dialog',
      maxHeight: '10%',
      data: {
         codigoEmpresa : codigo
      }
    }).afterClosed().subscribe((estadoDeFormulario : EstadoDeFormulario) => 
        { 
          if(estadoDeFormulario.status){
            
            this.realizarBusqueda();
          }

        });
    };


  ngOnDestroy(): void {
    
    this.subs.unsubscribe();
  
  }

  //#endregion
  

  agregarSuscripciones() {

  }
  //#region Metodos

  
    //#region Búsqueda
    realizarBusqueda() {
      
          console.log('realizarBusqueda');
          this.buscar(formatearFecha(this.fechaInferior.value.toDateString()),
          formatearFecha(this.fechaSuperior.value.toDateString()));
        
            
    }

    buscar(fechaInicio: string, fechaFinal: string) {
      
          console.log('realizarBusqueda');
          this.spinner.showSquareFullScreen('reporte-empresa');
      
          this.empresaService.reporteEntidad(fechaInicio, fechaFinal)
            .subscribe((respuesta: any) => {
              console.log('respuesta',respuesta);
              this.listaDeReporte = respuesta.valorObjeto;
              this.spinner.hide('reporte-empresa');
            },
              (error) => {
                
                this.spinner.hide('reporte-empresa');
                
                try {
                  this.sharedModalService.mostrarMessageModal(error.Mensaje.MensajeGenerado, false);
                  } catch (e) {
      
                  this.sharedModalService.mostrarMessageModal(`Ocurrió un error en la búsqueda.`, false);
                  }
      
              });
    }
      
      
    //#endregion

    //#region Reporte
    
    exportarAExcel() {
    
        this.reporte.export.fileName = `ReporteEmpresa${generarCodigoCaracteres()}.xlsx`
        this.reporte.instance.exportToExcel(false);
    }
    
    expandirGrupos($event) {
        this.gruposDesplegados = $event.value;
        if (this.gruposDesplegados === true) {
          setTimeout(() => {
            this.reporte.instance.expandAll();
          }, 1000);
    
        } else {
          setTimeout(() => {
            this.reporte.instance.collapseAll();
          }, 1000);
    
        }
    }
       
    realizarFiltro(valor) {
        try {
    
          this.reporte.instance.clearFilter();
    
          if (valor !== '') {
            let filtro: Array<any> = [];
            let columnCount = this.reporte.instance.columnCount();
            for (let i = 0; i < columnCount; i++) {
    
              if (this.reporte.instance.columnOption(i, 'visible')) {
    
                if (i === columnCount - 1) {
    
    
                  filtro.push([`${this.reporte.instance.columnOption(i, 'dataField')}`, 'contains', `${valor}`]);
                } else {
    
                  filtro.push([`${this.reporte.instance.columnOption(i, 'dataField')}`, 'contains', `${valor}`], 'or');
                }
              }
            }
    
            this.reporte.instance.filter(filtro);
          }
        } catch (ex) {
    
        }
    }
    realizar_Segunda_Agrupacion(data: any) {
    
        if (data !== undefined) {
          this.reporte.instance.clearGrouping();
          this.valueFiltroN2 = data.value;
          this.reporte.instance.columnOption(this.valueFiltroN1, 'groupIndex', 1);
          this.reporte.instance.columnOption(this.valueFiltroN2, 'groupIndex', 2);
        } else {
    
          this.valueFiltroN2 = 'None';
        }
    
    }
    
    realizar_Primera_Agrupacion(data: any) {
    
        this.valueFiltroN1 = 'None';
        this.valueFiltroN2 = 'None';
        this.valueFiltroN1 = data.value;
        this.reporte.instance.clearGrouping();
        this.reporte.instance.columnOption(data.value, 'groupIndex', 1);
        this.actualizar_Segundo_Filtro(data.value);
    
    }
    
    actualizar_Segundo_Filtro(columna: string) {
        if (columna !== undefined) {
          this.segunda_agrupacion = [];
          for (let index = 0; index < this.primera_agrupacion.length; index++) {
            let auxiliar = this.primera_agrupacion[index].value as string;
            if (columna !== auxiliar) {
              this.segunda_agrupacion.push(this.primera_agrupacion[index]);
            }
          }
        } else {
          this.segunda_agrupacion = [];
    
        }
    }
    //#endregion

   //#region Acciones de reporte
  
    gestionarVisibilidad(criterio: string) {
  
      if (criterio === 'Busqueda') {
  
        this.showFiltros = !this.showFiltros;
        this.showAgrupaciones = false;
        this.showBotones = false;
        this.showImprimible = false;
  
  
      } else if (criterio === 'Grupos') {
        this.showFiltros = false;
        this.showAgrupaciones = !this.showAgrupaciones;
        this.showBotones = false;
        this.showImprimible = false;
  
      } else if (criterio === 'Accion') {
        this.showFiltros = false;
        this.showAgrupaciones = false;
        this.showBotones = !this.showBotones;
        this.showImprimible = false;
      } else if (criterio === 'Imprimible') {
        this.showFiltros = false;
        this.showAgrupaciones = false;
        this.showBotones = false;
        this.showImprimible = !this.showImprimible;
      }
  
    }
    
    quitarConexion(codigo : string){

      console.log('codigo', codigo);
      this.spinner.showSquareFullScreen('reporte-empresa');
      
      this.empresaService.quitarConexion(codigo)
        .subscribe((resultado: any) => {
          this.spinner.hide('reporte-empresa');
          this.sharedModalService.mostrarMessageModal(resultado.mensaje.mensajeGenerado, true)
              .afterClosed().subscribe(  () => {

                  this.realizarBusqueda();
              });
              
        }, (error: any) => {
  
          this.spinner.hide('reporte-empresa');
          try {
            this.sharedModalService.mostrarMessageModal(error.mensaje.mensajeGenerado, false);
          } catch (e) {
            this.sharedModalService.mostrarMessageModal('Error al realizar la operaciôn.', false);
          } 
        })

    }
    
    
    activarConexion (codigo : string) {

      
      
      this.spinner.showSquareFullScreen('reporte-empresa');
      
      this.empresaService.activarConexion(codigo)
        .subscribe((resultado: any) => {
          this.spinner.hide('reporte-empresa');
          this.sharedModalService.mostrarMessageModal(resultado.mensaje.mensajeGenerado, true)
              .afterClosed().subscribe(()=> {

                this.realizarBusqueda();

          });
              
        }, (error: any) => {
  
          this.spinner.hide('reporte-empresa');
          try {
            this.sharedModalService.mostrarMessageModal(error.mensaje.mensajeGenerado, false);
          } catch (e) {
            this.sharedModalService.mostrarMessageModal('Error al realizar la operaciôn.', false);
          } 
        })


    }
    //#endregion

    //#region color de doc. anulados
  
    colorFila(value: any, dato: any) {
      
      if (value.data == undefined) {
      }
      else {
        if (value.data.estadoDeComprobante == 'Anulado' || value.data.observacionNotaDeCreditoAnulacion != null) {
          ////// console.log("entra color:");
          value.rowElement.style.background = '#f8d7da';
        }
      }
    }
    //#endregion



  //#endregion

  //#region Validaciones Inmediatas
  get fechaInferior() {
    return this.formularioBusqueda.get('fechaInferior');
  }
  get fechaSuperior() {
    return this.formularioBusqueda.get('fechaSuperior');
  }
  //#endregion
}
