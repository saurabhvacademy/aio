import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByInterestComponent } from './filter-by-interest.component';

describe('FilterByInterestComponent', () => {
  let component: FilterByInterestComponent;
  let fixture: ComponentFixture<FilterByInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterByInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
