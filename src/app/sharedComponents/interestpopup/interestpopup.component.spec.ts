import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestpopupComponent } from './interestpopup.component';

describe('InterestpopupComponent', () => {
  let component: InterestpopupComponent;
  let fixture: ComponentFixture<InterestpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
