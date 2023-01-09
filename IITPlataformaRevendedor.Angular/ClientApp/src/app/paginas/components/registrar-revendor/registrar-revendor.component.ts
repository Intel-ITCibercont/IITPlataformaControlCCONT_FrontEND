import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Estado, RevendedorUser } from 'src/app/core/models/revendedor.model';
import { UserFront } from 'src/app/core/models/user-front.model';
import { RevendedorService } from 'src/app/core/services/revendedor.service';
import { EstadoDeConsulta } from 'src/app/shared/models/estado-de-consulta.model';
import { SharedModalService } from 'src/app/shared/services/shared-modal.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TipoDeDocumentoIdentidadValidator } from 'src/app/shared/validators/tipo-documento-identidad.validator';
import { SubSink } from 'subsink';
import { EstadoDeEjecucion } from '../../../shared/models/estado-de-ejecucion.model';
import { ExternalService } from '../../../core/services/external.service';
import { cadenaEsVacia } from '../../../core/helpers/string.helpers';
import { EmpresaExternal } from 'src/app/core/models/empresa-external.model';
import { Mensaje } from '../../../shared/models/mensaje.model';

@Component({
  selector: 'app-registrar-revendor',
  templateUrl: './registrar-revendor.component.html',
  styleUrls: ['./registrar-revendor.component.css']
})
export class RegistrarRevendorComponent implements OnInit {

  public formulario: FormGroup;
  public ocultar = true;
  subs = new SubSink();

  _usuario: UserFront;
  _logeado: boolean;

  cargando: boolean = false;
  errorMessage: string;



  constructor(private dialog: MatDialog,
             private revendedorService: RevendedorService,
              private spinner: SpinnerService,
              private sharedModalService: SharedModalService,
              private externalService : ExternalService ,
              private router: Router,
              private route: ActivatedRoute,
   
   ) {

  
  }

  ngOnInit() {

    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern(/[^ @]*@[^ @]*/)]),
      password: new FormControl('', [Validators.required , 
                                     Validators.minLength(8),  
                                     Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      
                                     numeroDocumento: new FormControl('', [Validators.required,TipoDeDocumentoIdentidadValidator.RUC]),
      razonSocial: new FormControl('', [Validators.required]),
     
    })

    this.crearSuscripciones();


  };

  crearSuscripciones(){
}

  pasarFormularioAEntidad (): RevendedorUser{

    let entidad : RevendedorUser = new RevendedorUser();;
    entidad.numeroDocumento = this.numeroDocumento.value;
    entidad.razonSocial = this.razonSocial.value;
    entidad.correoelectronico = this.correo.value;
    entidad.estado = Estado.Activo;
    entidad.password = this.password.value;
    return entidad;
    
  }
 
  buscarEmpresa() {
  
    if(!cadenaEsVacia(this.numeroDocumento.value) && this.numeroDocumento.valid) {
          this.cargando = true;
          this.externalService.buscarEmpresa(this.numeroDocumento.value)
            .subscribe((respuesta: EstadoDeConsulta<EmpresaExternal>) => {
              
             this.cargando = false;
             this.razonSocial.setValue(respuesta.valorObjeto.razonSocial);
           
          } , (error : any) => {
            this.cargando = false;
            this.razonSocial.setValue('');
      
            try {
             
             let mensaje = new Mensaje();
             mensaje.mensajeGenerado = error.value.mensaje;
             this.sharedModalService.mostrarMessageModalV2(mensaje, false);
             
            }
            catch (e){
      
              let mensaje = new Mensaje();
                mensaje.mensajeGenerado = "Error al realizar la operación.";
                mensaje.accionARealizar = "Comuníquese con Soporte Técnico.";
              this.sharedModalService.mostrarMessageModalV2(mensaje, false);
      
            }
      
      
          })
    }
  
   

  }


  registrar() {

    console.log('this.formulario',this.formulario);
    if (this.formulario.valid) {
   
      this.ejecutarRegistrar();
    }
    else {
      this.sharedModalService.mostrarMessageModal("Formulario inválido, verifique los campos e intente nuevamente", false);
      this.formulario.markAllAsTouched();
    }
  }
  ejecutarRegistrar() {

    let revendedorUser = this.pasarFormularioAEntidad();
    this.spinner.showSquareFullScreen("registrar-revendedor");
    this.revendedorService.registrar(revendedorUser) 
      .subscribe((resultado: EstadoDeEjecucion) => {
        console.log('resultado',resultado);
        this.spinner.hide("registrar-revendedor");

        this.sharedModalService.mostrarMessageModalV2(resultado.mensaje, true)
          .afterClosed().subscribe(() => {

            this.router.navigate(['/login'], { relativeTo: this.route });

          
        });
        

      }, (error: any) => {

        this.spinner.hide("registrar-revendedor");
      
        try {
          this.sharedModalService.mostrarMessageModalV2(error.mensaje, false);
        } catch (e) {
          let mensaje = new Mensaje();
          mensaje.mensajeGenerado = "Error al realizar la operación.";
          mensaje.accionARealizar = "Comuníquese con Soporte Técnico.";
          this.sharedModalService.mostrarMessageModalV2(mensaje,false);
        }
      });;
  }


  get correo() {
    return this.formulario.get('correo');
  }

  get password() {
    return this.formulario.get('password');
  }

  get numeroDocumento() {
    return this.formulario.get('numeroDocumento');
  }

  get razonSocial() {
    return this.formulario.get('razonSocial');
  }



  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  irALink(valor: any) {
    if (valor == 'youtube') {
      window.open('https://www.youtube.com/channel/UCMcMWYxV87F31T3HC_cKgWQ', "_blank");
    }
    else if (valor == 'facebook') {
      window.open('https://www.facebook.com/Cibercont', "_blank");
    }
    else if (valor == 'cibercont') {
      window.open('https://www.cibercont.com', "_blank");
    }
  }

}
