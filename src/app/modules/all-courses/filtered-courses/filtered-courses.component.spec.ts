import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCoursesComponent } from './filtered-courses.component';

describe('FilteredCoursesComponent', () => {
  let component: FilteredCoursesComponent;
  let fixture: ComponentFixture<FilteredCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
