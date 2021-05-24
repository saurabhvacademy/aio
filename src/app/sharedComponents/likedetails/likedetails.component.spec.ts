import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedetailsComponent } from './likedetails.component';

describe('LikedetailsComponent', () => {
  let component: LikedetailsComponent;
  let fixture: ComponentFixture<LikedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
