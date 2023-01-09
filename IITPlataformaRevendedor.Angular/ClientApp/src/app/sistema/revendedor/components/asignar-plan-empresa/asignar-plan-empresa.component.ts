import { Component, OnInit, AfterViewInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFront } from 'src/app/core/models/user-front.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedModalService } from 'src/app/shared/services/shared-modal.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Plan } from 'src/app/sistema/models/plan.model';
import { SubSink } from 'subsink';
import { EmpresaPlan, Estado } from '../../models/empresa-plan.model';
import { EmpresaPlanService } from '../../services/empresa-plan.service';
import { cadenaEsVacia } from '../../../../core/helpers/string.helpers';
import { generarCodigo } from '../../../../core/helpers/other.helpers';
import { EstadoDeFormulario } from '../../../../shared/models/estado-de-formulario.model';
import { EstadoDeEjecucion } from '../../../../shared/models/estado-de-ejecucion.model';
import { EstadoDeConsulta } from 'src/app/shared/models/estado-de-consulta.model';
import { PlanService } from '../../../services/plan.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-asignar-plan-empresa',
  templateUrl: './asignar-plan-empresa.component.html',
  styleUrls: ['./asignar-plan-empresa.component.css']
})
export class AsignarPlanEmpresaComponent implements OnInit , AfterViewInit {
  listaPlanes : Plan[] =[]
  formulario : FormGroup;  
  codigo : string ;
  codigoEmpresa  : string ; 
  estadoDeFormulario: EstadoDeFormulario = new EstadoDeFormulario();
  public subs = new SubSink();
  public usuarioActual: UserFront = new UserFront();
  public empresaPlanActual : EmpresaPlan = new EmpresaPlan();
  @ViewChild(MatSelect) matSelect: MatSelect;

  constructor(public dialog: MatDialog,
              private spinnerService: SpinnerService,
              private entidadService: EmpresaPlanService,
              private sharedModalService: SharedModalService,
              private authService : AuthService,
              private planService : PlanService,
              private dialogRef: MatDialogRef<AsignarPlanEmpresaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) { 

                if(this.data) {

                  this.codigo = this.data.codigo;
                }  

                this.codigoEmpresa = this.data.codigoEmpresa;

            
  }

  ngAfterViewInit(): void {
    
    this.cargarDatosIniciales();

    console.log('this.codigo',this.codigo);

    if(!cadenaEsVacia(this.codigo)){

     
      setTimeout(() => {
        this.matSelect.disabled = true;
        this.buscar();

      }, 500);
      
    }
  }

  ngOnInit(): void {
  
    this.crearFormulario();
    

  }

  crearFormulario(){

    this.formulario =  new FormGroup({ 
                                plan  : new FormControl( '' , [Validators.required]),
                                cantidadDispositoMaximo : new FormControl('' , [Validators.required])
                                
                                });

  }


  cargarDatosIniciales(){

    this.spinnerService.showSquareFullScreen('asignar-plan');

    this.planService.listarActivo().subscribe( (resultado :any) => {
      
      this.spinnerService.hide('asignar-plan');
      console.log('resultado', resultado);
      this.listaPlanes = resultado.valorObjeto;
    

    } , (error : any)=> {

        this.spinnerService.hide('asignar-plan');
        this.listaPlanes = [];
        
    } )

  }

  crearSuscripciones() {

 
    this.subs.add(
      this.authService.usuarioChanged$.subscribe( (usuario : UserFront)=> {
          
          this.usuarioActual = usuario;
          
      }));

      
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

    this.subs.add(
        
      this.dialogRef.backdropClick().subscribe(event => {
        this.close();
      })
      
    
  );

  }

  guardar(){

    if(this.formulario.valid) {

      if (!this.codigo) {

          this.ejecutar_Guardar();
      }
      else {
        
        this.ejecutar_Modificar();
      }


    }
    else {

      this.sharedModalService.mostrarMessageModal("Formulario inválido, verifique los campos e intente nuevamente", false);
      this.formulario.markAllAsTouched();

    }

  }
  ejecutar_Modificar() {
    this.spinnerService.showSquareFullScreen('asignar-plan');
    let entidadAGuardar: EmpresaPlan = this.pasarFormularioAEntidad();
    this.entidadService.actualizarPlan(entidadAGuardar).subscribe((respuesta:EstadoDeEjecucion)  => {
      this.estadoDeFormulario.status = true;
        this.sharedModalService.mostrarMessageModalV2(respuesta.mensaje, true)
        .afterClosed().subscribe( () => {
  
                this.close(); 
            }
  
        );

    }, (error:EstadoDeEjecucion) => {

      this.spinnerService.hide('asignar-plan');
      try {
        this.sharedModalService.mostrarMessageModalV2(error.mensaje, false);
      } catch (e) {
        this.sharedModalService.mostrarMessageModal('Error al realizar la operaciôn.', false);
      } 


    });
  }
  ejecutar_Guardar() {


    this.spinnerService.showSquareFullScreen('asignar-plan');
    let entidadAGuardar: EmpresaPlan = this.pasarFormularioAEntidad();
    this.entidadService.crearPlan(entidadAGuardar).subscribe((respuesta:EstadoDeEjecucion)  => {
  
      this.estadoDeFormulario.status = true;
      this.sharedModalService.mostrarMessageModalV2(respuesta.mensaje, true)
      .afterClosed().subscribe( () => {

              this.close(); 
          }

      );

    }, (error:EstadoDeEjecucion) => {

      this.spinnerService.hide('asignar-plan');
      try {
        this.sharedModalService.mostrarMessageModalV2(error.mensaje, false);
      } catch (e) {
        this.sharedModalService.mostrarMessageModal('Error al realizar la operaciôn.', false);
      } 


    });
  }

  buscar(){

    this.spinnerService.showSquareFullScreen('asignar-plan');  

    this.entidadService.buscarPorCodigo(this.codigo )
    .subscribe((resultado: EstadoDeConsulta<EmpresaPlan>) => {
    
      this.empresaPlanActual = resultado.valorObjeto;
      this.spinnerService.hide('asignar-plan');  
      this.pasarEntidadAFormulario(this.empresaPlanActual);
      
      


      } , (error: EstadoDeConsulta<EmpresaPlan>)=>{

        this.spinnerService.hide('asignar-plan');   

        try {
          this.sharedModalService.mostrarMessageModalV2(error.mensaje, false).afterClosed().subscribe(() => {
            this.close();
          } );
        } catch (e) {
          this.sharedModalService.mostrarMessageModal('Error al realizar la operaciôn.', false).afterClosed().subscribe(() => {
            
            this.close();

          });
        } 

        

      })

    

  }
  pasarFormularioAEntidad(): EmpresaPlan {
    
      let entidad : EmpresaPlan = new EmpresaPlan();
      entidad.codigo =  cadenaEsVacia(this.empresaPlanActual.codigo)==true? generarCodigo() : this.empresaPlanActual.codigo;
      entidad.cantidadDispositoMaximo = this.cantidadDispositoMaximo.value;
      entidad.codigoEmpresa = this.codigoEmpresa;
      entidad.codigoPlan = this.plan.value;
      entidad.estado = Estado.Activado;
      

      return entidad ;
  }

  pasarEntidadAFormulario( empresaPlan :EmpresaPlan) {

    this.plan.setValue(empresaPlan.codigoPlan);
    this.cantidadDispositoMaximo.setValue(empresaPlan.cantidadDispositoMaximo);

  }
  
  get plan (){

    return this.formulario.get("plan");

  }

  get cantidadDispositoMaximo (){

    return this.formulario.get("cantidadDispositoMaximo");

  }

  closeWindow(close: boolean){
  
     this.close();
  }

  close() {

    this.dialogRef.close(this.estadoDeFormulario)

  }
}
