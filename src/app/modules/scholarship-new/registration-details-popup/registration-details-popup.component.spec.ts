import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDetailsPopupComponent } from './registration-details-popup.component';

describe('RegistrationDetailsPopupComponent', () => {
  let component: RegistrationDetailsPopupComponent;
  let fixture: ComponentFixture<RegistrationDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
