import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieNumeroInputComponent } from './serie-numero-input.component';

describe('SerieNumeroInputComponent', () => {
  let component: SerieNumeroInputComponent;
  let fixture: ComponentFixture<SerieNumeroInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerieNumeroInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieNumeroInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
