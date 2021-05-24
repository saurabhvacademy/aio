import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreequentlyAskedQuestionsComponent } from './freequently-asked-questions.component';

describe('FreequentlyAskedQuestionsComponent', () => {
  let component: FreequentlyAskedQuestionsComponent;
  let fixture: ComponentFixture<FreequentlyAskedQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreequentlyAskedQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreequentlyAskedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
