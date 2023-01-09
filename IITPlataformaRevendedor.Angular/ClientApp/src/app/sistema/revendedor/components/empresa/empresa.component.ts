import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SharedModalService } from 'src/app/shared/services/shared-modal.service';
import { CatalogoDeUbigeos, CatalogoUbigeoService, Ubigeo } from 'src/app/core/services/catalogo-ubigeo.service';
import { UserFront } from 'src/app/core/models/user-front.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ExternalService } from 'src/app/core/services/external.service';
import { TipoDeDocumentoIdentidadValidator } from 'src/app/shared/validators/tipo-documento-identidad.validator';
import { EstadoDeConsulta } from 'src/app/shared/models/estado-de-consulta.model';
import { EmpresaExternal } from 'src/app/core/models/empresa-external.model';
import { EstadoDeFormulario } from '../../../../shared/models/estado-de-formulario.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Plan } from '../../../models/plan.model';
import { Empresa, Estado } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresa.service';
import { cadenaEsVacia } from '../../../../core/helpers/string.helpers';
import { generarCodigo } from '../../../../core/helpers/other.helpers';
import { AsignarPlanEmpresaComponent } from '../asignar-plan-empresa/asignar-plan-empresa.component';
import { PlanService } from '../../../services/plan.service';



@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit , AfterViewInit {

  //#region Atributos publicos
  public subs = new SubSink();
  public usuarioActual: UserFront = new UserFront();
  public configuracionForm: FormGroup

  public regiones: Ubigeo[] = [];
  public provinciasBase: Ubigeo[] = [];
  public distritosBase: Ubigeo[] = [];
  public catalogoDeUbigeos: CatalogoDeUbigeos[] = [];
  public provincias: Ubigeo[] = [];
  public distritos: Ubigeo[] = [];
  public empresaActual : Empresa = new Empresa();
  public estadoDeFormulario : EstadoDeFormulario = new EstadoDeFormulario();
  public listaPlanes : Plan [] =  [];
  public codigo : string ;
  public cargando_asincrono : boolean = false;
  @ViewChild(FormGroupDirective) formRef: FormGroupDirective;
  //#endregion

  //#region

  constructor(
    public dialog: MatDialog,
    private spinner: SpinnerService,
    private entidadService: EmpresaService,
    private dialogRef: MatDialogRef<EmpresaComponent>,
    private externalService: ExternalService,
    private sharedModalService: SharedModalService,
    private catalogoUbigeoService: CatalogoUbigeoService,
    private authService : AuthService,
    private planService : PlanService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    if(this.data) {

      this.codigo = this.data.codigo;
    }  
    
    

  }
  ngAfterViewInit(): void {


      if(!cadenaEsVacia(this.codigo)){

          this.buscar();
      }

  }

  ngOnInit(): void {
    
    this.controlesDelFormulario();
    this.crearSuscripciones();
    this.valoresDeUbigeoProvincia(this.region.value, false);

  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  //#endregion

  //#region Funcion que obtiene las listas para el formulario
  public crearSuscripciones() {
   
    this.subs.add(
          this.authService.usuarioChanged$.subscribe( (usuario : UserFront)=> {
              console.log('this.usuarioActual', usuario);
              this.usuarioActual = usuario;
          })
    
    );

    this.subs.add(
      this.dialogRef.keydownEvents().subscribe(event => {
        if (event.key === "Escape") {
          this.close();
        }
      })
  
    );

    this.subs.add(
        
        this.dialogRef.backdropClick().subscribe(event => {
          this.close();
        })
      
    );

    this.subs.add(this.catalogoUbigeoService.listarDistrito().subscribe((listaDistritos: Ubigeo[]) => {
      this.distritos = listaDistritos;
      this.distritosBase = listaDistritos;
    }));

    this.subs.add(this.catalogoUbigeoService.listarProvincia().subscribe((listaProvincias: Ubigeo[]) => {
      this.provincias = listaProvincias;
      this.provinciasBase = listaProvincias;
    }));

    this.subs.add(this.catalogoUbigeoService.listarRegiones().subscribe((listaRegion: Ubigeo[]) => {
      this.regiones = listaRegion;
    }));

    this.subs.add(this.catalogoUbigeoService.listarTodo().subscribe((catalogoCompleto: CatalogoDeUbigeos[]) => {
      this.catalogoDeUbigeos = catalogoCompleto;
    }));

    this.subs.add(this.direccion.valueChanges
      .pipe(debounceTime(100),
        distinctUntilChanged()
      ).subscribe(direccion => {
        
       
    }));

    
  }
  //#endregion

   buscar() {


    this.spinner.showSquareFullScreen("empresa");  


    this.entidadService.buscarPorCodigo(this.codigo)
    .subscribe((resultado: EstadoDeConsulta<Empresa>) => {
    
      this.empresaActual = resultado.valorObjeto;
      console.log('  this.empresaActual' ,   this.empresaActual);
      this.pasarEntidadAFormulario(this.empresaActual);

      this.spinner.hide("empresa");  


      } , (error: EstadoDeConsulta<Empresa>)=>{

        this.spinner.hide("empresa");   

        try {
          this.sharedModalService.mostrarMessageModalV2(error.mensaje, false);
        } catch (e) {
          this.sharedModalService.mostrarMessageModal('Error al realizar la operaciôn.', false);
        } 

      })


   }

  //#region
  public controlesDelFormulario() {
    this.configuracionForm = new FormGroup({
      ruc: new FormControl('', [Validators.required, TipoDeDocumentoIdentidadValidator.RUC]),
      razonSocial: new FormControl('', [Validators.required]),
      nombreComercial: new FormControl('', []),
      urbanizacion: new FormControl('', []),
      direccion: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      distrito: new FormControl('', [Validators.required]),
      codigoDeUbigeo: new FormControl('', [Validators.required]),
   
    })
  }
  public pasarEntidadAFormulario(empresa : Empresa) {

    this.ruc.setValue(empresa.ruc);
    this.razonSocial.setValue(empresa.razonSocial);
    this.nombreComercial.setValue(empresa.nombreComercial);
    this.urbanizacion.setValue(empresa.urbanizacion);
    this.direccion.setValue(empresa.direccionDetallada);

    this.region.setValue(empresa.codigoDeUbigeo.substring(0, 2));
    this.valoresDeUbigeoProvincia(empresa.codigoDeUbigeo.substring(0, 2), false);
    this.provincia.setValue(empresa.codigoDeUbigeo.substring(0, 4));
    this.valoresDeUbigeoDistrito(empresa.codigoDeUbigeo.substring(0, 4), false);
    this.distrito.setValue(empresa.codigoDeUbigeo.substring(0, 6));

    console.log('empresa.codigoDeUbigeo',empresa.codigoDeUbigeo);
    this.codigoDeUbigeo.setValue(empresa.codigoDeUbigeo);

  }
  //#endregion

  //#region Funcion para el ubigeo
  public valoresDeUbigeoProvincia(ubigeoRegion, defaultValue: boolean) {
    //console.log('en valores del ubigeo', ubigeoRegion, defaultValue);

    this.provincias = this.provinciasBase.filter(e => {
      //console.log('substring', e.ubigeo.substring(0, 2) == ubigeoRegion);
      return e.ubigeo.substring(0, 2) == ubigeoRegion
    });
    //console.log('luego del filter', this.provincias);
    if (defaultValue) {
      // this.provincia.value === this.listaProvincias[0].provincia;
      this.provincia.setValue(this.provincias[0].ubigeo);
      this.valoresDeUbigeoDistrito(this.provincia.value, true);
    }
    else {
      this.valoresDeUbigeoDistrito(this.provincia.value, false);
    }
  }

   public extraerUbigeoDireccion (){

    if (this.buscarUbigeo(this.extraerUbigeo(this.direccion.value))) {

      this.codigoDeUbigeo.setValue(this.buscarUbigeo(this.extraerUbigeo(this.direccion.value)).ubigeo)
    }
    if (this.catalogoDeUbigeos.find(ubg => ubg.ubigeo == this.codigoDeUbigeo.value) != undefined) {
      let ubigeo = this.catalogoDeUbigeos.find(ubg => ubg.ubigeo == this.codigoDeUbigeo.value)

      this.region.setValue(ubigeo.ubigeoRegion);
      this.valoresDeUbigeoProvincia(ubigeo.ubigeoRegion, false);
      this.provincia.setValue(ubigeo.ubigeoProvincia);
      this.valoresDeUbigeoDistrito(ubigeo.ubigeoProvincia, false);
      this.distrito.setValue(ubigeo.ubigeo);

    }

   }


  public valoresDeUbigeoDistrito(ubigeoProvincia, defaultValue: boolean) {

    // console.log('valores ubigeo distrito', ubigeoProvincia);

    this.distritos = this.distritosBase.filter(e => {

      return e.ubigeo.substring(0, 4) === ubigeoProvincia
    });

    if (defaultValue) {
      this.distrito.setValue(this.distritos[0].ubigeo);
    
    }
    try {
      this.valoresDeUbigeoFinal(this.distritos[0].ubigeo);
    } catch (error) {
      
    }
    
  }



  public valoresDeUbigeoFinal(distrito) {
    let ubigeoFinal = this.buscarUbigeoDistrito(distrito);
    this.codigoDeUbigeo.setValue(ubigeoFinal);
  }

  public buscarUbigeoDistrito(distritoAux) {
    let distritoArray = this.distritos.find(e => e.ubigeo === distritoAux)
    return distritoArray.ubigeo
  }

  //Funciones para setear ubigeo, distrito, provincia desde la empresa obtenida por el servicio externo
  public extraerUbigeo(direccion) {
    try {
      let direccionAux = direccion.split('-');
      if (direccionAux.length == 3) {

        let ubigeoProvincia = this.provinciasBase.find(provincia => provincia.nombre == direccionAux[1].trim()).ubigeo;

        let distritosFiltrados = this.distritosBase.filter(e => {
          return e.ubigeo.substring(0, 4) === ubigeoProvincia
        })
        let ubigeoDistrito = distritosFiltrados.find(e => e.nombre == direccionAux[2].trim()).ubigeo
        return ubigeoDistrito;
      } else {
        return "";
      }
    }
    catch
    {
        return "";
    }

  }

  public buscarUbigeo(codigo) {
    // console.log('buscar ubigeo', codigo);
    return this.catalogoDeUbigeos.find(ubg => ubg.ubigeo === codigo);
  }
  //#endregion

  //#region Funcion de guardar
  public guardar() {

    if (this.configuracionForm.valid) {
        
        if (cadenaEsVacia(this.codigo)) {

          this.ejecutar_Crear();
          
        }
        else
        {
  
          this.ejecutar_Modificar();
        } 


       
       
    }
    else {
      this.sharedModalService.mostrarMessageModal("Formulario inválido, verifique los campos e intente nuevamente", false);
      this.configuracionForm.markAllAsTouched();
    }
  }
  
  public limpiarFormulario(){

    this.configuracionForm.reset(); 
    this.formRef.resetForm();  
  }

  public ejecutar_Modificar() {
    
    this.spinner.showSquareFullScreen('empresa');
    let entidadAGuardar: Empresa = this.pasarFormularioAEntidad();
    this.entidadService.modificar(entidadAGuardar)
      .subscribe((resultado: any) => {
        this.spinner.hide('empresa');
        this.estadoDeFormulario.status = true;
        this.sharedModalService.mostrarMessageModalV2(resultado.mensaje, true)
            .afterClosed().subscribe( () => {

            this.close(); 
            }

            );
            
      }, (error: any) => {

        this.spinner.hide('empresa');
        try {
          this.sharedModalService.mostrarMessageModalV2(error.mensaje, false);
        } catch (e) {


          this.sharedModalService.mostrarMessageModal('Error al realizar la operaciôn.', false);
        } 
      })
  }


  public ejecutar_Crear() {
    
    this.spinner.showSquareFullScreen('empresa');
    let entidadAGuardar: Empresa = this.pasarFormularioAEntidad();
    this.entidadService.crear(entidadAGuardar)
      .subscribe((resultado: any) => {
        this.spinner.hide('empresa');
        this.estadoDeFormulario.status = true;
        this.sharedModalService.mostrarMessageModalV2(resultado.mensaje, true)
            .afterClosed().subscribe( () => {
                
                this.sharedModalService.mostrarDecisioneModal("¿Desea agregar un plan a la empresa nueva?", true)
                                        .afterClosed().subscribe((estadoDeFormulario : EstadoDeFormulario) => {

                      if(estadoDeFormulario.status){
                          
                              this.limpiarFormulario();
                              this.abrirFormularioRegistrarPlan(entidadAGuardar.codigo);
                              this.close();
                      }

                    }
                  );
              }

            );
            
      }, (error: any) => {

        this.spinner.hide('empresa');
        try {
          this.sharedModalService.mostrarMessageModalV2(error.mensaje, false);
        } catch (e) {
          this.sharedModalService.mostrarMessageModal('Error al realizar la operaciôn.', false);
        } 
      })
  }

  abrirFormularioRegistrarPlan(codigo : string) {
  

    return this.dialog.open(AsignarPlanEmpresaComponent, {
      disableClose: true,
      panelClass: 'myapp-no-padding-dialog',
      maxHeight: '10%',
      data: {
        
        codigoEmpresa: codigo,
                
      }
    })



  }; 

  public pasarFormularioAEntidad() : Empresa {


    
    let empresaADevolver: Empresa = {
      codigo : cadenaEsVacia(this.empresaActual.codigo)? generarCodigo() :this.empresaActual.codigo, 
      ruc: this.ruc.value.toString().trim(),
      razonSocial: this.razonSocial.value.toString().trim(),
      nombreComercial: this.nombreComercial.value.toString().trim(),
      tipoDeDocumentoDeIdentidad_empresa: '6',
      codigoDeUbigeo: this.codigoDeUbigeo.value.toString().trim(),
      direccionDetallada: this.direccion.value.toString().trim(),
      urbanizacion: this.urbanizacion.value.toString().trim(),

      
      departamento: this.regiones.find( x => x.ubigeo == this.region.value.toString().trim()).nombre,
      provincia: this.provinciasBase.find( x => x.ubigeo == this.provincia.value.toString().trim()).nombre,
      distrito: this.distritosBase.find(x => x.ubigeo == this.distrito.value.toString().trim()).nombre,
      estado:  Estado.Activado,
      codigoRevendedor : this.usuarioActual.codigo,
      
    };

    console.log('empresaADevolver',empresaADevolver);

     
    return empresaADevolver;
  }
  //#endregion

  //#region Buscar RUC
  public buscarRuc() {
   
     if(!cadenaEsVacia(this.ruc.value)){
  
        this.cargando_asincrono = true;
        this.externalService.buscarEmpresa(this.ruc.value)
            .subscribe((respuesta: EstadoDeConsulta<EmpresaExternal>) => {
    
              this.cargando_asincrono = false;
              console.log('respuesta', respuesta);
              let empresaSUNAT: EmpresaExternal = respuesta.valorObjeto;
              // console.log(empresaSUNAT)
              this.razonSocial.setValue(empresaSUNAT.razonSocial);
              this.nombreComercial.setValue('');
              this.direccion.setValue(empresaSUNAT.direccion);
              this.nombreComercial.setValue('');
              this.urbanizacion.setValue('');
              this.extraerUbigeoDireccion();
    
    
            }, (error: any) => {
    
              this.cargando_asincrono = false;
         })
     }
   
    
  }
  //#endregion Buscar RUC

  //#region Close dialog
  public closeWindow(close: boolean) {
    if (close) {
       this.close();
    }
  }

  public close(){

    this.dialogRef.close(this.estadoDeFormulario);

  }
  //#endregion Close Dialog

  //#region Validaciones inmediatas
  get ruc() {
    return this.configuracionForm.get('ruc');
  }
  get razonSocial() {
    return this.configuracionForm.get('razonSocial');
  }
  get nombreComercial() {
    return this.configuracionForm.get('nombreComercial');
  }
  get tipoDeDocumentoDeIdentidad_empresa() {
    return this.configuracionForm.get('tipoDeDocumentoDeIdentidad_empresa');
  }
  get urbanizacion() {
    return this.configuracionForm.get('urbanizacion');
  }
  get direccion() {
    return this.configuracionForm.get('direccion');
  }
  get region() {
    return this.configuracionForm.get('region');
  }
  get provincia() {
    return this.configuracionForm.get('provincia');
  }
  get distrito() {
    return this.configuracionForm.get('distrito');
  }
  get codigoDeUbigeo() {
    return this.configuracionForm.get('codigoDeUbigeo');
  }


  get plan () {

    return this.configuracionForm.get('plan');

  }  

  //#endregion

}
