import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendedorConfiguracionMarcaComponent } from './revendedor-configuracion-marca.component';

describe('RevendedorConfiguracionMarcaComponent', () => {
  let component: RevendedorConfiguracionMarcaComponent;
  let fixture: ComponentFixture<RevendedorConfiguracionMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevendedorConfiguracionMarcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevendedorConfiguracionMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
