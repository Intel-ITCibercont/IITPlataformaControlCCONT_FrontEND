import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRevendorComponent } from './navbar-revendor.component';

describe('NavbarRevendorComponent', () => {
  let component: NavbarRevendorComponent;
  let fixture: ComponentFixture<NavbarRevendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRevendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRevendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
