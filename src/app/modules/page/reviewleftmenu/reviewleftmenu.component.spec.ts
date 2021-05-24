import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewleftmenuComponent } from './reviewleftmenu.component';

describe('ReviewleftmenuComponent', () => {
  let component: ReviewleftmenuComponent;
  let fixture: ComponentFixture<ReviewleftmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewleftmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewleftmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
