import {FocusMonitor} from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
/** Clase que configura el control. */
export class SerieYNumero {
  constructor(public serie: string, public numero: string) {}
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'serie-numero-input',
  templateUrl: 'serie-numero-input.component.html',
  styleUrls: ['serie-numero-input.component.css'],
  providers: [{provide: MatFormFieldControl, useExisting: SerieNumeroInputComponent}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class SerieNumeroInputComponent implements ControlValueAccessor, MatFormFieldControl<SerieYNumero>, OnDestroy {
  static nextId = 0;
  @ViewChild('serie') serieInput: HTMLInputElement;
  @ViewChild('numero') numeroInput: HTMLInputElement;
  

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'serie-numero';
  id = `serie-numero-${SerieNumeroInputComponent.nextId++}`;
  
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {
      value: {serie, numero},
    } = this.parts;

    return !serie && !numero;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): SerieYNumero | null {
    if (this.parts.valid) {
      const {
        value: {serie, numero},
      } = this.parts;
      return  new SerieYNumero(serie, numero);
    }
    return null;
  }
  set value(serieYNumero: SerieYNumero | null) {
    const {serie, numero} = serieYNumero || new SerieYNumero('', '');
    this.parts.setValue({serie, numero});
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
   
  ) {
    this.parts = formBuilder.group({
      serie: [null, [Validators.minLength(4)]],
      numero: [null, [Validators.minLength(1)]],
      
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

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

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.row-fluid',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
   /*  if (this.parts.controls.serie.valid) {
      this._focusMonitor.focusVia(this.numeroInput, 'program');
    } else if (this.parts.controls.numero.valid) {
      this._focusMonitor.focusVia(this.serieInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.serieInput, 'program');
    } */
  }

  writeValue(serieYNumero: SerieYNumero | null): void {
    this.value = serieYNumero;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
}