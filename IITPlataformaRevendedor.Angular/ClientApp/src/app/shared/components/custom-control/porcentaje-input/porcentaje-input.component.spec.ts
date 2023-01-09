import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeInputComponent } from './porcentaje-input.component';

describe('PorcentajeInputComponent', () => {
  let component: PorcentajeInputComponent;
  let fixture: ComponentFixture<PorcentajeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorcentajeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcentajeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
