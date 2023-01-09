import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Optional,
  Output,
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
import {  distinctUntilChanged} from 'rxjs/operators';
import {  } from 'jquery';
import { OnInit, OnChanges } from '@angular/core';
import { cadenaEsVacia } from 'src/app/core/helpers/string.helpers';
import { cloneObject } from 'src/app/core/helpers/prototype.helper';

export class Denominacion {

  valor :number;
  nombre : string;

  
  constructor() {

    this.valor =0;
    this.nombre ="";
    
  }

}


@Component({
  selector: 'app-seleccion-rapida-input',
  templateUrl: './seleccion-rapida-input.component.html',
  styleUrls: ['./seleccion-rapida-input.component.css'],
  providers: [
    { 
      provide: MatFormFieldControl, 
      useExisting: SeleccionRapidaInputComponent
    } ,
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => SeleccionRapidaInputComponent)
    } ,
    {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => SeleccionRapidaInputComponent)
      } 
    
    ],
  host: {
    '[class.input-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})


export class SeleccionRapidaInputComponent  implements AfterViewInit, ControlValueAccessor,Validator , MatFormFieldControl<number> , AfterViewChecked , OnInit,DoCheck ,  OnDestroy , OnChanges{
 

cantidadDeCheck = 0;
//#region  Identificador del control
  static nextId = 0;
  controlType = 'seleccion-rapida-input';
  id = `seleccion-rapida-input-${SeleccionRapidaInputComponent.nextId++}`;
//#endregion
  
  
//#region Valor entrante a calcular



  @Input()    
  valorInicial: number=0;

 
  listaDeDenominacion: Denominacion[] = 
  [ 
    { valor : 10 , nombre : '10'}, 
    { valor : 20 , nombre : '20'},
    { valor : 50 , nombre : '50'},
    { valor : 100 , nombre : '100'},
  
  ];

  @Output() 
  valorSeleccionado: EventEmitter<number> = new EventEmitter<number>();
//#endregion


//#region LifeHook
  sub :SubSink = new SubSink();

  @ViewChild('nominalInput') nominalInput: HTMLInputElement;


  constructor(  formBuilder: FormBuilder,
                private _focusMonitor: FocusMonitor,
                private _elementRef: ElementRef<HTMLElement>,
                @Self() @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
                private inj: Injector,
                ) {

                
                  this.parts = formBuilder.group({
                    
                            nominal: [0,[]],
                    
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
            this.nominal.setValue(this.valorInicial.toFixed(3))
            this.stateChanges.next();
          }
    };
  }

  ngAfterViewInit(): void {
    
   if(this.ngControl.control.hasValidator(Validators.required))
    {
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
    
    if (this.nominal.invalid) {

       errors = this.nominal.errors;
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

    this.sub.add( this.nominal
                      .valueChanges
                      .pipe(
                        distinctUntilChanged(),
                      ).subscribe((value : number) =>{

                        
                        this._value = value;
                        this.onChange(value);
                        this.onValidationChange();

                      }
                    )
                  );

  }
 

  actualizarValidator () {

    this.nominal.removeValidators(Validators.required);
    this.nominal.removeValidators(Validators.required);


    if (this._required) {

      this.nominal.addValidators(Validators.required);
      this.nominal.addValidators(Validators.required);

    }

    this.nominal.updateValueAndValidity();
  
    this.onValidationChange();
  }
//#endregion

  /** 
   * Evalua si el control está vacio
   */
  get empty() {
    
    
    return cadenaEsVacia(this.nominal.value);
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
    
    return true;
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

_value : number;
  /**
   * Devuelve un number . Si esta vació devuelte  number
  */
 
  get value(): number | null {
    
    return  this._value;
  }
  @Input()
  set value(procentajeNominal: number) {
 
    if (procentajeNominal) {

     
      this.onChange(cloneObject(procentajeNominal));
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

  get nominal() {
    return this.parts.get('nominal');
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
  onChange = (valor: number) => {};
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
  writeValue(valor: number): void {

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

  registarDenominacion(importeSeleccionado : number){
    
    this.nominal.setValue(importeSeleccionado.toFixed(3));
    this.valorSeleccionado.emit(importeSeleccionado);
    
  }

  validarEstadoHabilitado(valor){



    if(!cadenaEsVacia(valor)){

      if(this.valorInicial <=  valor){
      
        return false;
      }
      else {
        
         return true;
  
      }
    }
    else {

      return true;
    }
   

  }

}
