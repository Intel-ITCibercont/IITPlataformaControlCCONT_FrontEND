import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibercontFormHeaderV2Component } from './form-header-v2.component';

describe('CibercontFormHeaderComponent', () => {
  let component: CibercontFormHeaderV2Component;
  let fixture: ComponentFixture<CibercontFormHeaderV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibercontFormHeaderV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibercontFormHeaderV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
