import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankListingComponent } from './rank-listing.component';

describe('RankListingComponent', () => {
  let component: RankListingComponent;
  let fixture: ComponentFixture<RankListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
