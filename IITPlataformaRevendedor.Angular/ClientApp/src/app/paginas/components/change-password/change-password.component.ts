import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserFront } from 'src/app/core/models/user-front.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { SharedModalService } from 'src/app/shared/services/shared-modal.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { SubSink } from 'subsink';
import { CambiarPassword } from '../../../core/models/cambio-password.model';

 

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  //#region Variables publicas
  public passwordForm: FormGroup;
  public ocultar = true;
  public ocultarContrasenhaActual = true;
  public ocultarConfirNewPassword = true;

  public usuarioFront: UserFront;

  public subs = new SubSink();
  public showTextPassword: boolean = false;
  public showTextPasswordConfirm: boolean = false;
  //#endregion Variables publicas

  //#region Lifecycle Method - Angular
  constructor(public dialog: MatDialog,
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService,
    private spinner: SpinnerService,
    private sharedModalService : SharedModalService ) 
  {
    
    this.controlesDelFormulario();
   }

  ngOnInit(): void {
    this.crearSuscripciones();
  }
  //#endregion Lifecycle Method - Angular

  //#region Reactiveforms
  public controlesDelFormulario(){
    this.passwordForm = new FormGroup({
      codigoUsuario: new FormControl('', []),
      contrasenhaActual: new FormControl('', [Validators.required]),
      contrasenhaNueva: new FormControl('', [Validators.required]),
      confirmacionContrasenhaNueva: new FormControl('',[Validators.required])
    });
  }
  //#endregion ReactiveForms

  //#region Suscripciones
  public crearSuscripciones(){
    this.subs.add(this.authService.usuarioChanged$
      .subscribe((usuario:UserFront)=>{
        this.usuarioFront = usuario;
        if(this.usuarioFront.codigo == ""){
          this.router.navigate(['/login']);
        }
      }));
  }
  //#endregion Suscripciones

  //#region Cambiar contrasenha
  public cambiarContrasenha(formValue){
      if(this.passwordForm.valid){
        if(this.validacionDeContrasenhaV2()){
          this.showTextPassword = false;
          if(this.validacionConfirmacionContrasenha()){
            // console.log('ejecutar cambiar')
            this.showTextPasswordConfirm = false;
            this.ejecutar_cambioDeContrasenha(formValue);
          }else{
            this.showTextPasswordConfirm = true;
            this.confirmacionContrasenhaNueva.setErrors({'incorrect': true});
          }
        }else{
          this.showTextPassword = true;
          this.contrasenhaNueva.setErrors({'incorrect': true});
        }
      }else{
        this.sharedModalService.mostrarMessageModal("Formulario inválido, verifique los campos e intente nuevamente", false);      
        this.passwordForm.markAllAsTouched();
      }
  }
  public validacionDeContrasenhaV2(){
    if(this.contrasenhaNueva.value.length >= 6 && this.contrasenhaNueva.value != this.contrasenhaActual.value && this.contrasenhaNueva.value !='123456'){
      return true;
    }else{
      return false;
    }
  }
  public validacionDeContrasenha(){
    const regex = /\d/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    let contienenumber = regex.test(this.contrasenhaNueva.value);
    let contieneMayusculas = upper.test(this.contrasenhaNueva.value);
    let contieneMinusculas = lower.test(this.contrasenhaNueva.value);
   
    if(this.contrasenhaNueva.value.length >= 6 && contienenumber  && (contieneMayusculas || contieneMinusculas)){
      // console.log('contiene numero ,tiene mas de 6 caracteres, contiene mayusculas y contiene minusculas');
      return true;
    }else{ 
      // console.log('no contienes')
       return false;
    }
  }
  public validacionConfirmacionContrasenha(){
   // console.log('antes de comparar contrasenhas', this.contrasenhaNueva.value, this.confirmacionContrasenhaNueva.value)
    if(this.contrasenhaNueva.value == this.confirmacionContrasenhaNueva.value){
      return true
    }else{
      return false
    }
  }
  public ejecutar_cambioDeContrasenha(formValue){

    this.spinner.showSquareFullScreen("change-password");
    let cambioContrasenha: CambiarPassword = this.pasarFormularioAEntidad(formValue);
    this.usuarioService.cambiarContrasenha(cambioContrasenha)
    .subscribe((respuesta:any)=>{

      this.spinner.hide("change-password");
      this.authService.setearEstadoDeCambioDeContrasenha(true);
      this.sharedModalService.mostrarMessageModal(respuesta.value.mensaje.mensajeGenerado, true)
      .afterClosed().subscribe(result => { 
        if(result){
          this.router.navigate(['/sistema']);
        }
       });;
    }, (error: any)=>{
      this.spinner.hide("change-password");
      try {
        this.sharedModalService.mostrarMessageModal(error.error.value.mensaje.mensajeGenerado, false);
      } catch (e) {
        this.sharedModalService.mostrarMessageModal('Error al conectar con el servidor, intente recargar la página', false);
      }
    });
  }
  public pasarFormularioAEntidad(formValue){
  let contrasenhaAux: CambiarPassword = {
    contrasenhaActual: formValue.contrasenhaActual,
    contrasenhaNueva: formValue.contrasenhaNueva
  }
  return contrasenhaAux;
  }
  
  //#endregion Cambiar contrasenha

  //#region Volver a Login
  public volverALogin(){
    this.router.navigate(['/login']);
  }
  //#endregion Volver a Login

  //#region Validaciones inmediatas
  get codigoUsuario() {
    return this.passwordForm.get('codigoUsuario');
  }
  get contrasenhaActual() {
    return this.passwordForm.get('contrasenhaActual');
  }
  get contrasenhaNueva() {
    return this.passwordForm.get('contrasenhaNueva');
  }
    get confirmacionContrasenhaNueva() {
    return this.passwordForm.get('confirmacionContrasenhaNueva');
  }
  //#endregion Validaciones inmediatas

  //#region Funciones comunes

  //#endregion

}
