import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysClassesComponent } from './todays-classes.component';

describe('TodaysClassesComponent', () => {
  let component: TodaysClassesComponent;
  let fixture: ComponentFixture<TodaysClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
