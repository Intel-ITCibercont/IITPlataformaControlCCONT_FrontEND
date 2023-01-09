import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibercontPreviewPdfComponent } from './preview-pdf.component';

describe('CibercontPreviewPdfComponent', () => {
  let component: CibercontPreviewPdfComponent;
  let fixture: ComponentFixture<CibercontPreviewPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CibercontPreviewPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CibercontPreviewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
