import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewslistComponent } from './reviewslist.component';

describe('ReviewslistComponent', () => {
  let component: ReviewslistComponent;
  let fixture: ComponentFixture<ReviewslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
