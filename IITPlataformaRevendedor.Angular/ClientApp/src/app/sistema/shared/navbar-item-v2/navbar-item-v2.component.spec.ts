import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarItemV2Component } from './navbar-item-v2.component';

describe('NavbarItemV2Component', () => {
  let component: NavbarItemV2Component;
  let fixture: ComponentFixture<NavbarItemV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarItemV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarItemV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
