import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharecoursewidgetComponent } from './sharecoursewidget.component';

describe('SharecoursewidgetComponent', () => {
  let component: SharecoursewidgetComponent;
  let fixture: ComponentFixture<SharecoursewidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharecoursewidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharecoursewidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
