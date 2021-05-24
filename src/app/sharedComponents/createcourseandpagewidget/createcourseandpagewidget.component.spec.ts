import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecourseandpagewidgetComponent } from './createcourseandpagewidget.component';

describe('CreatecourseandpagewidgetComponent', () => {
  let component: CreatecourseandpagewidgetComponent;
  let fixture: ComponentFixture<CreatecourseandpagewidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecourseandpagewidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecourseandpagewidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
