import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsratingsComponent } from './reviewsratings.component';

describe('ReviewsratingsComponent', () => {
  let component: ReviewsratingsComponent;
  let fixture: ComponentFixture<ReviewsratingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsratingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsratingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
