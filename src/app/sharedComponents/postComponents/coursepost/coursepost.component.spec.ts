import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepostComponent } from './coursepost.component';

describe('CoursepostComponent', () => {
  let component: CoursepostComponent;
  let fixture: ComponentFixture<CoursepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
