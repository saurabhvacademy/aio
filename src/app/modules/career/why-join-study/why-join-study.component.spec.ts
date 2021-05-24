import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyJoinStudyComponent } from './why-join-study.component';

describe('WhyJoinStudyComponent', () => {
  let component: WhyJoinStudyComponent;
  let fixture: ComponentFixture<WhyJoinStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyJoinStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyJoinStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
