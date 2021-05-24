import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionforyouComponent } from './questionforyou.component';

describe('QuestionforyouComponent', () => {
  let component: QuestionforyouComponent;
  let fixture: ComponentFixture<QuestionforyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionforyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionforyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
