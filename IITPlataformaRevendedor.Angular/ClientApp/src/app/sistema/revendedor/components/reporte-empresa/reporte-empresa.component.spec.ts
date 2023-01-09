import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteEmpresaComponent } from './reporte-empresa.component';



describe('ReporteEmpresaComponent', () => {
  let component: ReporteEmpresaComponent;
  let fixture: ComponentFixture<ReporteEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
