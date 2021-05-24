import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecoursewidgetComponent } from './createcoursewidget.component';

describe('CreatecoursewidgetComponent', () => {
  let component: CreatecoursewidgetComponent;
  let fixture: ComponentFixture<CreatecoursewidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecoursewidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecoursewidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
