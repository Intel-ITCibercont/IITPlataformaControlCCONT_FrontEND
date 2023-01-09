import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionButtonComponent } from './seleccion-button.component';

describe('SeleccionButtonComponent', () => {
  let component: SeleccionButtonComponent;
  let fixture: ComponentFixture<SeleccionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
