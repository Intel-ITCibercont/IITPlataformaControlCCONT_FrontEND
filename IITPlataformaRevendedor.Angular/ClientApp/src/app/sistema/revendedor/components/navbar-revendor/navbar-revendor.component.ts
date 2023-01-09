
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { SharedModalService } from 'src/app/shared/services/shared-modal.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { UserFront } from 'src/app/core/models/user-front.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Modulo } from 'src/app/sistema/models/modulo.model';
import { AccionRapida } from 'src/app/sistema/models/accion-rapida.model';

@Component({
  selector: 'app-navbar-revendor',
  templateUrl: './navbar-revendor.component.html',
  styleUrls: ['./navbar-revendor.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]
    )
  ]
})
export class NavbarRevendorComponent implements OnInit, OnDestroy {

  public  listaDeModuloPrincipales : Modulo[]  = [];
  public  listaDeModuloSecundarios : Modulo[]  = [];

  public listaAccionesRapidas: AccionRapida[] = [];

  _usuarioLogeado: UserFront;
  _logeado: boolean;
  subs = new SubSink();

  opened: boolean = true;

  minimizado: boolean = false;
  razonSocial: string = 'Cibercont S.A.';
  toggled = false;

  navbarForm: FormGroup;
  rutaReporteVenta: string;

  mostrarInfoEmpresa: boolean = false;

  // configuracionVentasPorDia = {
  //   ...new ConfiguracionVentasPorDia(),
  //   desde: new Date(),
  //   hasta: new Date(),
  //   codigoEstablecimiento: "",
  //   codigoPuntoDeVenta: "",
  //   moneda: "PEN",
  //   tipoVenta: TipoDeVenta.DocumentoInterno
  // }
  rutaResumenDeVentas = "";
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  //? Variable para lista de opciones del sidebar
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private spinner: SpinnerService,
    private sharedModalService: SharedModalService,
    private deviceDetectorService: DeviceDetectorService ,
  
  ) {
       
  
  }

  ngOnInit() {
    
    this.controlDelFormulario();
    this.crearSuscripciones();
    this.cargarListaDeModulos();
  
  }
  controlDelFormulario() {
    this.navbarForm = new FormGroup({
      puntoDeVenta: new FormControl(''),
    })
  }

  public crearSuscripciones() {


    this.subs.add(
      this.authService.usuarioChanged$
        .subscribe((resultado: UserFront) => {
         
          this._usuarioLogeado = resultado;
                
         }));

    this.subs.add(
      this.authService.estaLogeadoChanged$
        .subscribe((logeado: boolean) => {
         
          this._logeado = logeado;
        }));
  }

  public cargarListaDeModulos(){


      this.listaDeModuloPrincipales.push(this.moduloEmpresas());
      this.listaDeModuloPrincipales.push(this.moduloEstadoDeCuenta());

  }


  volverAlLogin() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  cerrarSesion() {
   
    this.authService.logout();
    this.spinner.hide("navbar");
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  moduloEmpresas() {

    let modulo = new Modulo();
    modulo.nombre = "GESTIÓN DE EMPRESAS";
    modulo.listaAccesosRapidas = [];
    modulo.listaDeGrupos = [];
    modulo.ruta = '/sistema/revendor/panel-gestion-empresa';
    modulo.icon = 'fa fa-building-o';

/*     let grupoOperaciones = new Grupo();
    grupoOperaciones.listaFormularios.push(FormularioUsuario.mantenimientoUsuario());
    grupoOperaciones.listaFormularios.push(FormularioUsuario.cambiarContrasenha());
    modulo.listaDeGrupos.push(grupoOperaciones); */


    return modulo;
  
  }
   moduloEstadoDeCuenta() {

    let modulo = new Modulo();
    modulo.nombre = "GESTIÓN ESTADO DE CUENTA";
    modulo.listaAccesosRapidas = [];
    modulo.listaDeGrupos = [];
    modulo.ruta = '/sistema/revendor/panel-gestion-estado-cuenta';
    modulo.icon = 'fa fa-file';

/*     let grupoOperaciones = new Grupo();
    grupoOperaciones.listaFormularios.push(FormularioUsuario.mantenimientoUsuario());
    grupoOperaciones.listaFormularios.push(FormularioUsuario.cambiarContrasenha());
    modulo.listaDeGrupos.push(grupoOperaciones); */


    return modulo;
  
  }
}

