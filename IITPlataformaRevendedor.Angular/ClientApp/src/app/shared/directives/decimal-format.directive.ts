import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";
import { CustomDecimalPipe } from "../pipes/custom-decimal.pipe";

@Directive({ selector: "[DecimalFormatterDirective]" })
export class DecimalFormatterDirective implements OnInit {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private customDecimalPipe: CustomDecimalPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.customDecimalPipe.transform(this.el.value);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.el.value = this.customDecimalPipe.parse(value); 
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.customDecimalPipe.transform(value);
  }

}