import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingclassesComponent } from './upcomingclasses.component';

describe('UpcomingclassesComponent', () => {
  let component: UpcomingclassesComponent;
  let fixture: ComponentFixture<UpcomingclassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingclassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
