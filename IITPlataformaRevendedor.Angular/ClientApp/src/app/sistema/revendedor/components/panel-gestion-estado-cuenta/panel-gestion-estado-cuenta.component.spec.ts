import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGestionEstadoCuentaComponent } from './panel-gestion-estado-cuenta.component';

describe('PanelGestionEstadoCuentaComponent', () => {
  let component: PanelGestionEstadoCuentaComponent;
  let fixture: ComponentFixture<PanelGestionEstadoCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelGestionEstadoCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelGestionEstadoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
