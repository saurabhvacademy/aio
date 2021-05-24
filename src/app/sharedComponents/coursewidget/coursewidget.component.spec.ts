import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursewidgetComponent } from './coursewidget.component';

describe('CoursewidgetComponent', () => {
  let component: CoursewidgetComponent;
  let fixture: ComponentFixture<CoursewidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursewidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursewidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
