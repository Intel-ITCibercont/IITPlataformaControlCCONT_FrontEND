import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteFooterComponent } from './soporte-footer.component';

describe('SoporteFooterComponent', () => {
  let component: SoporteFooterComponent;
  let fixture: ComponentFixture<SoporteFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoporteFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
