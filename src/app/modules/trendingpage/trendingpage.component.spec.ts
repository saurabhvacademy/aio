import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingpageComponent } from './trendingpage.component';

describe('TrendingpageComponent', () => {
  let component: TrendingpageComponent;
  let fixture: ComponentFixture<TrendingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
