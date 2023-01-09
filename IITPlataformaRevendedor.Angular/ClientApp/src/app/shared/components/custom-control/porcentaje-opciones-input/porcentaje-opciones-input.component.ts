import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Optional,
  Self,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { Subject} from 'rxjs';
import { SubSink } from 'subsink';
import { distinctUntilChanged,  debounceTime } from 'rxjs/operators';
import {  } from 'jquery';
import { OnInit, OnChanges } from '@angular/core';
import { cloneObject } from 'src/app/shared/functions/prototype.helper';
import { cadenaEsVacia } from 'src/app/core/helpers/string.helpers';

export class PorcentajeNominalOpciones {
  porcentaje : number;
  nominal : number ;
  opciones : Opciones;


  constructor() {
    
    this.porcentaje = 0;
    this.nominal = 0;
    this.opciones = new Opciones();
  }
 
}
export class Opciones {

  codigo :string;
  nombre : string;
  porcentaje : number ;

  
  constructor() {

  this.codigo ="";
  this.nombre ="";
  this.porcentaje = 0;
    
  }

}

@Component({
  selector: 'app-porcentaje-opciones-input',
  templateUrl: './porcentaje-opciones-input.component.html',
  styleUrls: ['./porcentaje-opciones-input.component.css'],
  providers: [
    { 
      provide: MatFormFieldControl, 
      useExisting: PorcentajeOpcionesInputComponent
    } ,
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => PorcentajeOpcionesInputComponent)
    } ,
    {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => PorcentajeOpcionesInputComponent)
      } 
    
    ],
  host: {
    '[class.input-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})


export class PorcentajeOpcionesInputComponent  implements AfterViewInit, ControlValueAccessor,Validator , MatFormFieldControl<PorcentajeNominalOpciones> , AfterViewChecked , OnInit,DoCheck ,  OnDestroy , OnChanges{
 

cantidadDeCheck = 0;
//#region  Identificador del control
  static nextId = 0;
  controlType = 'porcentaje-opciones-input';
  id = `porcentaje-input-${PorcentajeOpcionesInputComponent.nextId++}`;
//#endregion
  
  
//#region Valor entrante a calcular


  @Input()    
  valorInicial: number=0;

  @Input()    
  opcionInicial: string="";

  @Input()    
  listaDeOpciones: Opciones[] =[];

//#endregion


//#region LifeHook
 sub :SubSink = new SubSink();



 @ViewChild('porcentajeInput') porcentajeInput: HTMLInputElement;
 @ViewChild('nominalInput') nominaljeInput: HTMLInputElement;




  constructor( formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    private inj: Injector,
    ) {

     
      this.parts = formBuilder.group({
        
        valorOpciones :  ['',[]],
        valorPorcentaje:  [0,[]],
        valorNominal:  [0,[]]
        
      });
      
      
       
  }
  ngAfterViewChecked(): void {
  
           
  }
  ngDoCheck(): void {
   
    if (this.cantidadDeCheck<3) {

        this.actualizarValidator();
      
        this.cantidadDeCheck = this.cantidadDeCheck + 1;
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {

    try {
      

      //console.log('changes' ,changes)
      if (changes.valorInicial) {
  
        if (this.valorInicial != null) {
  
          if(this.valorPorcentaje.value) {
  
            this.calcularValorDeEntidad();
          }
         
  
        }
       
      };
  
      if (changes.listaDeOpciones) {
  
        if (this.listaDeOpciones != null) {
          
      
          this.resetarOpciones();
          this.stateChanges.next();
  
        }
      };
     
      if (changes.opcionInicial) {
        //console.log('opcionInicial', this.opcionInicial);
        if (this.opcionInicial != null) {
  
          //console.log('opcionInicial', this.opcionInicial);
          if(this.listaDeOpciones){
  
             let opcionesIniciales :  Opciones =  this.listaDeOpciones.find(x => x.codigo ==this.opcionInicial);
             //console.log('opciones', opcionesIniciales);
             if( opcionesIniciales){
              
                this.valorOpciones.setValue(opcionesIniciales);
                this.stateChanges.next();
  
             }
             else {
              //console.log('opciones', opcionesIniciales);
              this.valorOpciones.setValue("");
              this.stateChanges.next();
  
             }
     
          }
          
        
        }
        else {
  
  
        } 
      };
  
    } catch (error) {
      
    }
  
  }

  resetarOpciones() {

    this.valorOpciones.setValue('');
    this._value.opciones.codigo = '';
    this._value.opciones.nombre = '';
    
    this.onChange(cloneObject(this._value));
    this.onValidationChange();

  }
  ngAfterViewInit(): void {
    
   

    if(this.ngControl.control.hasValidator(Validators.required))
    {
      //console.log(this._required);
      this._required = true;
    }
   
   
    const origFuncDirty = this.ngControl.control.markAsTouched;
    this.ngControl.control.markAsTouched = () => {
      origFuncDirty.apply(this.ngControl.control, arguments);
      this.parts.markAsTouched();
      this.touched = true;
      
    }

    const origFuncPristine = this.ngControl.control.markAsPristine;
    this.ngControl.control.markAsPristine = () => {
      origFuncPristine.apply(this.ngControl.control, arguments);
      this.touched = false;
      this.parts.markAsPristine();
      
      
    }
    
  }


  ngControl: NgControl;
  autofilled?: boolean;
 
  //#region Validator 

  validate(control: AbstractControl): ValidationErrors {
 
    let errors : any = {};
    
    if (this.valorPorcentaje.invalid) {

       errors = this.valorPorcentaje.errors;
    }

    else if (this.valorNominal.invalid) {

       errors = this.valorNominal.errors;
    }
    else if (this.valorOpciones.invalid) {

      errors = this.valorOpciones.errors;
   }
    else {

      errors = null;

    }
  
    return errors;

  }

 
  registerOnValidatorChange?(fn: () => void): void {

    this.onValidationChange = fn;
  }

  onValidationChange: any = () => {};

  //#endregion


  ngOnDestroy(): void {

    this.stateChanges.complete();
    this.sub.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);

  }

  ngOnInit(): void {

    this.ngControl = this.inj.get(NgControl);
    this.suscription();
    
   
  }
 
  suscription() {

    this.sub.add( this.valorPorcentaje
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
       
      ).subscribe(() =>{

        this.calcularValorDeEntidad();

      }));

      this.sub.add( this.valorOpciones
        .valueChanges
        .pipe(
            distinctUntilChanged(),
          
        ).subscribe(() =>{
  
          let opcionesIniciales :  Opciones =  this.listaDeOpciones.find(x => x.codigo ==this.valorOpciones.value.codigo);
        
          if( opcionesIniciales){
           
           
             this.valorPorcentaje.setValue(opcionesIniciales.porcentaje.toFixed(3));
          

          }
          else {

            //console.log('aqui false valorOpciones');
            this.valorPorcentaje.setValue("0.000");
          

          }
  
        }));
    
    
  }
 

  actualizarValidator () {

    this.valorPorcentaje.removeValidators(Validators.required);
    this.valorNominal.removeValidators(Validators.required);
    this.valorOpciones.removeValidators(Validators.required);


    if (this._required) {

      this.valorPorcentaje.addValidators(Validators.required);
      this.valorNominal.addValidators(Validators.required);
      this.valorOpciones.addValidators(Validators.required);

    }
    this.valorOpciones.updateValueAndValidity();
    this.valorPorcentaje.updateValueAndValidity();
    this.valorNominal.updateValueAndValidity();
  
    this.onValidationChange();
  }
//#endregion

  /** 
   * Evalua si el control está vacio
   */
  get empty() {
    
    
    return cadenaEsVacia(this.valorOpciones.value) && cadenaEsVacia(this.valorPorcentaje.value) && cadenaEsVacia(this.valorNominal.value);
    /* if(this.required){

      return cadenaEsVacia(numeroDeDocumentoDeIdentidad) && cadenaEsVacia(denominacion)

    }
    else {

      return false;
    } */
    
  }

  /**
   * La etiqueta flota si el control esta en focus y si no esta vacio
   */
  get shouldLabelFloat() {
    
    
    return this.focused || !(cadenaEsVacia(this.valorPorcentaje.value) && cadenaEsVacia(this.valorNominal.value));
  }

//#region Placeholder


  /**
   * Controla el comportamiento del placeholder. Se puede editar mediante [placeholder]="Placeholder"
  */
  @Input('aria-describedby') userAriaDescribedBy: string;
 
  get placeholder(): string {
    return this._placeholder;
  }
  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  _placeholder: string;

//#endregion

//#region Required

  /**
   * Controla el comportamiento Requerido. Se puede editar mediante [required]=false
  */
  private _required = false;
  
  get required(): boolean {
    return this._required;
  }
  @Input()
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

//#endregion

//#region Disabled

  /**
   * Controla el comportamiento Deshabilitado. Se puede editar  mediante [disabled]=false
  */
  
  get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

//#endregion

//#region Value

_value : PorcentajeNominalOpciones = new PorcentajeNominalOpciones() ;
  /**
   * Devuelve una persona . Si esta vació devuelte new Persona()
  */
 
  get value(): PorcentajeNominalOpciones | null {
    
    return  this._value;
  }
  @Input()
  set value(porcentajeNominal: PorcentajeNominalOpciones) {
 
    if (porcentajeNominal) {

     this._value = porcentajeNominal;
      this.onChange(cloneObject(porcentajeNominal));
      this.stateChanges.next();

    }   
      
  }

//#endregion

//#region  Configuración de búsqueda


//#endregion


//#region Formulario
 
 


  parts: FormGroup;

  get errorState(): boolean {

    if  (this._required){

      return this.parts.invalid  && this.touched; 
    }
    else {

      return false;
    }
   
  }

  get valorPorcentaje() {
    return this.parts.get('valorPorcentaje');
  }
  get valorNominal() {
    return this.parts.get('valorNominal');
  }
  get valorOpciones() {
    return this.parts.get('valorOpciones');
  }

  
//#endregion

//#region Focus

  focused = false;

  onFocusIn(event: FocusEvent) {

    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
    

  }

  onFocusOut(event: FocusEvent) {
    
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }

  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
  
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }

  }

//#endregion

//#region Seleccion del control
  setDescribedByIds(ids: string[]) {
      
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.row',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));

  }
//#endregion
 
//#region Control Value Accessor

  /**
   * Variable que determina si el control fue cambiado.
   */
  stateChanges = new Subject<void>();

  /**
   * Variable que determina si el control tiene estado touched.
  */
  touched = false;

  
  /**
   * 
   * Evento que informa que se hizo un cambio en el valor del control.
   * Externamente sirve para ejecutar valuechanges()
   */
  onChange = (porcentajeNominal: PorcentajeNominalOpciones) => {};
   /**
   * 
   * Evento que informa que el contron cambio a estado Touched.
   * 
   */
  onTouched = () => {};

   /**
   * 
   * Evento que se ejecuta cuando se toca el contenedor del componente
   * 
   */
  onContainerClick() {

  }
  /**
   * Este evento es utilizado por DetectChanges del FormModule. No se debe utilizar por el programador . Lo Utiliza la libreria. 
   */
  writeValue(valor: PorcentajeNominalOpciones): void {

    this._value = valor;
  }
  /**
   * Este evento es utilizado por DetectChanges del FormModule. No se debe utilizar por el programador . Lo Utiliza la libreria. 
   */
  registerOnChange(onChange: any): void {

    this.onChange = onChange;
  }
  /**
   * Este evento es utilizado por DetectChanges del FormModule. No se debe utilizar por el programador . Lo Utiliza la libreria. 
   */
  registerOnTouched(fn: any): void {
    
    this.onTouched = fn;
  }
  /**
   * Este evento es utilizado por DetectChanges del FormModule. No se debe utilizar por el programador . Lo Utiliza la libreria. 
   */
  setDisabledState?(isDisabled: boolean): void {

    this.disabled = isDisabled;
  }

//#endregion
 
   /**
    * Para una digitacion continua entre los dos inputs
    */
  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
   
    this.autoFocusNext(control, nextElement);
   
  }

  calcularValorDeEntidad(){
    
   
    let porcentajeNominal = new PorcentajeNominalOpciones();
    let value = this.valorPorcentaje.value;
    let opciones = this.valorOpciones.value;

    if (value) {
     
      porcentajeNominal.porcentaje = value;
      porcentajeNominal.nominal = this.valorInicial*value/100;
      
    }
    else {

      porcentajeNominal.porcentaje = 0;
      porcentajeNominal.nominal = this.valorInicial*value/100;
     
    }

    if(opciones){
      porcentajeNominal.opciones = opciones;
    
    }
    else {

      porcentajeNominal.opciones.codigo ='';
      porcentajeNominal.opciones.nombre ='';

    }

    this.valorNominal.setValue(porcentajeNominal.nominal.toFixed(3));
    this._value = cloneObject(porcentajeNominal);
    
   
    this.onChange(porcentajeNominal);
    this.onValidationChange();
    this.stateChanges.next();
      
  }
  validarPorcentaje(){

    let porcentaje : number = this.valorPorcentaje.value;
 
    if (!porcentaje){

      this.valorPorcentaje.setValue(0);
    }
    
  }


}
