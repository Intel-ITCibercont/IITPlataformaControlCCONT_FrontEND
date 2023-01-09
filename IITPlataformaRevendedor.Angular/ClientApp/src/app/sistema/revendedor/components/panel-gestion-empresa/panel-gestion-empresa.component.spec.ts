import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGestionEmpresaComponent } from './panel-gestion-empresa.component';

describe('PanelGestionEmpresaComponent', () => {
  let component: PanelGestionEmpresaComponent;
  let fixture: ComponentFixture<PanelGestionEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelGestionEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelGestionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
