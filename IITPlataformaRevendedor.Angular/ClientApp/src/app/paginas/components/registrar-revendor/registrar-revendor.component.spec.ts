import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRevendorComponent } from './registrar-revendor.component';

describe('RegistrarRevendorComponent', () => {
  let component: RegistrarRevendorComponent;
  let fixture: ComponentFixture<RegistrarRevendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarRevendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarRevendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
