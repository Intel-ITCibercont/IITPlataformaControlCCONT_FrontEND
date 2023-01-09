import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Formulario } from '../../../models/formulario.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModalService } from 'src/app/shared/services/shared-modal.service';
import { hexToRgb, rgbToHex } from 'src/app/shared/functions/color.helpers';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfiguracionMarca } from '../../models/configuracion-marca.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Usuario } from '../../../../core/models/usuario.model';
import { SubSink } from 'subsink';
import { ConfiguracionMarcaService } from '../../services/configuracion-marca.service';
import { UserFront } from '../../../../core/models/user-front.model';
import { cadenaEsVacia } from '../../../../core/helpers/string.helpers';
import { generarCodigo } from '../../../../core/helpers/other.helpers';
import { EstadoDeConsulta } from '../../../../shared/models/estado-de-consulta.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoDeFormulario } from '../../../../shared/models/estado-de-formulario.model';

@Component({
  selector: 'app-revendedor-configuracion-marca',
  templateUrl: './revendedor-configuracion-marca.component.html',
  styleUrls: ['./revendedor-configuracion-marca.component.css']
})
export class RevendedorConfiguracionMarcaComponent implements OnInit , AfterViewInit {
  imgLogo: any = "../../../../assets/img/logoInBlack.png";
  formulario:FormGroup ; 
  imageFile;
  imgAsUint8: any;
  imgAsNumArray: any = null;
  usuarioActual : UserFront;
  sub : SubSink = new SubSink();
  estadoDeFormulario = new EstadoDeFormulario();
  entidadActual: ConfiguracionMarca;
  logoFueCambiado : boolean = true;

  constructor( private sharedModalService : SharedModalService,
                private authService: AuthService,
                private spinner: SpinnerService,
                private entidadService : ConfiguracionMarcaService,
                private dialogRef: MatDialogRef<RevendedorConfiguracionMarcaComponent>, 
                ) {
  
                this.crearFormulario();
                this.crearSuscripciones();
  }


  ngAfterViewInit(): void {

  
  }

  ngOnInit(): void {

    this.buscarPorRevendedor(this.usuarioActual.codigo);
  
  }
  

  get logoLink () {
		return this.formulario.get('logoLink');
	}
	get colorPaletaPrincipal () {
		return this.formulario.get('colorPaletaPrincipal');
	}
	get colorPaletaSecundario () {
		return this.formulario.get('colorPaletaSecundario');
	}
	get colorPaletaTercerario () {
		return this.formulario.get('colorPaletaTercerario');
	}
	get colorPaletaCuaternario () {
		return this.formulario.get('colorPaletaCuaternario');
	}

  crearFormulario () {
  
      this.formulario = new FormGroup ( {
      
        colorPaletaPrincipal : new FormControl('', [Validators.required]),
        colorPaletaSecundario : new FormControl('', [Validators.required]),
        colorPaletaTercerario : new FormControl('', [Validators.required]),
        colorPaletaCuaternario : new FormControl('', [Validators.required])
        
    }) 

  }

 
  crearSuscripciones () {

      this.sub.add(
            this.authService.usuarioChanged$.subscribe( (usuario : UserFront)=> {
                console.log('this.usuarioActual', usuario);
                this.usuarioActual = usuario;
              
            })

      );

      this.sub.add(
        this.dialogRef.keydownEvents().subscribe(event => {
          if (event.key === "Escape") {
            this.close();
          }
        })
    
      );

      this.sub.add(
          
          this.dialogRef.backdropClick().subscribe(event => {
            this.close();
          })
        
      );

  }


  
  pasarFormularioAEntidad() : ConfiguracionMarca {

    let entidad : ConfiguracionMarca = new ConfiguracionMarca();
    if(this.imgLogo){

       entidad.logoBase64 = this.imgLogo.replace('data:image/png;base64,', '');

    }
    else {

       entidad.logoBase64 = null;
    }
     
    if(cadenaEsVacia(entidad.codigo)) {

      entidad.codigo = generarCodigo();
    }
    else {

      entidad.codigo = this.entidadActual.codigo;

    }
    entidad.codigoRevendedor = this.usuarioActual.codigo;
    entidad.colorPaletaPrincipal = this.pasarColorARgb(this.colorPaletaPrincipal.value);
    entidad.colorPaletaSecundario = this.pasarColorARgb(this.colorPaletaSecundario.value);
    entidad.colorPaletaTercerario = this.pasarColorARgb(this.colorPaletaTercerario.value);
    entidad.colorPaletaCuaternario = this.pasarColorARgb(this.colorPaletaCuaternario.value);
    entidad.logoFueCambiado = this.logoFueCambiado;
    return entidad;

  }

  pasarEntidadAFormulario (){
   
    this.logoFueCambiado = false;
    this.pasaImgAForm(this.entidadActual.logoLink);
    this.colorPaletaPrincipal.setValue(this.pasarColorAHex(this.entidadActual.colorPaletaPrincipal));
    this.colorPaletaSecundario.setValue(this.pasarColorAHex(this.entidadActual.colorPaletaSecundario));
    this.colorPaletaTercerario.setValue(this.pasarColorAHex(this.entidadActual.colorPaletaTercerario));
    this.colorPaletaCuaternario.setValue(this.pasarColorAHex(this.entidadActual.colorPaletaCuaternario));
    
  }

  guardarCambios() {

    if(this.formulario.valid) {

      this.ejecutar_guardar();
    }
    else
    {
      this.sharedModalService.mostrarMessageModal("Formulario inválido, verifique los campos e intente nuevamente", false);
    }
  }

  ejecutar_guardar() {

    this.spinner.showSquareFullScreen("configuracion-marca");
    let entidadAGuardar: ConfiguracionMarca = this.pasarFormularioAEntidad();
    this.entidadService.guardarCambios(entidadAGuardar).subscribe(
      (resultado: any) => {
        this.estadoDeFormulario.status = true;
        this.sharedModalService.mostrarMessageModal(resultado.mensaje.mensajeGenerado, true);
        this.spinner.hide("configuracion-marca");
  

      }, (error: any) => {
      
        this.spinner.hide("configuracion-marca");
        try {
          this.sharedModalService.mostrarMessageModal(error.error.mensaje.mensajeGenerado, false);

        } catch (e) {
          this.sharedModalService.mostrarMessageModal('Error al conectar con el servidor', false);
        }
      });

  }

  buscarPorRevendedor(codigoUsuario : string) {
  console.log('codigoUsuario', codigoUsuario);
    this.spinner.showSquareFullScreen("configuracion-marca");
      this.entidadService.buscarPorRevendedor(codigoUsuario).subscribe(
        ( respuesta : EstadoDeConsulta<ConfiguracionMarca>) => {
          this.spinner.hide("configuracion-marca");
          console.log('respuesta',respuesta);
          this.entidadActual = respuesta.valorObjeto;
          this.pasarEntidadAFormulario();
  
      } , (error : any)=> {
        this.spinner.hide("configuracion-marca");
        try {
          this.sharedModalService.mostrarMessageModal(error.error.mensaje.mensajeGenerado, false);

        } catch (e) {
          this.sharedModalService.mostrarMessageModal('Error al conectar con el servidor', false);
        }

      })
  }

  pasaImgAForm(src){
    try {

      console.log('src', src);

      if (!cadenaEsVacia(src)) {
     
        this.imgLogo = `${src}`;
      }
      else {
        this.imgLogo = "../../../../../assets/img/logo-negro.png";
      }
    } catch {

      this.imgLogo = "../../../../../assets/img/logo-negro.png";
    }
    console.log('this.imgLogo', this.imgLogo);
  }

  pasarColorARgb(hex){
    let rgb: any = hexToRgb(hex);
    return rgb.replaceAll('x',';');
    }

  pasarColorAHex(rgb){
      let hexDesdefront = rgb.replaceAll(';','x');
      let hex = rgbToHex(hexDesdefront);
      return hex;
    }
  
  cargarImagen(event) {

    if(event.target.files.length != 0){
    
      if(event.target.files[0].name.endsWith(".png")) {

        let image = document.getElementById('logoImage') as HTMLImageElement;
        image.src = URL.createObjectURL(event.target.files[0]);
  
        let readerArray = new FileReader();
        let readerUrl = new FileReader();
  
        this.imageFile = event.target.files[0];
        readerArray.readAsArrayBuffer(this.imageFile);
        readerUrl.readAsDataURL(this.imageFile);
  
  
        readerUrl.onload = () => {
  
          this.imgLogo = readerUrl.result
          
        }
        this.logoFueCambiado = true;

      }
      else {

        this.sharedModalService.mostrarMessageModal("Formato de archivo no soportado. Cargue una imagen en  formato .png", false);


      }

     
    }
  
  }

  eliminarImagen () {

    let image = document.getElementById('logoImage') as HTMLImageElement;
    image.src = null;
    this.imgLogo = null;

  }

  closeWindow() {

    this.close();

  }

  close(){

      this.dialogRef.close(this.estadoDeFormulario);

  }
}
