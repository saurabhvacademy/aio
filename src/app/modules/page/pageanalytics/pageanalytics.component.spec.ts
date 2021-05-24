import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageanalyticsComponent } from './pageanalytics.component';

describe('PageanalyticsComponent', () => {
  let component: PageanalyticsComponent;
  let fixture: ComponentFixture<PageanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
