import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibercontLoadingComponent } from './loading.component';

describe('CibercontLoadingComponent', () => {
  let component: CibercontLoadingComponent;
  let fixture: ComponentFixture<CibercontLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CibercontLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CibercontLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
