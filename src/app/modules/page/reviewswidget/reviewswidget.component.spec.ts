import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewswidgetComponent } from './reviewswidget.component';

describe('ReviewswidgetComponent', () => {
  let component: ReviewswidgetComponent;
  let fixture: ComponentFixture<ReviewswidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewswidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewswidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
