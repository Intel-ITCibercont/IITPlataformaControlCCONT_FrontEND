import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEmpresaPlanComponent } from './reporte-empresa-plan.component';

describe('ReporteEmpresaPlanComponent', () => {
  let component: ReporteEmpresaPlanComponent;
  let fixture: ComponentFixture<ReporteEmpresaPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEmpresaPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEmpresaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
