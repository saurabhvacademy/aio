import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedcoursepostComponent } from './sharedcoursepost.component';

describe('SharedcoursepostComponent', () => {
  let component: SharedcoursepostComponent;
  let fixture: ComponentFixture<SharedcoursepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedcoursepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedcoursepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
