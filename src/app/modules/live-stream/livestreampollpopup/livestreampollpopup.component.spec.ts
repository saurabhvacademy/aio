import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestreampollpopupComponent } from './livestreampollpopup.component';

describe('LivestreampollpopupComponent', () => {
  let component: LivestreampollpopupComponent;
  let fixture: ComponentFixture<LivestreampollpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestreampollpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestreampollpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
