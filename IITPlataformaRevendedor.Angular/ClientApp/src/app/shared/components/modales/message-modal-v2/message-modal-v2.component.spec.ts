import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModalV2Component } from './message-modal-v2.component';

describe('MessageModalV2Component', () => {
  let component: MessageModalV2Component;
  let fixture: ComponentFixture<MessageModalV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageModalV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModalV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
