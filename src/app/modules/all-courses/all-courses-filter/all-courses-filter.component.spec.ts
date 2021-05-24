import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesFilterComponent } from './all-courses-filter.component';

describe('AllCoursesFilterComponent', () => {
  let component: AllCoursesFilterComponent;
  let fixture: ComponentFixture<AllCoursesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCoursesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoursesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
