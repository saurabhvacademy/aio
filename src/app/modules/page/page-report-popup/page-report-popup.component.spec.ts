import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReportPopupComponent } from './page-report-popup.component';

describe('PageReportPopupComponent', () => {
  let component: PageReportPopupComponent;
  let fixture: ComponentFixture<PageReportPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageReportPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageReportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
