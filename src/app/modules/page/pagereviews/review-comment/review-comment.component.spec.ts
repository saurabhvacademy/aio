import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCommentComponent } from './review-comment.component';

describe('ReviewCommentComponent', () => {
  let component: ReviewCommentComponent;
  let fixture: ComponentFixture<ReviewCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
