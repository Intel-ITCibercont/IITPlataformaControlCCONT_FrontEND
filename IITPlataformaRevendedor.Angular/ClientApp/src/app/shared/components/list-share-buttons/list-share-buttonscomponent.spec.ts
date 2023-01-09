import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSharebuttonsComponent } from './list-share-buttons.component';

describe('ListSharebuttonsComponent', () => {
  let component: ListSharebuttonsComponent;
  let fixture: ComponentFixture<ListSharebuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSharebuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSharebuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
