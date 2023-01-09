import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDecisionModalComponent } from './input-decision-modal.component';

describe('InputDecisionModalComponent', () => {
  let component: InputDecisionModalComponent;
  let fixture: ComponentFixture<InputDecisionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDecisionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDecisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
