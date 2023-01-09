import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeOpcionesInputComponent } from './porcentaje-opciones-input.component';

describe('PorcentajeOptionsInputComponent', () => {
  let component: PorcentajeOpcionesInputComponent;
  let fixture: ComponentFixture<PorcentajeOpcionesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorcentajeOpcionesInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcentajeOpcionesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
