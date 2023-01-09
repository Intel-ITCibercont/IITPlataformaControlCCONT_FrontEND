import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSharedbuttonsComponent } from './menu-sharedbuttons.component';

describe('MenuSharedbuttonsComponent', () => {
  let component: MenuSharedbuttonsComponent;
  let fixture: ComponentFixture<MenuSharedbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSharedbuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSharedbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
