import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionRapidaInputComponent } from './seleccion-rapida-input.component';

describe('SeleccionRapidaInputComponent', () => {
  let component: SeleccionRapidaInputComponent;
  let fixture: ComponentFixture<SeleccionRapidaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionRapidaInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionRapidaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
