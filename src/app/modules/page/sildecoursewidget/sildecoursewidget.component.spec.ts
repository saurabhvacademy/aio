import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SildecoursewidgetComponent } from './sildecoursewidget.component';

describe('SildecoursewidgetComponent', () => {
  let component: SildecoursewidgetComponent;
  let fixture: ComponentFixture<SildecoursewidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SildecoursewidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SildecoursewidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
