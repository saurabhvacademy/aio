import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticswidgetComponent } from './statisticswidget.component';

describe('StatisticswidgetComponent', () => {
  let component: StatisticswidgetComponent;
  let fixture: ComponentFixture<StatisticswidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticswidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticswidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
