import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedpageComponent } from './recommendedpage.component';

describe('RecommendedpageComponent', () => {
  let component: RecommendedpageComponent;
  let fixture: ComponentFixture<RecommendedpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
