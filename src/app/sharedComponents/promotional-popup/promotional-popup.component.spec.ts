import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalPopupComponent } from './promotional-popup.component';

describe('PromotionalPopupComponent', () => {
  let component: PromotionalPopupComponent;
  let fixture: ComponentFixture<PromotionalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
