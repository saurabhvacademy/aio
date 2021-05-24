import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankStatisticsComponent } from './rank-statistics.component';

describe('RankStatisticsComponent', () => {
  let component: RankStatisticsComponent;
  let fixture: ComponentFixture<RankStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
