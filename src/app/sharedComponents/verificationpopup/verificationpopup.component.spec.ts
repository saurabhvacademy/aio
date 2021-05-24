import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationpopupComponent } from './verificationpopup.component';

describe('VerificationpopupComponent', () => {
  let component: VerificationpopupComponent;
  let fixture: ComponentFixture<VerificationpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
