import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAccionRapidaV2Component } from './navbar-accion-rapida-v2.component';

describe('NavbarAccionRapidaV2Component', () => {
  let component: NavbarAccionRapidaV2Component;
  let fixture: ComponentFixture<NavbarAccionRapidaV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAccionRapidaV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAccionRapidaV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
