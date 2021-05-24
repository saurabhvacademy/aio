import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSolutionHintComponent } from './post-solution-hint.component';

describe('PostSolutionHintComponent', () => {
  let component: PostSolutionHintComponent;
  let fixture: ComponentFixture<PostSolutionHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSolutionHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSolutionHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
