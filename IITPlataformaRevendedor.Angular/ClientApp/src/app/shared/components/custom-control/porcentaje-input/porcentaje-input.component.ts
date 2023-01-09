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
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import {  } from 'jquery';
import { OnInit, OnChanges } from '@angular/core';
import { cadenaEsVacia } from 'src/app/core/helpers/string.helpers';
import { cloneObject } from 'src/app/core/helpers/prototype.helper';

export class PorcentajeNominal {
  porcentaje : number;
  nominal : number ;
 
 
  constructor() {
    this.porcentaje = 0;
    this.nominal =0;

  }
}
@Component({
  selector: 'app-porcentaje-input',
  templateUrl: './porcentaje-input.component.html',
  styleUrls: ['./porcentaje-input.component.css'],
  providers: [
    { 
      provide: MatFormFieldControl, 
      useExisting: PorcentajeInputComponent
    } ,
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => PorcentajeInputComponent)
    } ,
    {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => PorcentajeInputComponent)
      } 
    
    ],
  host: {
    '[class.input-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})


export class PorcentajeInputComponent  implements AfterViewInit, ControlValueAccessor,Validator , MatFormFieldControl<PorcentajeNominal> , AfterViewChecked , OnInit,DoCheck ,  OnDestroy , OnChanges{
 

cantidadDeCheck = 0;
//#region  Identificador del control
  static nextId = 0;
  controlType = 'porcentaje-input';
  id = `porcentaje-input-${PorcentajeInputComponent.nextId++}`;
//#endregion
  
  
//#region Valor entrante a calcular

 

  @Input()    
  porcentajeInicial: number=0;

  @Input()    
  valorInicial: number=0;

//#endregion


//#region LifeHook
 sub :SubSink = new SubSink();



 @ViewChild('porcentajeInput')porcentajeInput!: HTMLInputElement;
 @ViewChild('nominalInput') nominalInput!: HTMLInputElement;



  constructor( formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    private inj: Injector,
    ) {

     
      this.parts = formBuilder.group({
        
        valorPorcentaje: [ 0, []],
        valorNominal: [ 0 , []],
        
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
  
    if (changes.valorInicial) {

      if (this.valorInicial != null) {        
      
          if(this.valorPorcentaje?.value) {

            this.calcularPorcentajeYValorNominal();

          }
        ////console.log( 'ngOnChanges valorInicial aqui',this.valorInicial );
      
     

      }
    };

    if (changes.porcentajeInicial) {

    if (this.porcentajeInicial != null) {
       //// console.log(' ngOnChanges  porcentajeInicial aqui',this.porcentajeInicial );
        this.valorPorcentaje?.setValue(this.porcentajeInicial.toFixed(3));
        ;

      }
    };

   
    
  
    
  }
  ngAfterViewInit(): void {
    
   

    if(this.ngControl?.control?.hasValidator(Validators.required))
    {
      this._required = true;
    }
   
   
    const origFuncDirty = this.ngControl?.control?.markAsTouched;
    this.ngControl.control.markAsTouched = () => {
      origFuncDirty.apply(this.ngControl?.control, arguments);
      this.parts.markAsTouched();
      this.touched = true;
      
    }

    const origFuncPristine = this.ngControl?.control?.markAsPristine;
    this.ngControl.control.markAsPristine = () => {
      origFuncPristine.apply(this.ngControl?.control, arguments);
      this.parts.markAsPristine();
       this.touched = false;
      
      
    }
    
  }


  ngControl: NgControl | null;
  autofilled?: boolean;
 
  //#region Validator 

  validate(control: AbstractControl): ValidationErrors {
   
    let errors : any = {};
    
    if (this.valorNominal?.invalid) {

       errors = this.valorNominal.errors;
    }

    else if (this.valorNominal?.invalid) {

       errors = this.valorNominal.errors;
    }
    else {

      errors = null;

    }

   //// console.log('errors', errors);
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

    this.sub.add( this.valorPorcentaje?.valueChanges.pipe(distinctUntilChanged() , debounceTime(500)).subscribe(() =>{
       // console.log('Suscription valorPorcentaje');
        this.calcularPorcentajeYValorNominal();

      }));

    
    
  }

  actualizarValidator () {

    this.valorPorcentaje?.removeValidators(Validators.required);
    this.valorNominal?.removeValidators(Validators.required);


    if (this._required) {

      this.valorPorcentaje?.addValidators(Validators.required);
      this.valorNominal?.addValidators(Validators.required);

    }

    this.valorPorcentaje?.updateValueAndValidity();
    this.valorNominal?.updateValueAndValidity();
    
    this.onValidationChange();
  }
//#endregion

  /** 
   * Evalua si el control está vacio
   */
  get empty() {
    
    return cadenaEsVacia(this.valorPorcentaje?.value) && cadenaEsVacia(this.valorNominal?.value);
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
    
    return this.focused || !this.empty;
  }

//#region Placeholder


  /**
   * Controla el comportamiento del placeholder. Se puede editar mediante [placeholder]="Placeholder"
  */
  @Input('aria-describedby')
  userAriaDescribedBy!: string;
 
  get placeholder(): string {
    return this._placeholder;
  }
  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  _placeholder!: string;

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

_value : PorcentajeNominal =new PorcentajeNominal();
  /**
   * Devuelve una persona . Si esta vació devuelte new Persona()
  */
 
  get value(): PorcentajeNominal {
    
    return  this._value;
  }
  @Input()
  set value(procentajeNominal: PorcentajeNominal) {
 
    if (procentajeNominal) {

      this._value =procentajeNominal;
      this.valorNominal?.setValue(procentajeNominal.nominal.toFixed(3));
      this.valorPorcentaje?.setValue(procentajeNominal.porcentaje.toFixed(3));
      this.onChange(cloneObject(procentajeNominal));
      this.onValidationChange();
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
  onChange = (porcentajeNominal : PorcentajeNominal) => {};
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
  writeValue(importeInicial: PorcentajeNominal): void {

    this._value = importeInicial;
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

  calcularPorcentajeYValorNominal(){

    let porcentajeNominal = new PorcentajeNominal();
    let valuePorcentajeActual = this.valorPorcentaje?.value;
   
    if (valuePorcentajeActual) {
      //console.log(true);
     
      porcentajeNominal.porcentaje = valuePorcentajeActual;
      porcentajeNominal.nominal = (this.valorInicial*valuePorcentajeActual/100)?(this.valorInicial*valuePorcentajeActual/100):0;
     
    }
    else {
      

      //console.log(false);
      porcentajeNominal.porcentaje = 0;
      porcentajeNominal.nominal = 0;
    
    }

    this.valorNominal?.setValue(porcentajeNominal.nominal.toFixed(3));
    this._value =cloneObject(porcentajeNominal);
    //console.log(porcentajeNominal);
    this.onChange(porcentajeNominal);
    this.onValidationChange();
    this.stateChanges.next();
       
  
  }

  validarPorcentaje(){

    let porcentaje : number = this.valorPorcentaje?.value;
 
    if (!porcentaje){

      this.valorPorcentaje?.setValue(0);
    }
    
  }
}
